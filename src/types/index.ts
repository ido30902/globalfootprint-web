export interface Brand {
  id: string;
  name: string;
  color: string;
  aliases: string[];
  countries: string[];
  description: string;
  logo?: string;
  industry: string;
  founded?: number;
  headquarters?: string;
  website?: string;
}

export interface Country {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  continent: string;
}

export interface BrandDatabase {
  [key: string]: Brand;
}

export interface SearchResult {
  brand: Brand;
  matchType: "exact" | "alias" | "partial";
  relevanceScore: number;
}

export interface MapState {
  selectedBrand?: Brand;
  hoveredCountry?: Country;
  zoomLevel: number;
  centerCoordinates: [number, number];
}

export interface BrandStats {
  totalCountries: number;
  continents: string[];
  coverage: number; // percentage of world coverage
}

export type Industry =
  | "Fast Food"
  | "Retail"
  | "Technology"
  | "Automotive"
  | "Hotels"
  | "Banking"
  | "Coffee"
  | "Clothing"
  | "Airlines"
  | "Telecommunications";
