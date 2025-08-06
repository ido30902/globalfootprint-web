import { useState } from 'react';
import { WorldMap } from './components/WorldMap';
import { SearchBar } from './components/SearchBar';
import { BrandInfo } from './components/BrandInfo';
import { BrandMeter } from './components/BrandMeter';
import { CountryInfo } from './components/CountryInfo';
import type { Brand, Country } from './types';
import './App.css';

function App() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleBrandSelect = (brand: Brand | null) => {
    setSelectedBrand(brand);
    setSelectedCountry(null); // Close country info when brand is selected
  };

  const handleCountryClick = (country: Country) => {
    // Toggle country selection - if same country is clicked, deselect it
    if (selectedCountry?.id === country.id) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(country);
      setSelectedBrand(null); // Close brand info when country is selected
      console.log('country selected', country);
    }
  };

  // Handler for country selection from BrandMeter
  const handleCountrySelectFromMeter = (country: Country) => {
    setSelectedCountry(country);
    setSelectedBrand(null); // Close brand info when country is selected from meter
  };

  // Handler to close CountryInfo
  const handleCloseCountryInfo = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-900">
      {/* Full-screen Map */}
      <div className="absolute inset-0 w-full h-full">
        <WorldMap
          selectedBrand={selectedBrand || undefined}
          selectedCountry={selectedCountry || undefined}
          onCountryClick={handleCountryClick}
          className="w-full h-full"
        />
      </div>

      {/* Always visible Search Bar */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-2xl px-4">
        <SearchBar 
          onBrandSelect={handleBrandSelect}
          onCountrySelect={(country) => country && handleCountryClick(country)}
          selectedBrand={selectedBrand || undefined}
          selectedCountry={selectedCountry || undefined}
        />
      </div>

      {/* Brand Info Panel - positioned on the right when brand is selected */}
      {selectedBrand && !selectedCountry && (
        <div className="absolute top-4 right-4 z-20 w-80 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="backdrop-blur-md bg-white/95 rounded-2xl shadow-2xl border border-white/20">
            <BrandInfo 
              brand={selectedBrand}
              className="bg-transparent border-0 shadow-none"
            />
          </div>
        </div>
      )}

      {/* Country Info Panel - positioned on the right when country is selected */}
      {selectedCountry && (
        <CountryInfo 
          selectedCountry={selectedCountry}
          onBrandSelect={handleBrandSelect}
          onClose={handleCloseCountryInfo}
        />
      )}

      {/* Brand Meter - always visible in bottom left */}
      <BrandMeter
        onBrandSelect={handleBrandSelect}
        onCountrySelect={handleCountrySelectFromMeter}
      />
    </div>
  );
}

export default App;
