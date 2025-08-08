'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface OrderTableProps {
  searchTerm: string;
  statusFilter: string;
  dateFilter: string;
}

export default function OrderTable({ searchTerm, statusFilter, dateFilter }: OrderTableProps) {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API call to fetch orders
    // const fetchOrders = async () => {
    //   try {
    //     const response = await fetch('/api/admin/orders');
    //     const data = await response.json();
    //     setOrders(data);
    //   } catch (error) {
    //     console.error('Error fetching orders:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchOrders();

    // For now, show empty state
    setOrders([]);
    setLoading(false);
  }, []);

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((_, index) => index));
    }
  };

  const handleSelectOrder = (orderIndex: number) => {
    if (selectedOrders.includes(orderIndex)) {
      setSelectedOrders(selectedOrders.filter(index => index !== orderIndex));
    } else {
      setSelectedOrders([...selectedOrders, orderIndex]);
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
      case 'Refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <i className="ri-loader-4-line text-2xl animate-spin mb-2 text-gray-400"></i>
            <p className="text-gray-500">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-amber-800">
              {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button className="text-sm text-green-600 hover:text-green-800 px-3 py-1 rounded-md hover:bg-green-50 cursor-pointer">
                Mark Complete
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50 cursor-pointer">
                Process
              </button>
              <button className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50 cursor-pointer">
                Refund
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
                  checked={selectedOrders.length === orders.length && orders.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(index)}
                    onChange={() => handleSelectOrder(index)}
                    className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                    <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.buyer}</div>
                    <div className="text-sm text-gray-500">{order.buyerEmail}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-10 h-10 rounded-lg object-cover object-top flex-shrink-0"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">{order.product}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.seller}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {order.amount}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(order.date)}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-amber-600 hover:text-amber-900 cursor-pointer"
                    >
                      <i className="ri-eye-line text-lg w-5 h-5 flex items-center justify-center"></i>
                    </Link>
                    <button className="text-blue-400 hover:text-blue-600 cursor-pointer">
                      <i className="ri-edit-line text-lg w-5 h-5 flex items-center justify-center"></i>
                    </button>
                    <button className="text-red-400 hover:text-red-600 cursor-pointer">
                      <i className="ri-refund-line text-lg w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <i className="ri-shopping-cart-line text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500">Orders will appear here when customers make purchases.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {orders.length > 0 && (
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{orders.length}</span> of
                <span className="font-medium">{orders.length}</span> results
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
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                  <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
