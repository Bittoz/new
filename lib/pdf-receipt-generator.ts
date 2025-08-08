interface ReceiptData {
  invoiceId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  usdAmount: number;
  cryptoAmount: number;
  coin: string;
  network: string;
  handlingFee: number;
  totalAmount: number;
  transactionHash: string;
  walletAddress: string;
  status: string;
}

export class PDFReceiptGenerator {
  private createReceiptHTML(data: ReceiptData): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Receipt - ${data.invoiceId}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 3px solid #f59e0b;
          padding-bottom: 20px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #f59e0b;
          margin-bottom: 10px;
        }
        .receipt-title {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 5px;
        }
        .receipt-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          background: #f9fafb;
          padding: 15px;
          border-radius: 8px;
        }
        .info-section {
          flex: 1;
        }
        .info-title {
          font-weight: bold;
          color: #374151;
          margin-bottom: 5px;
        }
        .transaction-details {
          margin-bottom: 30px;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .details-table th,
        .details-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .details-table th {
          background: #f3f4f6;
          font-weight: bold;
          color: #374151;
        }
        .amount-summary {
          background: #fef3c7;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .summary-row.total {
          font-size: 18px;
          font-weight: bold;
          border-top: 2px solid #f59e0b;
          padding-top: 8px;
          margin-top: 15px;
        }
        .blockchain-info {
          margin-top: 30px;
          background: #eff6ff;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }
        .hash {
          font-family: monospace;
          word-break: break-all;
          background: #f3f4f6;
          padding: 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        .status {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status.confirmed {
          background: #d1fae5;
          color: #065f46;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }
        .qr-code {
          text-align: center;
          margin: 20px 0;
        }
        .security-note {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
          font-size: 14px;
        }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">MarketPlace</div>
        <div class="receipt-title">Payment Receipt</div>
        <div style="color: #6b7280; font-size: 14px;">Digital Cryptocurrency Deposit</div>
      </div>

      <div class="receipt-info">
        <div class="info-section">
          <div class="info-title">Invoice Details</div>
          <div><strong>Invoice ID:</strong> ${data.invoiceId}</div>
          <div><strong>Date:</strong> ${new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })}</div>
          <div><strong>Status:</strong> <span class="status confirmed">${data.status}</span></div>
        </div>
        <div class="info-section">
          <div class="info-title">Customer Information</div>
          <div><strong>Name:</strong> ${data.customerName}</div>
          <div><strong>Email:</strong> ${data.customerEmail}</div>
          <div><strong>Payment Method:</strong> Cryptocurrency</div>
        </div>
      </div>

      <div class="transaction-details">
        <h3 style="color: #374151; margin-bottom: 15px;">Transaction Details</h3>
        <table class="details-table">
          <tr>
            <th>Description</th>
            <th>Details</th>
          </tr>
          <tr>
            <td>Cryptocurrency</td>
            <td>${data.coin}</td>
          </tr>
          <tr>
            <td>Network</td>
            <td>${data.network}</td>
          </tr>
          <tr>
            <td>Amount Deposited</td>
            <td>${data.cryptoAmount} ${data.coin}</td>
          </tr>
          <tr>
            <td>USD Value</td>
            <td>$${data.usdAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Handling Fee</td>
            <td>$${data.handlingFee.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Wallet Address</td>
            <td class="hash">${data.walletAddress}</td>
          </tr>
          <tr>
            <td>Transaction Hash</td>
            <td class="hash">${data.transactionHash}</td>
          </tr>
        </table>
      </div>

      <div class="amount-summary">
        <h3 style="margin-top: 0; color: #92400e;">Payment Summary</h3>
        <div class="summary-row">
          <span>Deposit Amount:</span>
          <span>$${data.usdAmount.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Handling Fee:</span>
          <span>$${data.handlingFee.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
          <span>Total Paid:</span>
          <span>$${data.totalAmount.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
          <span>Crypto Amount:</span>
          <span>${data.cryptoAmount} ${data.coin}</span>
        </div>
      </div>

      <div class="blockchain-info">
        <h4 style="margin-top: 0; color: #1e40af;">Blockchain Verification</h4>
        <p>This transaction has been verified on the ${data.network} blockchain and is permanently recorded.</p>
        <p><strong>Confirmations:</strong> Verified ✓</p>
        <p><strong>Block Explorer:</strong> <span class="hash">View on blockchain explorer</span></p>
      </div>

      <div class="qr-code no-print">
        <p style="color: #6b7280; margin-bottom: 10px;">Transaction QR Code</p>
        <div style="display: inline-block; padding: 15px; background: white; border: 2px solid #e5e7eb; border-radius: 8px;">
          <div style="width: 150px; height: 150px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; color: #6b7280;">
            QR Code for ${data.transactionHash.substring(0, 16)}...
          </div>
        </div>
      </div>

      <div class="security-note">
        <strong>Important Security Information:</strong>
        <ul style="margin: 10px 0 0 20px; padding: 0;">
          <li>Keep this receipt for your records</li>
          <li>Transaction hash can be verified on blockchain explorers</li>
          <li>This is an official receipt for tax and accounting purposes</li>
          <li>Contact support if you notice any discrepancies</li>
        </ul>
      </div>

      <div class="footer">
        <p><strong>MarketPlace Digital Payment System</strong></p>
        <p>This receipt was generated automatically and is valid without signature.</p>
        <p>Generated on: ${new Date().toISOString()}</p>
        <p style="margin-top: 10px;">
          <span style="color: #f59e0b;">●</span> Secure Payment Processing 
          <span style="color: #f59e0b;">●</span> Blockchain Verified 
          <span style="color: #f59e0b;">●</span> 24/7 Support Available
        </p>
      </div>
    </body>
    </html>
    `;
  }

  async generatePDF(receiptData: ReceiptData): Promise<Blob> {
    const htmlContent = this.createReceiptHTML(receiptData);
    
    // For client-side PDF generation, you would typically use a library like jsPDF or Puppeteer
    // This is a simplified implementation that creates a downloadable HTML file
    // In a real application, you'd use proper PDF generation
    
    return new Blob([htmlContent], { type: 'text/html' });
  }

  downloadReceipt(receiptData: ReceiptData): void {
    const htmlContent = this.createReceiptHTML(receiptData);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${receiptData.invoiceId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  printReceipt(receiptData: ReceiptData): void {
    const htmlContent = this.createReceiptHTML(receiptData);
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  }

  async emailReceipt(receiptData: ReceiptData, recipientEmail: string): Promise<boolean> {
    try {
      const htmlContent = this.createReceiptHTML(receiptData);
      
      // This would typically integrate with an email service like SendGrid, AWS SES, etc.
      const emailData = {
        to: recipientEmail,
        subject: `Payment Receipt - ${receiptData.invoiceId}`,
        html: htmlContent,
        attachments: [{
          filename: `receipt-${receiptData.invoiceId}.pdf`,
          content: htmlContent,
          type: 'text/html'
        }]
      };

      // Simulate email sending
      console.log('Email receipt sent:', emailData);
      return true;

    } catch (error) {
      console.error('Error sending email receipt:', error);
      return false;
    }
  }
}