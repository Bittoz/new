'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import UserTable from './components/UserTable';
import UserFilters from './components/UserFilters';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage all users and their accounts</p>
          </div>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
            Export Users
          </button>
        </div>

        <UserFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        <UserTable 
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          roleFilter={roleFilter}
        />
      </div>
    </AdminLayout>
  );
}