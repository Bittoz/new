
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

interface ProductTableProps {
  searchTerm: string;
  statusFilter: string;
  categoryFilter: string;
}

export default function ProductTable({ searchTerm, statusFilter, categoryFilter }: ProductTableProps) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API call to fetch products
    // const fetchProducts = async () => {
    //   try {
    //     const response = await fetch('/api/admin/products');
    //     const data = await response.json();
    //     setProducts(data);
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchProducts();

    // For now, show empty state
    setProducts([]);
    setLoading(false);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && product.status === 'Active') ||
        (statusFilter === 'pending' && product.status === 'Pending Review') ||
        (statusFilter === 'rejected' && product.status === 'Rejected') ||
        (statusFilter === 'suspended' && product.status === 'Suspended');
      
      const matchesCategory = categoryFilter === 'all' || 
        (categoryFilter === 'templates' && product.category === 'Templates') ||
        (categoryFilter === 'ebooks' && product.category === 'E-Books') ||
        (categoryFilter === 'software' && product.category === 'Software') ||
        (categoryFilter === 'graphics' && product.category === 'Graphics');
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [products, searchTerm, statusFilter, categoryFilter]);

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };

  const handleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Suspended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Templates':
        return 'bg-blue-100 text-blue-800';
      case 'E-Books':
        return 'bg-purple-100 text-purple-800';
      case 'Software':
        return 'bg-green-100 text-green-800';
      case 'Graphics':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <i className="ri-loader-4-line text-2xl animate-spin mb-2 text-gray-400"></i>
            <p className="text-gray-500">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-amber-800">
              {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button className="text-sm text-green-600 hover:text-green-800 px-3 py-1 rounded-md hover:bg-green-50 cursor-pointer">
                Approve
              </button>
              <button className="text-sm text-amber-700 hover:text-amber-900 px-3 py-1 rounded-md hover:bg-amber-100 cursor-pointer">
                Suspend
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
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover object-top flex-shrink-0"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</div>
                      <div className="text-sm text-gray-500">Created {new Date(product.createdDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {product.seller}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {product.price}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {product.sales}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {product.revenue}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Link 
                      href={`/admin/products/${product.id}`}
                      className="text-amber-600 hover:text-amber-900 cursor-pointer"
                    >
                      <i className="ri-eye-line text-lg w-5 h-5 flex items-center justify-center"></i>
                    </Link>
                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                      <i className="ri-edit-line text-lg w-5 h-5 flex items-center justify-center"></i>
                    </button>
                    <button className="text-red-400 hover:text-red-600 cursor-pointer">
                      <i className="ri-delete-bin-line text-lg w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <i className="ri-package-line text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-500">Products will appear here once users start submitting them.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
                <span className="font-medium">{filteredProducts.length}</span> results
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