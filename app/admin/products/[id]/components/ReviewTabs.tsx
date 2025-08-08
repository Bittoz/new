'use client';

interface ReviewTabsProps {
  product: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isEditMode: boolean;
  isDarkMode: boolean;
}

export default function ReviewTabs({ product, activeTab, setActiveTab, isEditMode, isDarkMode }: ReviewTabsProps) {
  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: 'ri-information-line' },
    { id: 'media', name: 'Media', icon: 'ri-image-line' },
    { id: 'warranty', name: 'Warranty & Delivery', icon: 'ri-truck-line' },
    { id: 'credentials', name: 'Credentials', icon: 'ri-key-line' },
  ];

  return (
    <div className={`rounded-xl shadow-xl border transition-all duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-800 shadow-cyan-500/5' : 'bg-white border-gray-200'}`}>
      {/* Tab Navigation */}
      <div className={`border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? (isDarkMode 
                      ? 'border-cyan-500 text-cyan-400' 
                      : 'border-amber-500 text-amber-600')
                  : (isDarkMode 
                      ? 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
              }`}
            >
              <i className={`${tab.icon} w-5 h-5 flex items-center justify-center`}></i>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'basic' && (
          <BasicInfoTab product={product} isEditMode={isEditMode} isDarkMode={isDarkMode} />
        )}
        {activeTab === 'media' && (
          <MediaTab product={product} isEditMode={isEditMode} isDarkMode={isDarkMode} />
        )}
        {activeTab === 'warranty' && (
          <WarrantyTab product={product} isEditMode={isEditMode} isDarkMode={isDarkMode} />
        )}
        {activeTab === 'credentials' && (
          <CredentialsTab product={product} isEditMode={isEditMode} isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
}

function BasicInfoTab({ product, isEditMode, isDarkMode }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Product Title
          </label>
          {isEditMode ? (
            <input
              type="text"
              defaultValue={product.title}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none`}
            />
          ) : (
            <p className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
              {product.title}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Category
          </label>
          {isEditMode ? (
            <select className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 pr-8 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none`}>
              <option value="Software">Software</option>
              <option value="Templates">Templates</option>
              <option value="Graphics">Graphics</option>
              <option value="E-Books">E-Books</option>
            </select>
          ) : (
            <p className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
              {product.category}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Price
          </label>
          {isEditMode ? (
            <input
              type="number"
              step="0.01"
              defaultValue={product.price}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none`}
            />
          ) : (
            <p className={`px-4 py-3 rounded-lg font-bold transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
              ${product.price}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Stock Quantity
          </label>
          {isEditMode ? (
            <input
              type="number"
              defaultValue={product.stock}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none`}
            />
          ) : (
            <p className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
              {product.stock} units
            </p>
          )}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Description
        </label>
        {isEditMode ? (
          <textarea
            rows={4}
            defaultValue={product.description}
            maxLength={500}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none`}
          />
        ) : (
          <p className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
            {product.description}
          </p>
        )}
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Key Features
        </label>
        <div className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <ul className="space-y-2">
            {product.features.map((feature: string, index: number) => (
              <li key={index} className={`flex items-center space-x-2 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                <i className={`ri-check-line text-sm w-4 h-4 flex items-center justify-center ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Tags
        </label>
        <div className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaTab({ product, isEditMode, isDarkMode }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Product Image
        </label>
        <div className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
          <div className="flex flex-col items-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-md h-64 object-cover object-top rounded-lg mb-4"
            />
            {isEditMode && (
              <button className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                <i className="ri-upload-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                Change Image
              </button>
            )}
          </div>
        </div>
      </div>

      {product.productType === 'Downloadable' && (
        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Download File
          </label>
          <div className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className={`ri-file-download-line text-2xl w-8 h-8 flex items-center justify-center ${isDarkMode ? 'text-cyan-400' : 'text-amber-600'}`}></i>
                <div>
                  <p className={`font-medium transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {product.downloadFile}
                  </p>
                  <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Executable file • 125 MB
                  </p>
                </div>
              </div>
              <button className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                <i className="ri-download-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WarrantyTab({ product, isEditMode, isDarkMode }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Warranty Period
          </label>
          {isEditMode ? (
            <select className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 pr-8 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none`}>
              <option value="No Warranty">No Warranty</option>
              <option value="30 Days">30 Days</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year" selected>1 Year</option>
              <option value="2 Years">2 Years</option>
            </select>
          ) : (
            <p className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
              {product.warrantyPeriod}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Delivery Method
          </label>
          {isEditMode ? (
            <select className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 pr-8 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none`}>
              <option value="Digital Download" selected>Digital Download</option>
              <option value="Email Delivery">Email Delivery</option>
              <option value="Physical Shipping">Physical Shipping</option>
              <option value="In-Person Pickup">In-Person Pickup</option>
            </select>
          ) : (
            <p className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
              {product.deliveryMethod}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Delivery Instructions
        </label>
        <div className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex items-start space-x-3">
            <i className={`ri-information-line text-lg mt-0.5 w-5 h-5 flex items-center justify-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}></i>
            <div>
              <p className={`font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                Automatic Digital Delivery
              </p>
              <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Upon successful payment, customers will receive an immediate download link via email. The download link will remain active for 30 days and allow up to 3 downloads.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Refund Policy
        </label>
        <div className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex items-start space-x-3">
            <i className={`ri-shield-check-line text-lg mt-0.5 w-5 h-5 flex items-center justify-center ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}></i>
            <div>
              <p className={`font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                7-Day Money Back Guarantee
              </p>
              <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                If you're not satisfied with your purchase, you can request a full refund within 7 days of purchase. Refund requests are processed within 3-5 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CredentialsTab({ product, isEditMode, isDarkMode }: any) {
  if (product.productType === 'Downloadable') {
    return (
      <div className={`text-center py-12 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <i className="ri-information-line text-4xl mb-4"></i>
        <p className="text-lg font-medium mb-2">No Credentials Required</p>
        <p>This is a downloadable product that doesn't require access credentials.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`rounded-lg border p-4 transition-all duration-200 ${isDarkMode ? 'bg-orange-900/20 border-orange-500/30' : 'bg-orange-50 border-orange-200'}`}>
        <div className="flex items-start space-x-3">
          <i className={`ri-alert-line text-lg mt-0.5 w-5 h-5 flex items-center justify-center ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}></i>
          <div>
            <p className={`font-medium mb-1 transition-colors ${isDarkMode ? 'text-orange-300' : 'text-orange-800'}`}>
              Important: Review Credentials Carefully
            </p>
            <p className={`text-sm transition-colors ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>
              These credentials will be provided to customers after purchase. Ensure they are valid and properly formatted.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Username
          </label>
          {isEditMode ? (
            <input
              type="text"
              defaultValue={product.credentials.username}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none`}
            />
          ) : (
            <p className={`px-4 py-3 rounded-lg font-mono transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
              {product.credentials.username}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Password
          </label>
          {isEditMode ? (
            <input
              type="password"
              defaultValue={product.credentials.password}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none`}
            />
          ) : (
            <p className={`px-4 py-3 rounded-lg font-mono transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
              {'•'.repeat(product.credentials.password.length)}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Additional Notes
        </label>
        {isEditMode ? (
          <textarea
            rows={3}
            defaultValue={product.credentials.note}
            maxLength={500}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none`}
          />
        ) : (
          <p className={`px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
            {product.credentials.note}
          </p>
        )}
      </div>

      <div className={`rounded-lg border p-4 transition-all duration-200 ${isDarkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
        <div className="flex items-start space-x-3">
          <i className={`ri-shield-check-line text-lg mt-0.5 w-5 h-5 flex items-center justify-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}></i>
          <div>
            <p className={`font-medium mb-1 transition-colors ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              Security Notice
            </p>
            <p className={`text-sm transition-colors ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              Credentials are encrypted and only visible to approved customers. They are delivered securely via our encrypted email system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}