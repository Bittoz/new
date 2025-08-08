'use client';

import Link from 'next/link';

interface ProductSummaryCardProps {
  product: any;
  isDarkMode: boolean;
}

export default function ProductSummaryCard({ product, isDarkMode }: ProductSummaryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return isDarkMode ? 'bg-green-900/30 text-green-300 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200';
      case 'Pending Review':
        return isDarkMode ? 'bg-orange-900/30 text-orange-300 border-orange-500/30' : 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Rejected':
        return isDarkMode ? 'bg-red-900/30 text-red-300 border-red-500/30' : 'bg-red-100 text-red-800 border-red-200';
      default:
        return isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'Selling':
        return isDarkMode ? 'bg-blue-900/30 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Buying':
        return isDarkMode ? 'bg-purple-900/30 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Trading':
        return isDarkMode ? 'bg-green-900/30 text-green-300 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200';
      case 'Service':
        return isDarkMode ? 'bg-cyan-900/30 text-cyan-300 border-cyan-500/30' : 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`rounded-xl shadow-xl border transition-all duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-800 shadow-cyan-500/5' : 'bg-white border-gray-200'}`}>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full lg:w-48 h-48 lg:h-32 object-cover object-top rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className={`text-xl font-bold mb-2 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {product.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getModeColor(product.productMode)}`}>
                    {product.productMode}
                  </span>
                  <span className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {product.productType}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Seller:</span>
                    <div className="flex items-center mt-1">
                      <img
                        src={product.seller.avatar}
                        alt={product.seller.name}
                        className="w-6 h-6 rounded-full mr-2 object-cover object-top"
                      />
                      <Link
                        href={`/seller/${product.seller.id}`}
                        className={`transition-colors cursor-pointer hover:underline ${isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-amber-600 hover:text-amber-700'}`}
                      >
                        {product.seller.name}
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <span className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price:</span>
                    <p className={`font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${product.price}
                    </p>
                  </div>
                  
                  <div>
                    <span className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category:</span>
                    <p className={`transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.category}
                    </p>
                  </div>
                  
                  <div>
                    <span className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Submitted:</span>
                    <p className={`transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {new Date(product.submissionDate).toLocaleDateString()} at {new Date(product.submissionDate).toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <div>
                    <span className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Stock:</span>
                    <p className={`transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.stock} units
                    </p>
                  </div>
                  
                  <div>
                    <span className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Max Order:</span>
                    <p className={`transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.maxOrderQuantity} per order
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}