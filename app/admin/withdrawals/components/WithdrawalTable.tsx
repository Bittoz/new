'use client';

import { useState } from 'react';
import Link from 'next/link';

interface WithdrawalTableProps {
  searchTerm: string;
  statusFilter: string;
  dateFilter: string;
}

export default function WithdrawalTable({ searchTerm, statusFilter, dateFilter }: WithdrawalTableProps) {
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);

  const withdrawalRequests = [
    {
      id: 'WDR-001',
      seller: 'Sarah Johnson',
      sellerEmail: 'sarah.johnson@email.com',
      amount: '$1,245.67',
      requestDate: '2024-02-20T08:30:00',
      status: 'Pending',
      paymentMethod: 'Bank Transfer',
      accountDetails: '****1234',
      totalSales: '$3,456.78',
      availableBalance: '$2,890.45'
    },
    {
      id: 'WDR-002',
      seller: 'Mike Chen',
      sellerEmail: 'mike.chen@email.com',
      amount: '$890.50',
      requestDate: '2024-02-19T15:20:00',
      status: 'Processing',
      paymentMethod: 'PayPal',
      accountDetails: 'mike.chen@paypal.com',
      totalSales: '$2,234.60',
      availableBalance: '$1,567.89'
    },
    {
      id: 'WDR-003',
      seller: 'Emma Davis',
      sellerEmail: 'emma.davis@email.com',
      amount: '$2,134.50',
      requestDate: '2024-02-18T11:45:00',
      status: 'Completed',
      paymentMethod: 'Bank Transfer',
      accountDetails: '****5678',
      totalSales: '$5,678.90',
      availableBalance: '$3,234.78'
    },
    {
      id: 'WDR-004',
      seller: 'David Wilson',
      sellerEmail: 'david.wilson@email.com',
      amount: '$345.20',
      requestDate: '2024-02-17T09:30:00',
      status: 'Pending',
      paymentMethod: 'Stripe',
      accountDetails: '****9012',
      totalSales: '$1,234.56',
      availableBalance: '$890.34'
    },
    {
      id: 'WDR-005',
      seller: 'Lisa Brown',
      sellerEmail: 'lisa.brown@email.com',
      amount: '$156.80',
      requestDate: '2024-02-16T14:15:00',
      status: 'Rejected',
      paymentMethod: 'Bank Transfer',
      accountDetails: '****3456',
      totalSales: '$567.89',
      availableBalance: '$123.45'
    }
  ];

  const handleSelectAll = () => {
    if (selectedRequests.length === withdrawalRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(withdrawalRequests.map((_, index) => index));
    }
  };

  const handleSelectRequest = (requestIndex: number) => {
    if (selectedRequests.includes(requestIndex)) {
      setSelectedRequests(selectedRequests.filter(index => index !== requestIndex));
    } else {
      setSelectedRequests([...selectedRequests, requestIndex]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Bulk Actions */}
      {selectedRequests.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-amber-800">
              {selectedRequests.length} request{selectedRequests.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button className="text-sm text-green-600 hover:text-green-800 px-3 py-1 rounded-md hover:bg-green-50 cursor-pointer">
                Approve
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50 cursor-pointer">
                Process
              </button>
              <button className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50 cursor-pointer">
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRequests.length === withdrawalRequests.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {withdrawalRequests.map((request, index) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRequests.includes(index)}
                    onChange={() => handleSelectRequest(index)}
                    className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">#{request.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{request.seller}</div>
                    <div className="text-sm text-gray-500">{request.sellerEmail}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{request.amount}</div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm text-gray-900">{request.paymentMethod}</div>
                    <div className="text-sm text-gray-500">{request.accountDetails}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(request.requestDate)}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm text-gray-900">Available: {request.availableBalance}</div>
                    <div className="text-sm text-gray-500">Total Sales: {request.totalSales}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Link 
                      href={`/admin/withdrawals/${request.id}`}
                      className="text-amber-600 hover:text-amber-900 cursor-pointer"
                    >
                      <i className="ri-eye-line text-lg w-5 h-5 flex items-center justify-center"></i>
                    </Link>
                    {request.status === 'Pending' && (
                      <>
                        <button className="text-green-600 hover:text-green-800 cursor-pointer">
                          <i className="ri-check-line text-lg w-5 h-5 flex items-center justify-center"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800 cursor-pointer">
                          <i className="ri-close-line text-lg w-5 h-5 flex items-center justify-center"></i>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">23</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center"></i>
              </button>
              <button className="bg-amber-50 border-amber-500 text-amber-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                1
              </button>
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                2
              </button>
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}