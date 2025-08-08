'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import WithdrawalTable from './components/WithdrawalTable';
import WithdrawalFilters from './components/WithdrawalFilters';
import WithdrawalStats from './components/WithdrawalStats';

export default function AdminWithdrawals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Withdrawal Management</h1>
            <p className="text-gray-600">Process seller withdrawal requests</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              Export Requests
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              Process Pending
            </button>
          </div>
        </div>

        <WithdrawalStats />

        <WithdrawalFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        <WithdrawalTable 
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          dateFilter={dateFilter}
        />
      </div>
    </AdminLayout>
  );
}