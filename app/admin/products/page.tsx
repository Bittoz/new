
'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import ProductTable from './components/ProductTable';
import ProductFilters from './components/ProductFilters';

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleReviewPending = () => {
    setStatusFilter('pending');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">Manage all products and their status</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              Export Products
            </button>
            <button 
              onClick={handleReviewPending}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              Review Pending
            </button>
          </div>
        </div>

        <ProductFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        <ProductTable 
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
        />
      </div>
    </AdminLayout>
  );
}
