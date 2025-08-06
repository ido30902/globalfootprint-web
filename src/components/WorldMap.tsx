import React, { useEffect, useRef, useState, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Brand, Country } from '../types';
import { getCountryById } from '../data/countries';

interface WorldMapProps {
  selectedBrand?: Brand;
  selectedCountry?: Country;
  onCountryHover?: (country: Country | null) => void;
  onCountryClick?: (country: Country) => void;
  className?: string;
}


// FIXED: Countries not clickable and flyTo issues resolved
// Issues were: 1) Missing countries in database, 2) Layer mismatch, 3) Case sensitivity, 4) Incomplete coordinates

export const WorldMap: React.FC<WorldMapProps> = ({
  selectedBrand,
  selectedCountry,
  onCountryHover,
  onCountryClick,
  className = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

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

  const highlightedCountries = useMemo(() => {
    if (!selectedBrand) return new Set<string>();
    return new Set(selectedBrand.countries);
  }, [selectedBrand]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=cPEdgepcLHHFIMMO0kiL',
      center: [0, 30],
      zoom: 1,
      minZoom: 2,
      maxZoom: 6.5,
      doubleClickZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchZoomRotate: false
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Add country fill source and layer for highlighting
      addCountryHighlightLayer();

      // Update country styling after map loads
      setTimeout(() => {
        updateCountryStyles();
      }, 100);

      // FIXED: Use single layer for both hover and click to ensure consistency
      const setupCountryInteractionHandlers = () => {
        const targetLayer = 'countries-highlight-fill';
        
        if (map.current!.getLayer(targetLayer)) {
          console.log('Setting up interaction handlers for layer:', targetLayer);
          
          // Handle country hover
          map.current!.on('mousemove', targetLayer, (e) => {
            if (e.features && e.features[0]) {
              const feature = e.features[0];
              const countryCode = feature.properties?.iso_a2;
              
              console.log('Country hovered:', countryCode, feature.properties);
              
              if (countryCode && countryCode !== hoveredCountry) {
                // FIXED: Use ISO2 code consistently 
                setHoveredCountry(countryCode.toUpperCase());
                const country = getCountryById(countryCode);
                if (country && onCountryHover) {
                  onCountryHover(country);
                }
              }
            }
          });

          // Handle mouse leave
          map.current!.on('mouseleave', targetLayer, () => {
            setHoveredCountry(null);
            if (onCountryHover) {
              onCountryHover(null);
            }
          });

          // Handle country click - same layer as hover
          map.current!.on('click', targetLayer, (e) => {
            if (e.features && e.features[0]) {
              const feature = e.features[0];
              const countryCode = feature.properties?.iso_a2;
              
              console.log('Country clicked:', countryCode, feature.properties);
              
              if (countryCode) {
                const country = getCountryById(countryCode);
                if (country && onCountryClick) {
                  onCountryClick(country);
                } else {
                  console.log('Country not found in database:', countryCode);
                }
              }
            }
          });

          // Cursor handling
          map.current!.on('mouseenter', targetLayer, () => {
            map.current!.getCanvas().style.cursor = 'pointer';
          });

          map.current!.on('mouseleave', targetLayer, () => {
            map.current!.getCanvas().style.cursor = '';
          });
        } else {
          console.log('Countries highlight layer not found');
        }
      };

      // Set up interaction handlers after a short delay to ensure layers are loaded
      setTimeout(setupCountryInteractionHandlers, 200);


    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Fly to country when selectedCountry changes
  useEffect(() => {
    if (selectedCountry && map.current) {
      flyToCountry(selectedCountry);
    }
  }, [selectedCountry]);

  // Update country styling based on selected brand and country
  useEffect(() => {
    if (!map.current) return;
    
    if (map.current.isStyleLoaded()) {
      updateCountryStyles();
    } else {
      map.current.on('style.load', updateCountryStyles);
    }
  }, [selectedBrand, selectedCountry, hoveredCountry, highlightedCountries]);

  const addCountryHighlightLayer = () => {
    if (!map.current) return;

    // Add MapTiler Countries source for country polygons
    map.current.addSource('countries-highlight', {
      type: 'vector',
      url: `https://api.maptiler.com/tiles/countries/tiles.json?key=cPEdgepcLHHFIMMO0kiL`
    });

    // FIXED: Increase opacity slightly for better click detection
    map.current.addLayer({
      id: 'countries-highlight-fill',
      type: 'fill',
      source: 'countries-highlight',
      'source-layer': 'administrative',
      filter: ['==', 'level', 0], // Only countries (level 0)
      paint: {
        'fill-color': 'transparent',
        'fill-opacity': 0.01 // Slightly higher opacity for better interaction
      }
    });

    console.log('Added country highlight layer');
  };

  const updateCountryStyles = () => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    try {
      const targetLayer = 'countries-highlight-fill';
      
      if (!map.current.getLayer(targetLayer)) {
        console.log('Countries highlight layer not found');
        return;
      }

      // Create expressions for fill color and opacity using iso_a2 property
      const fillColorExpression: any = [
        'case',
        // Priority 1: Selected country (blue)
        ['==', ['get', 'iso_a2'], selectedCountry?.iso2 || ''],
        '#3B82F6', // Blue color for selected country
        // Priority 2: Brand countries
        ['in', ['get', 'iso_a2'], ['literal', Array.from(highlightedCountries)]],
        selectedBrand?.color || '#3B82F6',
        // Priority 3: Hovered country
        ['==', ['get', 'iso_a2'], hoveredCountry || ''],
        '#9CA3AF',
        // Default: transparent
        'transparent'
      ];

      const fillOpacityExpression: any = [
        'case',
        // Priority 1: Selected country (highest opacity)
        ['==', ['get', 'iso_a2'], selectedCountry?.iso2 || ''],
        0.9,
        // Priority 2: Brand countries
        ['in', ['get', 'iso_a2'], ['literal', Array.from(highlightedCountries)]],
        0.8,
        // Priority 3: Hovered country
        ['==', ['get', 'iso_a2'], hoveredCountry || ''],
        0.6,
        // Default: no fill
        0
      ];

      map.current.setPaintProperty(targetLayer, 'fill-color', fillColorExpression);
      map.current.setPaintProperty(targetLayer, 'fill-opacity', fillOpacityExpression);

      console.log('Updated country styles for:', {
        selected: selectedCountry?.iso2,
        hovered: hoveredCountry,
        highlighted: Array.from(highlightedCountries)
      });

    } catch (error) {
      console.log('Error updating country styles:', error);
    }
  };

  // ENHANCED: Comprehensive flyToCountry function with all brand countries
  const flyToCountry = (country: Country) => {
    if (!map.current) return;

    // Comprehensive country coordinates for all countries referenced in brands
    const countryCoordinates: Record<string, [number, number, number]> = {
      // North America
      'US': [-95.7129, 37.0902, 3],
      'CA': [-106.3468, 56.1304, 2.5],
      'MX': [-102.5528, 23.6345, 4],
      
      // Europe
      'GB': [-3.4360, 55.3781, 5],
      'FR': [2.2137, 46.2276, 5],
      'DE': [10.4515, 51.1657, 5],
      'IT': [12.5674, 41.8719, 5],
      'ES': [-3.7492, 40.4637, 5],
      'NL': [5.2913, 52.1326, 6],
      'BE': [4.4699, 50.5039, 6],
      'CH': [8.2275, 46.8182, 6],
      'AT': [14.5501, 47.5162, 6],
      'SE': [18.6435, 60.1282, 4],
      'NO': [9.5018, 60.4720, 4],
      'DK': [9.5018, 56.2639, 6],
      'FI': [25.7482, 61.9241, 4],
      'PL': [19.1343, 51.9194, 5],
      'CZ': [15.4730, 49.8175, 6],
      'GR': [21.8243, 39.0742, 5], // ADDED: Greece
      'HU': [19.5033, 47.1625, 6], // ADDED: Hungary
      'IE': [-8.2439, 53.4129, 6], // ADDED: Ireland
      'PT': [-8.2245, 39.3999, 5], // ADDED: Portugal
      'RO': [24.9668, 45.9432, 5], // ADDED: Romania
      'RU': [105.3188, 61.5240, 2],

      // Asia
      'CN': [104.1954, 35.8617, 3],
      'JP': [138.2529, 36.2048, 4],
      'IN': [78.9629, 20.5937, 3],
      'KR': [127.7669, 35.9078, 6],
      'TH': [100.9925, 15.8700, 5],
      'VN': [108.2772, 14.0583, 5],
      'PH': [121.7740, 12.8797, 5],
      'ID': [113.9213, -0.7893, 4],
      'MY': [101.9758, 4.2105, 5],
      'SG': [103.8198, 1.3521, 8],
      'BD': [90.3563, 23.6850, 6], // ADDED: Bangladesh
      'HK': [114.1694, 22.3193, 7], // ADDED: Hong Kong
      'LK': [80.7718, 7.8731, 6], // ADDED: Sri Lanka
      'PK': [69.3451, 30.3753, 4], // ADDED: Pakistan
      'TW': [120.9605, 23.6978, 6], // ADDED: Taiwan

      // Oceania
      'AU': [133.7751, -25.2744, 3],
      'NZ': [174.8860, -40.9006, 5],
      'FJ': [178.0650, -17.7134, 7], // ADDED: Fiji

      // South America
      'BR': [-51.9253, -14.2350, 3],
      'AR': [-63.6167, -38.4161, 3],
      'CL': [-71.5430, -35.6751, 3],
      'CO': [-74.2973, 4.5709, 4],
      'PE': [-75.0152, -9.1900, 4],
      'EC': [-78.1834, -1.8312, 5], // ADDED: Ecuador
      'UY': [-55.7658, -32.5228, 6], // ADDED: Uruguay
      'VE': [-66.5897, 6.4238, 4], // ADDED: Venezuela

      // Africa
      'ZA': [22.9375, -30.5595, 4],
      'EG': [30.8025, 26.8206, 5],
      'NG': [8.6753, 9.0820, 4],
      'KE': [37.9062, -0.0236, 5],
      'MA': [-7.0926, 31.7917, 5],
      'BW': [24.6849, -22.3285, 5], // ADDED: Botswana
      'GH': [-1.0232, 7.9465, 6], // ADDED: Ghana
      'NA': [18.4241, -22.9576, 5], // ADDED: Namibia
      'TN': [9.5375, 33.8869, 6], // ADDED: Tunisia
      'TZ': [34.8888, -6.3690, 5], // ADDED: Tanzania
      'UG': [32.2903, 1.3733, 6], // ADDED: Uganda
      'ZM': [27.8546, -13.1339, 5], // ADDED: Zambia
      'ZW': [29.1549, -19.0154, 5], // ADDED: Zimbabwe

      // Middle East
      'AE': [53.8478, 23.4241, 6],
      'SA': [45.0792, 23.8859, 4],
      'TR': [35.2433, 38.9637, 5],
      'IR': [53.6880, 32.4279, 4],
      'IL': [34.8516, 32.1651, 6],
      
      // COMPREHENSIVE ADDITION: All remaining countries from database
      // Europe - Additional
      'IS': [19.0208, 64.9631, 6], // Iceland
      'LU': [6.1296, 49.8153, 8], // Luxembourg
      'MT': [14.3754, 35.9375, 8], // Malta
      'CY': [33.4299, 35.1264, 7], // Cyprus
      'EE': [25.0136, 58.5953, 6], // Estonia
      'LV': [24.6032, 56.8796, 6], // Latvia
      'LT': [23.8813, 55.1694, 6], // Lithuania
      'SI': [14.9955, 46.1512, 7], // Slovenia
      'SK': [19.6990, 48.6690, 6], // Slovakia
      'HR': [15.2000, 45.1000, 6], // Croatia
      'BA': [17.6791, 43.9159, 6], // Bosnia and Herzegovina
      'RS': [21.0059, 44.0165, 6], // Serbia
      'ME': [19.3744, 42.7087, 7], // Montenegro
      'MK': [21.7453, 41.6086, 7], // North Macedonia
      'AL': [20.1683, 41.1533, 6], // Albania
      'BG': [25.4858, 42.7339, 6], // Bulgaria
      'MD': [28.3699, 47.4116, 7], // Moldova
      'UA': [31.1656, 48.3794, 4], // Ukraine
      'BY': [27.9534, 53.7098, 6], // Belarus
      
      // Asia - Additional
      'AF': [67.7090, 33.9391, 5], // Afghanistan
      'KW': [47.4818, 29.3117, 7], // Kuwait
      'BH': [50.6378, 26.0667, 8], // Bahrain
      'OM': [55.9754, 21.4735, 6], // Oman
      'QA': [51.1839, 25.3548, 7], // Qatar
      'JO': [36.2384, 30.5852, 6], // Jordan
      'LB': [35.8623, 33.8547, 7], // Lebanon
      'SY': [38.9968, 34.8021, 6], // Syria
      'YE': [48.5164, 15.5527, 6], // Yemen
      'KZ': [66.9237, 48.0196, 4], // Kazakhstan
      'UZ': [64.5853, 41.3775, 5], // Uzbekistan
      'TM': [59.5563, 38.9697, 5], // Turkmenistan
      'TJ': [71.2761, 38.8610, 6], // Tajikistan
      'KG': [74.7661, 41.2044, 6], // Kyrgyzstan
      'MN': [103.8467, 46.8625, 4], // Mongolia
      'KH': [104.9910, 12.5657, 6], // Cambodia
      'LA': [102.4955, 19.8563, 6], // Laos
      'MM': [95.9560, 21.9162, 5], // Myanmar
      'BT': [90.4336, 27.5142, 7], // Bhutan
      'NP': [84.1240, 28.3949, 6], // Nepal
      'MV': [73.2207, 3.2028, 8], // Maldives
      'BN': [114.7277, 4.5353, 8], // Brunei
      'TL': [125.7275, -8.8742, 7], // East Timor
      'MO': [113.5439, 22.1987, 9], // Macau
      'IQ': [43.6793, 33.2232, 5], // Iraq
      
      // Africa - Additional
      'LY': [17.2283, 26.3351, 5], // Libya
      'SD': [30.2176, 12.8628, 5], // Sudan
      'SS': [31.3069, 6.8770, 6], // South Sudan
      'CD': [21.7587, -4.0383, 4], // Democratic Republic of Congo
      'CG': [15.8277, -0.2280, 6], // Republic of Congo
      'CF': [20.9394, 6.6111, 6], // Central African Republic
      'TD': [18.7322, 15.4542, 5], // Chad
      'NE': [8.0817, 17.6078, 5], // Niger
      'ML': [-3.9962, 17.5707, 5], // Mali
      'BF': [-1.5616, 12.2383, 6], // Burkina Faso
      'CI': [-5.5471, 7.5400, 6], // Côte d'Ivoire
      'LR': [-9.4295, 6.4281, 6], // Liberia
      'SL': [-11.7799, 8.4606, 6], // Sierra Leone
      'GN': [-9.6966, 9.9456, 6], // Guinea
      'GW': [-15.1804, 11.8037, 7], // Guinea-Bissau
      'SN': [-14.4524, 14.4974, 6], // Senegal
      'GM': [-15.3101, 13.4432, 7], // Gambia
      'MR': [-10.9408, 21.0079, 5], // Mauritania
      'CV': [-24.0132, 16.5388, 7], // Cape Verde
      'ST': [6.6131, 0.1864, 8], // São Tomé and Príncipe
      'GQ': [10.2679, 1.6508, 7], // Equatorial Guinea
      'GA': [11.6094, -0.8037, 6], // Gabon
      'CM': [12.3547, 7.3697, 5], // Cameroon
      'AO': [17.8739, -11.2027, 5], // Angola
      'MZ': [35.5296, -18.6657, 5], // Mozambique
      'MW': [34.3015, -13.2543, 6], // Malawi
      'MG': [46.8691, -18.7669, 5], // Madagascar
      'MU': [57.5522, -20.3484, 8], // Mauritius
      'SC': [55.4920, -4.6796, 8], // Seychelles
      'KM': [43.8722, -11.8750, 8], // Comoros
      'DJ': [42.5903, 11.8251, 7], // Djibouti
      'SO': [46.1996, 5.1521, 5], // Somalia
      'ER': [39.7823, 15.7394, 6], // Eritrea
      'RW': [29.9189, -1.9403, 7], // Rwanda
      'BI': [29.9189, -3.3731, 7], // Burundi
      'DZ': [1.6596, 28.0339, 4], // Algeria
      'ET': [40.4897, 9.1450, 5], // Ethiopia
      
      // North America - Additional
      'GT': [-90.2308, 15.7835, 6], // Guatemala
      'BZ': [-88.4976, 17.1899, 7], // Belize
      'SV': [-88.8965, 13.7942, 7], // El Salvador
      'HN': [-87.2750, 15.2000, 6], // Honduras
      'NI': [-85.2072, 11.0059, 6], // Nicaragua
      'CR': [-83.7534, 9.7489, 7], // Costa Rica
      'PA': [-80.7821, 8.5380, 7], // Panama
      'CU': [-77.7812, 21.5218, 5], // Cuba
      'JM': [-77.2975, 18.1096, 7], // Jamaica
      'HT': [-72.2852, 18.9712, 7], // Haiti
      'DO': [-70.1627, 18.7357, 7], // Dominican Republic
      'TT': [-61.2225, 10.6918, 8], // Trinidad and Tobago
      'BB': [-59.5432, 13.1939, 9], // Barbados
      'LC': [-60.9789, 13.9094, 9], // Saint Lucia
      'GD': [-61.6790, 12.2628, 9], // Grenada
      'VC': [-61.2872, 12.9843, 9], // Saint Vincent and the Grenadines
      'AG': [-61.7965, 17.0608, 9], // Antigua and Barbuda
      'KN': [-62.7830, 17.3578, 9], // Saint Kitts and Nevis
      'DM': [-61.3710, 15.4142, 9], // Dominica
      'BS': [-77.3963, 25.0343, 6], // Bahamas
      
      // South America - Additional
      'GY': [-58.9302, 4.8604, 6], // Guyana
      'SR': [-56.0278, 3.9193, 7], // Suriname
      'GF': [-53.1258, 3.9339, 7], // French Guiana
      'PY': [-58.4438, -23.4425, 5], // Paraguay
      'BO': [-63.5887, -16.2902, 5], // Bolivia
      
      // Oceania - Additional
      'PG': [143.9555, -6.3150, 5], // Papua New Guinea
      'SB': [160.1562, -9.6457, 6], // Solomon Islands
      'VU': [166.9592, -15.3767, 7], // Vanuatu
      'NC': [165.6180, -20.9043, 6], // New Caledonia
      'PF': [-149.4068, -17.6797, 6], // French Polynesia
      'WS': [-172.1046, -13.7590, 8], // Samoa
      'TO': [-175.1982, -21.1789, 8], // Tonga
      'TV': [177.6493, -7.1095, 9], // Tuvalu
      'KI': [-157.3630, 1.8709, 8], // Kiribati
      'NR': [166.9315, -0.5228, 10], // Nauru
      'PW': [134.5825, 7.5150, 8], // Palau
      'FM': [150.5508, 7.4256, 7], // Micronesia
      'MH': [171.1845, 7.1315, 8], // Marshall Islands
    };

    const coords = countryCoordinates[country.iso2];
    if (coords) {
      const [lng, lat, zoom] = coords;
      console.log(`Flying to ${country.name} (${country.iso2}):`, coords);
      map.current.flyTo({
        center: [lng, lat],
        zoom: zoom,
        duration: 1500,
        essential: true
      });
    } else {
        console.log(`No coordinates found for ${country.name} (${country.iso2}), using continent fallback`);
        // ENHANCED: Better fallback using continent-based coordinates
        const continentCoords = {
          'Europe': [10, 54, 3],
          'Asia': [100, 34, 2],
          'Africa': [20, 0, 2],
          'North America': [-100, 45, 2],
          'South America': [-60, -15, 2],
          'Oceania': [140, -25, 3]
        };
        
        const coords = continentCoords[country.continent as keyof typeof continentCoords];
        if (coords) {
          const [lng, lat, zoom] = coords;
          map.current.flyTo({
            center: [lng, lat],
            zoom: zoom,
            duration: 1000,
            essential: true
          });
        } else {
          // Last resort fallback
          console.log(`Unknown continent for ${country.name}, using world view`);
          map.current.flyTo({
            center: [0, 20],
            zoom: 2,
            duration: 1000,
            essential: true
          });
        }
      }
  };

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
    <div className={`relative w-full h-full ${className}`}>
      {/* MapLibre GL container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Legend with Logo */}
      {selectedBrand && (
        <div className="absolute top-6 left-6 z-10">
          <div className="backdrop-blur-md bg-white/90 rounded-xl shadow-lg border border-white/20 p-4 max-w-xs">
            <div className="flex items-center gap-3 mb-2">
              <BrandLogo brand={selectedBrand} />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {selectedBrand.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {selectedBrand.countries.length} countries • {selectedBrand.industry}
                </p>
              </div>
            </div>

            {/* Countries List */}
            <div className="pt-3 border-t border-gray-200">
              <h4 className="text-xs font-medium text-gray-700 mb-1">Operating Countries</h4>
              <p className="text-xs text-gray-500 mb-2">Click to zoom to country</p>
              <div className="max-h-32 overflow-y-auto">
                <div className="grid grid-cols-1 gap-1">
                  {selectedBrand.countries.map((countryCode) => {
                    const country = getCountryById(countryCode);
                    return country ? (
                      <div
                        key={countryCode}
                        className={`flex items-center gap-2 px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                          // FIXED: Compare with ISO2 code instead of ISO3
                          hoveredCountry === country.iso2 
                            ? 'bg-amber-100 text-amber-900' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => flyToCountry(country)}
                      >
                        <img
                          src={`https://flagsapi.com/${country.iso2}/flat/64.png`}
                          alt={`${country.name} flag`}
                          className="w-4 h-3 object-cover rounded-sm border border-gray-200"
                          onError={(e) => {
                            // Hide flag if it fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span className="flex-1 text-gray-700">{country.name}</span>
                      </div>
                    ) : (
                      // FIXED: Show missing countries for debugging
                      <div
                        key={countryCode}
                        className="flex items-center gap-2 px-2 py-1 rounded text-xs text-red-500"
                      >
                        <span className="w-4 h-3 bg-gray-200 rounded-sm flex items-center justify-center text-xs">?</span>
                        <span className="flex-1">Missing: {countryCode}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {hoveredCountry && getCountryById(hoveredCountry) && (
              <div className="pt-2 border-t border-gray-200 mt-2">
                <div className="text-xs">
                  <div className="font-medium text-gray-900">
                    {getCountryById(hoveredCountry)?.name}
                  </div>
                  <div className="text-gray-600">
                    {highlightedCountries.has(hoveredCountry) 
                      ? `${selectedBrand.name} operates here` 
                      : `${selectedBrand.name} not present`}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Attribution */}
      <div className="absolute bottom-10 right-4 z-10">
        <div className="backdrop-blur-sm bg-white/80 rounded-lg px-3 py-1 text-xs text-gray-600 border border-white/30">
          Made by{' '}
          <a 
            href="https://axiobm.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            AxioBM
          </a>
        </div>
      </div>
    </div>
  );
}; 