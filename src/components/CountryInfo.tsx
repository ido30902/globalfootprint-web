import React from 'react';
import type { Brand, Country } from '../types';
import { brandsData } from '../data/brands';

interface CountryInfoProps {
  selectedCountry?: Country | null;
  onBrandSelect?: (brand: Brand) => void;
  onClose?: () => void;
  className?: string;
}

export const CountryInfo: React.FC<CountryInfoProps> = ({
  selectedCountry,
  onBrandSelect,
  onClose,
  className = ''
}) => {
  if (!selectedCountry) return null;

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

  // Filter brands that operate in this country
  const operatingBrands = Object.values(brandsData).filter(brand => 
    brand.countries.includes(selectedCountry.iso2)
  );

  const BrandLogo: React.FC<{ brand: Brand }> = ({ brand }) => {
    const logoUrl = getLogoUrl(brand.website);
    
    return logoUrl ? (
      <div className="relative">
        <img
          src={logoUrl}
          alt={`${brand.name} logo`}
          className="w-6 h-6 rounded object-contain bg-white border border-gray-200 shadow-sm"
          onError={(e) => {
            // Fallback to brand color circle if logo fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLDivElement;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        <div
          className="w-6 h-6 rounded-full hidden"
          style={{ backgroundColor: brand.color }}
        />
      </div>
    ) : (
      <div
        className="w-6 h-6 rounded-full"
        style={{ backgroundColor: brand.color }}
      />
    );
  };

  return (
    <div className={`absolute top-6 right-6 z-10 ${className}`}>
      <div className="backdrop-blur-md bg-white/90 rounded-xl shadow-lg border border-white/20 p-4 max-w-xs">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Country Header */}
        <div className="flex items-center gap-3 mb-2">
          <img
            src={`https://flagsapi.com/${selectedCountry.iso2}/flat/64.png`}
            alt={`${selectedCountry.name} flag`}
            className="w-8 h-6 object-cover rounded border border-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {selectedCountry.name}
            </h3>
            <p className="text-xs text-gray-600">
              {operatingBrands.length} brands • {selectedCountry.continent}
            </p>
          </div>
        </div>

        {/* Operating Brands List */}
        <div className="pt-3 border-t border-gray-200">
          <h4 className="text-xs font-medium text-gray-700 mb-1">Operating Brands</h4>
          <p className="text-xs text-gray-500 mb-2">Click to select brand</p>
          <div className="max-h-32 overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              {operatingBrands.length > 0 ? (
                operatingBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="flex items-center gap-2 px-2 py-1 rounded text-xs transition-colors cursor-pointer hover:bg-gray-100"
                    onClick={() => onBrandSelect?.(brand)}
                  >
                    <BrandLogo brand={brand} />
                    <div className="flex-1">
                      <div className="text-gray-900 font-medium">{brand.name}</div>
                      <div className="text-gray-600">{brand.industry}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-500 text-center py-2">
                  No major brands found for this country
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
