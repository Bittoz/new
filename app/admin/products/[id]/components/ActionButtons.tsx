
'use client';

import { useState } from 'react';

interface ActionButtonsProps {
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  isDarkMode: boolean;
  isMobile?: boolean;
}

export default function ActionButtons({ 
  onApprove, 
  onReject, 
  onDelete, 
  isEditMode, 
  setIsEditMode, 
  isDarkMode,
  isMobile = false 
}: ActionButtonsProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      onApprove();
      setShowApproveModal(false);
    } catch (error) {
      console.error('Failed to approve product:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (rejectReason.trim()) {
      setIsProcessing(true);
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1500));
        onReject();
        setShowRejectModal(false);
        setRejectReason('');
      } catch (error) {
        console.error('Failed to reject product:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      onDelete();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const buttonClass = isMobile ? 'flex-1' : '';

  return (
    <>
      <div className={`flex ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
        {/* Edit Mode Toggle */}
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          disabled={isProcessing}
          className={`${buttonClass} px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            isEditMode
              ? (isDarkMode 
                  ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                  : 'bg-gray-500 hover:bg-gray-600 text-white')
              : (isDarkMode 
                  ? 'border border-gray-600 text-gray-300 hover:bg-gray-800' 
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50')
          }`}
        >
          <i className={`${isEditMode ? 'ri-save-line' : 'ri-edit-line'} w-4 h-4 flex items-center justify-center`}></i>
          <span>{isEditMode ? 'Save' : 'Edit'}</span>
        </button>

        {/* Approve Button */}
        <button
          onClick={() => setShowApproveModal(true)}
          disabled={isProcessing}
          className={`${buttonClass} bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2`}
        >
          {isProcessing ? (
            <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center"></i>
          ) : (
            <i className="ri-check-line w-4 h-4 flex items-center justify-center"></i>
          )}
          <span>Approve</span>
        </button>

        {/* Reject Button */}
        <button
          onClick={() => setShowRejectModal(true)}
          disabled={isProcessing}
          className={`${buttonClass} bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2`}
        >
          <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
          <span>Reject</span>
        </button>

        {/* Delete Button */}
        {!isMobile && (
          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={isProcessing}
            className="text-red-400 hover:text-red-600 disabled:text-red-300 disabled:cursor-not-allowed p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 cursor-pointer"
          >
            <i className="ri-delete-bin-line text-lg w-5 h-5 flex items-center justify-center"></i>
          </button>
        )}
      </div>

      {/* Approve Confirmation Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => !isProcessing && setShowApproveModal(false)}></div>
            
            <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <i className="ri-check-circle-line text-green-600 dark:text-green-400 text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Approve Product
                    </h3>
                    <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Are you sure you want to approve this product? It will be published to the marketplace immediately.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`px-6 py-4 bg-green-50 dark:bg-green-900/10 border-y ${isDarkMode ? 'border-gray-800' : 'border-green-200'}`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-information-line text-green-600 dark:text-green-400"></i>
                  </div>
                  <div className="space-y-2">
                    <p className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                      What happens when you approve:
                    </p>
                    <ul className={`text-xs space-y-1 transition-colors ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>Product will be published to the marketplace</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>Seller will be notified via email</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>Product status will change to "Active"</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>Customers can start purchasing immediately</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className={`px-6 py-4 flex justify-end space-x-3 border-t ${isDarkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <button
                  onClick={() => setShowApproveModal(false)}
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center"></i>
                      <span>Approving...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-check-line w-4 h-4 flex items-center justify-center"></i>
                      <span>Approve Product</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => !isProcessing && setShowRejectModal(false)}></div>
            
            <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:block sm:p-0 ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <i className="ri-close-circle-line text-red-600 dark:text-red-400 text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Reject Product
                    </h3>
                    <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Please provide a reason for rejecting this product.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                  maxLength={500}
                  disabled={isProcessing}
                  placeholder="Enter rejection reason..."
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-red-500 focus:ring-red-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500/20'} focus:ring-4 focus:outline-none`}
                />
                <p className={`text-xs mt-2 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {rejectReason.length}/500 characters
                </p>
              </div>
              
              <div className={`px-6 py-4 flex justify-end space-x-3 border-t ${isDarkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <button
                  onClick={() => setShowRejectModal(false)}
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectReason.trim() || isProcessing}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center"></i>
                      <span>Rejecting...</span>
                    </>
                  ) : (
                    <span>Reject Product</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => !isProcessing && setShowDeleteModal(false)}></div>
            
            <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <i className="ri-delete-bin-line text-red-600 dark:text-red-400 text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Delete Product
                    </h3>
                    <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Are you sure you want to permanently delete this product? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`px-6 py-4 flex justify-end space-x-3 border-t ${isDarkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isProcessing}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center"></i>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete Product</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
