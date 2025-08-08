'use client';

interface ProductFiltersProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: number[];
  onPriceChange: (range: number[]) => void;
}

export default function ProductFilters({ sortBy, onSortChange, priceRange, onPriceChange }: ProductFiltersProps) {
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-6">
      {/* Sort By */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sortBy === option.value}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500 cursor-pointer"
              />
              <span className="ml-3 text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">$0</span>
            <span className="text-sm text-gray-600">$1000+</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([0, parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => onPriceChange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Min"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value) || 1000])}
              className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
              />
              <div className="ml-3 flex items-center">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`ri-star-${i < rating ? 'fill' : 'line'} text-sm`}></i>
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Delivery Time */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
            />
            <span className="ml-3 text-gray-700">Instant Download</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
            />
            <span className="ml-3 text-gray-700">Within 24 Hours</span>
          </label>
        </div>
      </div>
    </div>
  );
}