interface BlockchainTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  confirmations: number;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
  timestamp?: number;
}

interface VerificationResult {
  isValid: boolean;
  transaction?: BlockchainTransaction;
  error?: string;
  confirmations: number;
  amountMatch: boolean;
  addressMatch: boolean;
}

export class BlockchainService {
  private readonly API_KEYS = {
    ETHERSCAN: 'YourEtherscanAPIKey',
    TRONSCAN: 'YourTronscanAPIKey', 
    BLOCKCHAIN_INFO: 'YourBlockchainInfoAPIKey'
  };

  private readonly API_ENDPOINTS = {
    ETHEREUM: 'https://api.etherscan.io/api',
    TRON: 'https://api.trongrid.io',
    BITCOIN: 'https://blockstream.info/api'
  };

  async verifyTransaction(
    txHash: string, 
    expectedAddress: string, 
    expectedAmount: number, 
    network: string,
    coin: string
  ): Promise<VerificationResult> {
    try {
      let transaction: BlockchainTransaction | null = null;

      switch (network.toUpperCase()) {
        case 'TRC20':
          transaction = await this.verifyTronTransaction(txHash, expectedAddress, expectedAmount);
          break;
        case 'ERC20':
          transaction = await this.verifyEthereumTransaction(txHash, expectedAddress, expectedAmount);
          break;
        case 'BEP20':
          transaction = await this.verifyBSCTransaction(txHash, expectedAddress, expectedAmount);
          break;
        case 'BITCOIN':
          transaction = await this.verifyBitcoinTransaction(txHash, expectedAddress, expectedAmount);
          break;
        default:
          return {
            isValid: false,
            error: `Unsupported network: ${network}`,
            confirmations: 0,
            amountMatch: false,
            addressMatch: false
          };
      }

      if (!transaction) {
        return {
          isValid: false,
          error: 'Transaction not found',
          confirmations: 0,
          amountMatch: false,
          addressMatch: false
        };
      }

      const addressMatch = transaction.to.toLowerCase() === expectedAddress.toLowerCase();
      const amountMatch = this.isAmountValid(parseFloat(transaction.value), expectedAmount);
      const hasMinConfirmations = transaction.confirmations >= this.getMinConfirmations(network);

      return {
        isValid: addressMatch && amountMatch && hasMinConfirmations && transaction.status === 'confirmed',
        transaction,
        confirmations: transaction.confirmations,
        amountMatch,
        addressMatch
      };

    } catch (error) {
      console.error('Blockchain verification error:', error);
      return {
        isValid: false,
        error: 'Verification service unavailable',
        confirmations: 0,
        amountMatch: false,
        addressMatch: false
      };
    }
  }

  private async verifyTronTransaction(txHash: string, expectedAddress: string, expectedAmount: number): Promise<BlockchainTransaction | null> {
    try {
      const response = await fetch(`${this.API_ENDPOINTS.TRON}/v1/transactions/${txHash}`);
      const data = await response.json();

      if (!data.ret || data.ret[0].contractRet !== 'SUCCESS') {
        return null;
      }

      const contract = data.raw_data.contract[0];
      const value = contract.parameter.value;

      return {
        hash: txHash,
        from: value.owner_address || '',
        to: value.to_address || value.contract_address || '',
        value: (parseInt(value.amount || value.call_value || '0') / 1000000).toString(),
        confirmations: await this.getTronConfirmations(txHash),
        status: 'confirmed',
        blockNumber: data.blockNumber,
        timestamp: data.block_timestamp
      };
    } catch (error) {
      console.error('Tron verification error:', error);
      return null;
    }
  }

  private async verifyEthereumTransaction(txHash: string, expectedAddress: string, expectedAmount: number): Promise<BlockchainTransaction | null> {
    try {
      const response = await fetch(
        `${this.API_ENDPOINTS.ETHEREUM}?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${this.API_KEYS.ETHERSCAN}`
      );
      const data = await response.json();

      if (data.status !== '1') return null;

      const txResponse = await fetch(
        `${this.API_ENDPOINTS.ETHEREUM}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${this.API_KEYS.ETHERSCAN}`
      );
      const txData = await txResponse.json();

      if (!txData.result) return null;

      const tx = txData.result;
      const value = parseInt(tx.value, 16) / Math.pow(10, 18); // Convert from Wei to ETH

      return {
        hash: txHash,
        from: tx.from,
        to: tx.to,
        value: value.toString(),
        confirmations: await this.getEthereumConfirmations(txHash),
        status: data.result.status === '1' ? 'confirmed' : 'failed',
        blockNumber: parseInt(tx.blockNumber, 16),
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Ethereum verification error:', error);
      return null;
    }
  }

  private async verifyBSCTransaction(txHash: string, expectedAddress: string, expectedAmount: number): Promise<BlockchainTransaction | null> {
    try {
      // Similar to Ethereum but using BSC endpoints
      const response = await fetch(
        `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${this.API_KEYS.ETHERSCAN}`
      );
      const data = await response.json();

      if (data.status !== '1') return null;

      const txResponse = await fetch(
        `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${this.API_KEYS.ETHERSCAN}`
      );
      const txData = await txResponse.json();

      if (!txData.result) return null;

      const tx = txData.result;
      const value = parseInt(tx.value, 16) / Math.pow(10, 18);

      return {
        hash: txHash,
        from: tx.from,
        to: tx.to,
        value: value.toString(),
        confirmations: await this.getBSCConfirmations(txHash),
        status: data.result.status === '1' ? 'confirmed' : 'failed',
        blockNumber: parseInt(tx.blockNumber, 16),
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('BSC verification error:', error);
      return null;
    }
  }

  private async verifyBitcoinTransaction(txHash: string, expectedAddress: string, expectedAmount: number): Promise<BlockchainTransaction | null> {
    try {
      const response = await fetch(`${this.API_ENDPOINTS.BITCOIN}/tx/${txHash}`);
      const data = await response.json();

      if (!data) return null;

      const output = data.vout.find((out: any) => 
        out.scriptpubkey_address === expectedAddress
      );

      if (!output) return null;

      const value = output.value / 100000000; // Convert from satoshis to BTC

      return {
        hash: txHash,
        from: data.vin[0]?.prevout?.scriptpubkey_address || '',
        to: expectedAddress,
        value: value.toString(),
        confirmations: data.status.confirmed ? data.status.block_height - data.status.block_height + 1 : 0,
        status: data.status.confirmed ? 'confirmed' : 'pending',
        blockNumber: data.status.block_height,
        timestamp: data.status.block_time
      };
    } catch (error) {
      console.error('Bitcoin verification error:', error);
      return null;
    }
  }

  private async getTronConfirmations(txHash: string): Promise<number> {
    try {
      const response = await fetch(`${this.API_ENDPOINTS.TRON}/wallet/gettransactioninfobyid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: txHash })
      });
      const data = await response.json();
      return data.blockNumber ? 20 : 0; // Simplified confirmation logic
    } catch {
      return 0;
    }
  }

  private async getEthereumConfirmations(txHash: string): Promise<number> {
    try {
      const latestResponse = await fetch(
        `${this.API_ENDPOINTS.ETHEREUM}?module=proxy&action=eth_blockNumber&apikey=${this.API_KEYS.ETHERSCAN}`
      );
      const latestData = await latestResponse.json();
      const latestBlock = parseInt(latestData.result, 16);

      const txResponse = await fetch(
        `${this.API_ENDPOINTS.ETHEREUM}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${this.API_KEYS.ETHERSCAN}`
      );
      const txData = await txResponse.json();
      const txBlock = parseInt(txData.result.blockNumber, 16);

      return latestBlock - txBlock + 1;
    } catch {
      return 0;
    }
  }

  private async getBSCConfirmations(txHash: string): Promise<number> {
    // Similar to Ethereum but for BSC
    try {
      const latestResponse = await fetch(
        `https://api.bscscan.com/api?module=proxy&action=eth_blockNumber&apikey=${this.API_KEYS.ETHERSCAN}`
      );
      const latestData = await latestResponse.json();
      const latestBlock = parseInt(latestData.result, 16);

      const txResponse = await fetch(
        `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${this.API_KEYS.ETHERSCAN}`
      );
      const txData = await txResponse.json();
      const txBlock = parseInt(txData.result.blockNumber, 16);

      return latestBlock - txBlock + 1;
    } catch {
      return 0;
    }
  }

  private getMinConfirmations(network: string): number {
    const confirmations = {
      'TRC20': 19,
      'ERC20': 12,
      'BEP20': 15,
      'BITCOIN': 6
    };
    return confirmations[network.toUpperCase() as keyof typeof confirmations] || 6;
  }

  private isAmountValid(receivedAmount: number, expectedAmount: number, tolerance = 0.001): boolean {
    const difference = Math.abs(receivedAmount - expectedAmount);
    const percentageDiff = difference / expectedAmount;
    return percentageDiff <= tolerance;
  }

  async getTransactionExplorerUrl(txHash: string, network: string): Promise<string> {
    const explorers = {
      'TRC20': `https://tronscan.org/#/transaction/${txHash}`,
      'ERC20': `https://etherscan.io/tx/${txHash}`,
      'BEP20': `https://bscscan.com/tx/${txHash}`,
      'BITCOIN': `https://blockstream.info/tx/${txHash}`
    };
    
    return explorers[network.toUpperCase() as keyof typeof explorers] || '';
  }

  async getCryptoPrice(coin: string): Promise<number> {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${this.getCoinGeckoId(coin)}&vs_currencies=usd`
      );
      const data = await response.json();
      const coinId = this.getCoinGeckoId(coin);
      return data[coinId]?.usd || 0;
    } catch (error) {
      console.error('Error fetching crypto price:', error);
      return 0;
    }
  }

  private getCoinGeckoId(coin: string): string {
    const ids = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'USDT': 'tether',
      'BNB': 'binancecoin'
    };
    return ids[coin.toUpperCase() as keyof typeof ids] || coin.toLowerCase();
  }
}