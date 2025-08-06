import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Globe } from 'lucide-react';
import type { Brand, Country } from '../types';
import { searchBrands, getAllBrands } from '../data/brands';
import { searchCountries, getAllCountries } from '../data/countries';

type SearchResultItem = {
  type: 'brand';
  item: Brand;
} | {
  type: 'country';
  item: Country;
};

interface SearchBarProps {
  onBrandSelect: (brand: Brand | null) => void;
  onCountrySelect?: (country: Country | null) => void;
  selectedBrand?: Brand;
  selectedCountry?: Country;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onBrandSelect,
  onCountrySelect,
  selectedBrand,
  selectedCountry,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Extract domain from website URL for Clearbit logo API
  const getLogoUrl = (website?: string): string | null => {
    if (!website) return null;
    try {
      const domain = website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
      return `https://logo.clearbit.com/${domain}`;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (query.trim()) {
      const brandResults = searchBrands(query).slice(0, 4).map(brand => ({ type: 'brand' as const, item: brand }));
      const countryResults = searchCountries(query).slice(0, 4).map(country => ({ type: 'country' as const, item: country }));
      const allResults = [...brandResults, ...countryResults];
      setSearchResults(allResults);
      setIsOpen(allResults.length > 0);
    } else {
      // Show popular brands and some countries when no query
      const popularBrands = getAllBrands().slice(0, 4).map(brand => ({ type: 'brand' as const, item: brand }));
      const popularCountries = getAllCountries().slice(0, 4).map(country => ({ type: 'country' as const, item: country }));
      const allResults = [...popularBrands, ...popularCountries];
      setSearchResults(allResults);
      setIsOpen(false); // Don't show by default
    }
  }, [query]);

  const handleBrandSelect = (brand: Brand) => {
    setQuery('');
    setIsOpen(false);
    setIsEditMode(false);
    onBrandSelect(brand);
    inputRef.current?.blur();
  };

  const handleCountrySelect = (country: Country) => {
    setQuery('');
    setIsOpen(false);
    setIsEditMode(false);
    onCountrySelect?.(country);
    inputRef.current?.blur();
  };

  const handleResultSelect = (result: SearchResultItem) => {
    if (result.type === 'brand') {
      handleBrandSelect(result.item);
    } else {
      handleCountrySelect(result.item);
    }
  };

  const handleClearSelection = () => {
    onBrandSelect(null);
    onCountrySelect?.(null);
    setQuery('');
    setIsOpen(false);
    setIsEditMode(false);
    inputRef.current?.focus();
  };

  const handleSelectedBrandClick = () => {
    if (!isOpen) {
      const popularBrands = getAllBrands().slice(0, 4).map(brand => ({ type: 'brand' as const, item: brand }));
      const popularCountries = getAllCountries().slice(0, 4).map(country => ({ type: 'country' as const, item: country }));
      const allResults = [...popularBrands, ...popularCountries];
      setSearchResults(allResults);
      setIsOpen(true);
      setIsEditMode(true);
      // Focus the input after a short delay to ensure it's rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  };

  const handleInputFocus = () => {
    if (!query) {
      const popularBrands = getAllBrands().slice(0, 4).map(brand => ({ type: 'brand' as const, item: brand }));
      const popularCountries = getAllCountries().slice(0, 4).map(country => ({ type: 'country' as const, item: country }));
      const allResults = [...popularBrands, ...popularCountries];
      setSearchResults(allResults);
    }
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay hiding to allow clicks on results
    setTimeout(() => {
      setIsOpen(false);
      setIsEditMode(false);
    }, 200);
  };

  const handleSelectedBrandBlur = () => {
    // Delay hiding to allow clicks on results
    setTimeout(() => {
      setIsOpen(false);
      setIsEditMode(false);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditMode(false);
      setIsOpen(false);
      setQuery('');
    }
  };

  const BrandLogo: React.FC<{ brand: Brand; size?: 'sm' | 'md' | 'lg' }> = ({ brand, size = 'md' }) => {
    const logoUrl = getLogoUrl(brand.website);
    const sizeClasses = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
    
    return logoUrl ? (
      <div className="relative">
        <img
          src={logoUrl}
          alt={`${brand.name} logo`}
          className={`${sizeClasses} rounded object-contain bg-white border border-gray-200 shadow-sm flex-shrink-0`}
          onError={(e) => {
            // Fallback to brand color circle if logo fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLDivElement;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        <div
          className={`${sizeClasses} rounded-full border border-white shadow-sm flex-shrink-0 hidden`}
          style={{ backgroundColor: brand.color }}
        />
      </div>
    ) : (
      <div
        className={`${sizeClasses} rounded-full border border-white shadow-sm flex-shrink-0`}
        style={{ backgroundColor: brand.color }}
      />
    );
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input or Selected Brand Display */}
      <div className="relative">
        {selectedBrand || selectedCountry ? (
          isEditMode ? (
            // Edit Mode - Show input field with search icon
            <>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search brands or countries..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-md border border-white/20 rounded-full shadow-lg text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              />
            </>
          ) : (
            // Selected Brand or Country Display
            <div 
              onClick={handleSelectedBrandClick}
              onBlur={handleSelectedBrandBlur}
              tabIndex={0}
              className="w-full pl-4 pr-12 py-4 bg-white/90 backdrop-blur-md border border-white/20 rounded-full shadow-lg flex items-center gap-3 cursor-pointer hover:bg-white/95 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {selectedBrand ? (
                <>
                  <BrandLogo brand={selectedBrand} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-base truncate">
                      {selectedBrand.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedBrand.countries.length} countries
                    </div>
                  </div>
                </>
              ) : selectedCountry ? (
                <>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img
                      src={`https://flagsapi.com/${selectedCountry.iso2}/flat/64.png`}
                      alt={`${selectedCountry.name} flag`}
                      className="w-6 h-4 object-cover rounded-sm border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLDivElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="w-6 h-6 rounded-full bg-blue-100 hidden items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-base truncate">
                      {selectedCountry.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedCountry.continent}
                    </div>
                  </div>
                </>
              ) : null}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearSelection();
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-150"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          )
        ) : (
          // Search Input
          <>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search brands or countries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-md border border-white/20 rounded-full shadow-lg text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
          </>
        )}
      </div>

      {/* Dropdown Menu - show when opened */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-30">
          <div className="max-h-80 overflow-y-auto">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-700">
                {query ? 'Search Results' : 'Popular Items'}
              </h3>
            </div>
            
            {/* Results */}
            <div className="py-2">
              {searchResults.map((result) => (
                <button
                  key={result.type === 'brand' ? `brand-${result.item.id}` : `country-${result.item.id}`}
                  onClick={() => handleResultSelect(result)}
                  className="w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50/80 transition-colors duration-150"
                >
                  {result.type === 'brand' ? (
                    <>
                      {/* Brand Logo */}
                      <BrandLogo brand={result.item} size="lg" />
                      
                      {/* Brand Info */}
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900 text-base">
                          {result.item.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Brand • {result.item.industry}
                        </div>
                      </div>
                      
                      {/* Country Count */}
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {result.item.countries.length}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Country Flag/Icon */}
                      <div className="w-8 h-8 flex items-center justify-center">
                        <img
                          src={`https://flagsapi.com/${result.item.iso2}/flat/64.png`}
                          alt={`${result.item.name} flag`}
                          className="w-6 h-4 object-cover rounded-sm border border-gray-200"
                          onError={(e) => {
                            // Fallback to globe icon if flag fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLDivElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="w-6 h-6 rounded-full bg-blue-100 hidden items-center justify-center">
                          <Globe className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      
                      {/* Country Info */}
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900 text-base">
                          {result.item.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Country • {result.item.continent}
                        </div>
                      </div>
                      
                      {/* ISO Code */}
                      <div className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
                        {result.item.iso2}
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
            
            {query && searchResults.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No results found for "{query}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 