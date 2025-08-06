import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink } from 'lucide-react';
import type { Brand, Country } from '../types';
import { getCountriesByContinent } from '../data/countries';

interface BrandInfoProps {
  brand: Brand;
  hoveredCountry?: Country | null;
  className?: string;
}

export const BrandInfo: React.FC<BrandInfoProps> = ({
  brand,
  hoveredCountry: _hoveredCountry,
  className = ''
}) => {
  const continentStats = React.useMemo(() => {
    const stats = new Map<string, number>();
    
    brand.countries.forEach(countryId => {
      // Find continent for this country
      const allCountries = [
        ...getCountriesByContinent('North America'),
        ...getCountriesByContinent('South America'),
        ...getCountriesByContinent('Europe'),
        ...getCountriesByContinent('Asia'),
        ...getCountriesByContinent('Africa'),
        ...getCountriesByContinent('Oceania'),
      ];
      
      const country = allCountries.find(c => c.id === countryId);
      if (country) {
        stats.set(country.continent, (stats.get(country.continent) || 0) + 1);
      }
    });
    
    return Array.from(stats.entries()).sort((a, b) => b[1] - a[1]);
  }, [brand.countries]);

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

  const logoUrl = getLogoUrl(brand.website);
  const totalCountries = 195; // Approximate total number of countries
  const coverage = Math.round((brand.countries.length / totalCountries) * 100);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start gap-4">
          {/* Logo and Brand Color */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {logoUrl ? (
              <div className="relative">
                <img
                  src={logoUrl}
                  alt={`${brand.name} logo`}
                  className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-200 shadow-sm"
                  onError={(e) => {
                    // Fallback to brand color circle if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLDivElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div
                  className="w-10 h-10 rounded-lg hidden"
                  style={{ backgroundColor: brand.color }}
                />
              </div>
            ) : (
              <div
                className="w-10 h-10 rounded-lg"
                style={{ backgroundColor: brand.color }}
              />
            )}
          </div>
          
          {/* Brand Info */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl leading-tight">{brand.name}</CardTitle>
            <CardDescription className="mt-1">{brand.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Industry:</span>
            <div className="mt-1">
              <Badge variant="outline">{brand.industry}</Badge>
            </div>
          </div>
          
          <div>
            <span className="font-medium text-gray-600">Global Presence:</span>
            <div className="mt-1 text-lg font-semibold">
              {brand.countries.length} countries ({coverage}%)
            </div>
          </div>
          
          {brand.founded && (
            <div>
              <span className="font-medium text-gray-600">Founded:</span>
              <div className="mt-1">{brand.founded}</div>
            </div>
          )}
          
          {brand.headquarters && (
            <div>
              <span className="font-medium text-gray-600">Headquarters:</span>
              <div className="mt-1">{brand.headquarters}</div>
            </div>
          )}
        </div>

        {/* Website Link */}
        {brand.website && (
          <div>
            <span className="font-medium text-gray-600">Website:</span>
            <div className="mt-1">
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm transition-colors duration-150"
              >
                {brand.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}

        {/* Continental Breakdown */}
        <div>
          <span className="font-medium text-gray-600">Continental Presence:</span>
          <div className="mt-2 space-y-2">
            {continentStats.map(([continent, count]) => (
              <div key={continent} className="flex items-center justify-between">
                <span className="text-sm">{continent}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: brand.color,
                        width: `${(count / brand.countries.length) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </CardContent>
    </Card>
  );
}; 