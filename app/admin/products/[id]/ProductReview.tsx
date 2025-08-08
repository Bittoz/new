
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';
import ProductSummaryCard from './components/ProductSummaryCard';
import ReviewTabs from './components/ReviewTabs';
import ActionButtons from './components/ActionButtons';
import ActivityLogs from './components/ActivityLogs';

interface ProductReviewProps {
  productId: string;
}

export default function ProductReview({ productId }: ProductReviewProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(savedTheme === 'dark');
    
    // TODO: Replace with real API call to fetch product data
    // const fetchProduct = async () => {
    //   try {
    //     const response = await fetch(`/api/products/${productId}`);
    //     const productData = await response.json();
    //     setProduct(productData);
    //   } catch (error) {
    //     console.error('Error fetching product:', error);
    //   }
    // };
    // fetchProduct();

    setProduct(null); // No demo data
  }, [productId]);

  const handleApprove = () => {
    // TODO: Implement real product approval
    console.log('Product approved');
  };

  const handleReject = () => {
    // TODO: Implement real product rejection
    console.log('Product rejected');
  };

  const handleDelete = () => {
    // TODO: Implement real product deletion
    console.log('Product deleted');
  };

  if (!product) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <i className="ri-inbox-line text-4xl mb-4"></i>
            <h3 className="text-lg font-medium mb-2">No Product Data</h3>
            <p>Connect to your database to load product information.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm">
          <Link 
            href="/admin/products" 
            className={`transition-colors cursor-pointer ${isDarkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-amber-600'}`}
          >
            Products
          </Link>
          <i className={`ri-arrow-right-s-line ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}></i>
          <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Review Product</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Product Review
            </h1>
            <p className={`transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Review and manage product submission
            </p>
          </div>
          
          {/* Desktop Action Buttons */}
          <div className="hidden lg:block">
            <ActionButtons
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Product Summary Card */}
        <ProductSummaryCard 
          product={product} 
          isDarkMode={isDarkMode} 
        />

        {/* Review Tabs */}
        <ReviewTabs
          product={product}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isEditMode={isEditMode}
          isDarkMode={isDarkMode}
        />

        {/* Activity Logs */}
        <ActivityLogs 
          productId={product.id} 
          isDarkMode={isDarkMode} 
        />

        {/* Mobile Action Buttons - Sticky Footer */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
          <div className={`border-t transition-all duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="p-4">
              <ActionButtons
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                isDarkMode={isDarkMode}
                isMobile={true}
              />
            </div>
          </div>
        </div>

        {/* Mobile spacing */}
        <div className="lg:hidden h-20"></div>
      </div>
    </AdminLayout>
  );
}