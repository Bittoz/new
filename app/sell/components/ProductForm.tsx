
'use client';

import { useState } from 'react';

export default function ProductForm() {
  const [formData, setFormData] = useState({
    mode: 'selling',
    title: '',
    description: '',
    price: '',
    type: 'downloadable',
    max_order_quantity: '1',
    warranty_period: '72',
    category: '',
    tags: '',
    image: null,
    file_upload: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'E-Books',
    'Templates',
    'Software',
    'Graphics & Design',
    'Music & Audio',
    'Video',
    'Online Courses',
    'Digital Art',
    'Plugins',
    'Mobile Apps',
    'Web Services',
    'Photography'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error messages when user starts typing
    if (submitStatus && !submitStatus.includes('success')) {
      setSubmitStatus('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Validate file size (10MB limit)
      if (files[0].size > 10 * 1024 * 1024) {
        setSubmitStatus('File size must be less than 10MB.');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      
      // Clear error messages
      if (submitStatus && !submitStatus.includes('success')) {
        setSubmitStatus('');
      }
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.title.trim()) {
      errors.push('Product title is required');
    } else if (formData.title.length < 5) {
      errors.push('Product title must be at least 5 characters');
    }

    if (!formData.description.trim()) {
      errors.push('Product description is required');
    } else if (formData.description.length < 20) {
      errors.push('Description must be at least 20 characters');
    } else if (formData.description.length > 500) {
      errors.push('Description must be 500 characters or less');
    }

    if (!formData.price) {
      errors.push('Price is required');
    } else if (parseFloat(formData.price) <= 0) {
      errors.push('Price must be greater than 0');
    } else if (parseFloat(formData.price) > 10000) {
      errors.push('Price cannot exceed $10,000');
    }

    if (!formData.category) {
      errors.push('Category selection is required');
    }

    if (formData.type === 'downloadable' && !formData.file_upload) {
      errors.push('File upload is required for downloadable products');
    }

    if (formData.max_order_quantity && (parseInt(formData.max_order_quantity) < 1 || parseInt(formData.max_order_quantity) > 999)) {
      errors.push('Max order quantity must be between 1 and 999');
    }

    if (formData.warranty_period && (parseInt(formData.warranty_period) < 0 || parseInt(formData.warranty_period) > 8760)) {
      errors.push('Warranty period must be between 0 and 8760 hours (1 year)');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setSubmitStatus(validationErrors[0]);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate form submission with realistic processing
    try {
      // Simulate file upload progress
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate product creation
      const productData = {
        id: `PROD-${Date.now()}`,
        ...formData,
        seller_id: 'current_user_id',
        status: 'pending_review',
        created_at: new Date().toISOString(),
        price: parseFloat(formData.price),
        max_order_quantity: parseInt(formData.max_order_quantity) || 1,
        warranty_period: parseInt(formData.warranty_period) || 72
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Product created successfully:', productData);
      
      setShowSuccess(true);
      setSubmitStatus('Product submitted successfully! Your listing is under review and will be live within 24 hours.');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          mode: 'selling',
          title: '',
          description: '',
          price: '',
          type: 'downloadable',
          max_order_quantity: '1',
          warranty_period: '72',
          category: '',
          tags: '',
          image: null,
          file_upload: null
        });
        setShowSuccess(false);
        setSubmitStatus('');
        
        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
        fileInputs.forEach(input => {
          input.value = '';
        });
      }, 3000);
      
    } catch (error) {
      console.error('Product submission failed:', error);
      setSubmitStatus('Error submitting product. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      saved_at: new Date().toISOString(),
      status: 'draft'
    };
    
    localStorage.setItem('product_draft', JSON.stringify(draftData));
    setSubmitStatus('Draft saved successfully! You can continue editing later.');
    
    setTimeout(() => {
      setSubmitStatus('');
    }, 3000);
  };

  // Load draft on component mount
  useState(() => {
    try {
      const savedDraft = localStorage.getItem('product_draft');
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        setFormData(prev => ({
          ...prev,
          ...draftData,
          image: null, // Files can't be restored from localStorage
          file_upload: null
        }));
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  });

  return (
    <div className="p-8">
      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Submitted Successfully!</h3>
            <p className="text-gray-600 mb-4">Your product listing is now under review and will be live within 24 hours.</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <i className="ri-time-line"></i>
              <span>Processing...</span>
            </div>
          </div>
        </div>
      )}

      <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Listing Mode <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { value: 'selling', label: 'Selling', icon: 'ri-price-tag-3-line', desc: 'Sell your products' },
              { value: 'buying', label: 'Buying', icon: 'ri-shopping-bag-line', desc: 'Looking to buy' },
              { value: 'trading', label: 'Trading', icon: 'ri-exchange-line', desc: 'Trade products' },
              { value: 'service', label: 'Service', icon: 'ri-service-line', desc: 'Offer services' }
            ].map((mode) => (
              <label key={mode.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value={mode.value}
                  checked={formData.mode === mode.value}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`p-4 border-2 rounded-xl text-center transition-all ${
                  formData.mode === mode.value 
                    ? 'border-amber-500 bg-amber-50 text-amber-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                    <i className={`${mode.icon} text-xl`}></i>
                  </div>
                  <div className="text-sm font-medium">{mode.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{mode.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Enter your product title (minimum 5 characters)"
            required
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Create a clear, descriptive title</span>
            <span className="text-xs text-gray-500">{formData.title.length} characters</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
            maxLength={500}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            placeholder="Describe your product in detail (minimum 20 characters)..."
            required
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Provide a detailed description of your product</span>
            <span className={`text-xs ${formData.description.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
              {formData.description.length}/500
            </span>
          </div>
        </div>

        {/* Price and Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-900 mb-2">
              Price (USD) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0.01"
                max="10000"
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">Set a competitive price ($0.01 - $10,000)</div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-8 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <i className="ri-arrow-down-line absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
        </div>

        {/* SEO Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-900 mb-2">
            SEO Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="web design, templates, ui kit, modern, responsive (separate with commas)"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Add relevant keywords to help customers find your product</span>
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-search-eye-line text-amber-600 text-sm" title="Improves search visibility"></i>
            </div>
          </div>
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Product Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="type"
                value="downloadable"
                checked={formData.type === 'downloadable'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className={`p-4 border-2 rounded-xl transition-all ${
                formData.type === 'downloadable' 
                  ? 'border-amber-500 bg-amber-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-download-line text-blue-600"></i>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Downloadable</div>
                    <div className="text-sm text-gray-500">Digital files customers can download</div>
                  </div>
                </div>
              </div>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="type"
                value="non_downloadable"
                checked={formData.type === 'non_downloadable'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className={`p-4 border-2 rounded-xl transition-all ${
                formData.type === 'non_downloadable' 
                  ? 'border-amber-500 bg-amber-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-service-line text-green-600"></i>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Non-downloadable</div>
                    <div className="text-sm text-gray-500">Services or custom work</div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Max Order Quantity and Warranty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="max_order_quantity" className="block text-sm font-medium text-gray-900 mb-2">
              Max Order Quantity
            </label>
            <input
              type="number"
              id="max_order_quantity"
              name="max_order_quantity"
              value={formData.max_order_quantity}
              onChange={handleInputChange}
              min="1"
              max="999"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="1"
            />
            <div className="text-xs text-gray-500 mt-1">Maximum quantity per order (1-999)</div>
          </div>

          <div>
            <label htmlFor="warranty_period" className="block text-sm font-medium text-gray-900 mb-2">
              Warranty Period (Hours)
            </label>
            <input
              type="number"
              id="warranty_period"
              name="warranty_period"
              value={formData.warranty_period}
              onChange={handleInputChange}
              min="0"
              max="8760"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="72"
            />
            <div className="text-xs text-gray-500 mt-1">Support period after delivery (0-8760 hours)</div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-900 mb-2">
            Product Image (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-500 transition-colors">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <i className="ri-image-line text-gray-600 text-xl"></i>
            </div>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <label htmlFor="image" className="cursor-pointer">
              <span className="text-amber-600 font-medium hover:text-amber-700">Upload an image</span>
              <span className="text-gray-500"> or drag and drop</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            {formData.image && (
              <p className="text-sm text-green-600 mt-2">✓ Image selected: {(formData.image as File).name}</p>
            )}
          </div>
        </div>

        {/* File Upload (Conditional) */}
        {formData.type === 'downloadable' && (
          <div>
            <label htmlFor="file_upload" className="block text-sm font-medium text-gray-900 mb-2">
              Product Files <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-amber-300 bg-amber-50 rounded-xl p-6 text-center hover:border-amber-500 transition-colors">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-file-upload-line text-amber-600 text-xl"></i>
              </div>
              <input
                type="file"
                id="file_upload"
                name="file_upload"
                onChange={handleFileChange}
                multiple
                className="hidden"
                required={formData.type === 'downloadable'}
              />
              <label htmlFor="file_upload" className="cursor-pointer">
                <span className="text-amber-700 font-medium hover:text-amber-800">Upload product files</span>
                <span className="text-amber-600"> or drag and drop</span>
              </label>
              <p className="text-xs text-amber-600 mt-1">ZIP, PDF, or any digital files (up to 10MB each)</p>
              {formData.file_upload && (
                <p className="text-sm text-green-600 mt-2">✓ Files selected: {(formData.file_upload as File).name}</p>
              )}
            </div>
          </div>
        )}

        {/* Submit Status */}
        {submitStatus && (
          <div className={`p-4 rounded-xl ${
            submitStatus.includes('success') || submitStatus.includes('Draft saved')
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              <i className={`${submitStatus.includes('success') || submitStatus.includes('Draft saved') ? 'ri-check-circle-line' : 'ri-error-warning-line'}`}></i>
              <span>{submitStatus}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
          >
            {isSubmitting && <i className="ri-loader-4-line animate-spin"></i>}
            <span>{isSubmitting ? 'Publishing...' : 'Publish Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
