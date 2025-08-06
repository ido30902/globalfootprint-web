import React, { useState, useMemo } from 'react';
import type { Brand, Country } from '../types';
import { brandsData, getAllBrands } from '../data/brands';
import { getCountryById } from '../data/countries';

interface BrandMeterProps {
  onBrandSelect?: (brand: Brand) => void;
  onCountrySelect?: (country: Country) => void;
  className?: string;
}

export const BrandMeter: React.FC<BrandMeterProps> = ({
  onBrandSelect,
  onCountrySelect,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'brands' | 'countries'>('brands');
  const [isExpanded, setIsExpanded] = useState(true);

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

  // Get top 10 brands by country count
  const topBrands = useMemo(() => {
    return getAllBrands()
      .sort((a, b) => b.countries.length - a.countries.length)
      .slice(0, 10);
  }, []);

  // Get top 10 countries by brand count
  const topCountries = useMemo(() => {
    const countryBrandCount = new Map<string, number>();
    
    // Count brands for each country
    Object.values(brandsData).forEach(brand => {
      brand.countries.forEach(countryCode => {
        const current = countryBrandCount.get(countryCode) || 0;
        countryBrandCount.set(countryCode, current + 1);
      });
    });

    // Convert to array and sort by brand count
    return Array.from(countryBrandCount.entries())
      .map(([countryCode, brandCount]) => ({
        country: getCountryById(countryCode),
        brandCount
      }))
      .filter(item => item.country) // Remove any invalid countries
      .sort((a, b) => b.brandCount - a.brandCount)
      .slice(0, 10);
  }, []);

  const BrandLogo: React.FC<{ brand: Brand }> = ({ brand }) => {
    const logoUrl = getLogoUrl(brand.website);
    
    return logoUrl ? (
      <div className="relative">
        <img
          src={logoUrl}
          alt={`${brand.name} logo`}
          className="w-5 h-5 rounded object-contain bg-white border border-gray-200 shadow-sm"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLDivElement;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        <div
          className="w-5 h-5 rounded-full hidden"
          style={{ backgroundColor: brand.color }}
        />
      </div>
    ) : (
      <div
        className="w-5 h-5 rounded-full"
        style={{ backgroundColor: brand.color }}
      />
    );
  };

  return (
    <div className={`absolute bottom-4 left-4 z-10 ${className}`}>
      <div className={`backdrop-blur-md bg-white/90 rounded-lg shadow-lg border border-white/20 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-80' : 'w-12'
      }`}>
        {isExpanded ? (
          /* Expanded View */
          <div className="p-3">
            {/* Header with Toggle */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">Global Insights</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                title="Minimize"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex rounded-md bg-gray-100 p-0.5 mb-2">
              <button
                onClick={() => setActiveTab('brands')}
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                  activeTab === 'brands'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Top Brands
              </button>
              <button
                onClick={() => setActiveTab('countries')}
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                  activeTab === 'countries'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Top Countries
              </button>
            </div>

            {/* Content */}
            <div className="h-48 overflow-y-auto">
              {activeTab === 'brands' ? (
                /* Top Brands List */
                <div className="space-y-0.5">
                  {topBrands.map((brand, index) => (
                    <button
                      key={brand.id}
                      onClick={() => onBrandSelect?.(brand)}
                      className="w-full flex items-center gap-2 px-1.5 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <span className="text-xs font-medium text-gray-500 w-3 text-center">
                          {index + 1}
                        </span>
                        <BrandLogo brand={brand} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-gray-900 truncate">
                            {brand.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 flex-shrink-0">
                        {brand.countries.length}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* Top Countries List */
                <div className="space-y-0.5">
                  {topCountries.map((item, index) => (
                    <button
                      key={item.country!.id}
                      onClick={() => onCountrySelect?.(item.country!)}
                      className="w-full flex items-center gap-2 px-1.5 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <span className="text-xs font-medium text-gray-500 w-3 text-center">
                          {index + 1}
                        </span>
                        <img
                          src={`https://flagsapi.com/${item.country!.iso2}/flat/64.png`}
                          alt={`${item.country!.name} flag`}
                          className="w-5 h-3 object-cover rounded-sm border border-gray-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-gray-900 truncate">
                            {item.country!.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 flex-shrink-0">
                        {item.brandCount}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Minimized View */
          <div className="p-2">
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors group"
              title="Expand Global Insights"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
