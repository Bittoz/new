'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import OrderTable from './components/OrderTable';
import OrderFilters from './components/OrderFilters';
import OrderStats from './components/OrderStats';

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600">Track and manage all marketplace orders</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              Export Orders
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              Process Refunds
            </button>
          </div>
        </div>

        <OrderStats />

        <OrderFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        <OrderTable 
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          dateFilter={dateFilter}
        />
      </div>
    </AdminLayout>
  );
}