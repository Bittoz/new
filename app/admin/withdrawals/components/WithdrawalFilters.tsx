'use client';

interface WithdrawalFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
}

export default function WithdrawalFilters({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  dateFilter,
  setDateFilter 
}: WithdrawalFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Requests
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line text-gray-400"></i>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by seller or request ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="relative">
            <button 
              className="w-full pl-4 pr-8 py-2 text-left border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-white cursor-pointer"
              onClick={() => {/* Handle dropdown */}}
            >
              {statusFilter === 'all' ? 'All Status' :
               statusFilter === 'pending' ? 'Pending' :
               statusFilter === 'processing' ? 'Processing' :
               statusFilter === 'completed' ? 'Completed' :
               'Rejected'}
              <i className="ri-arrow-down-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="relative">
            <button 
              className="w-full pl-4 pr-8 py-2 text-left border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-white cursor-pointer"
              onClick={() => {/* Handle dropdown */}}
            >
              {dateFilter === 'all' ? 'All Time' :
               dateFilter === 'today' ? 'Today' :
               dateFilter === 'week' ? 'This Week' :
               dateFilter === 'month' ? 'This Month' :
               'Custom Range'}
              <i className="ri-arrow-down-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Actions
          </label>
          <div className="flex space-x-2">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-2"></i>
              Reset
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-download-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}