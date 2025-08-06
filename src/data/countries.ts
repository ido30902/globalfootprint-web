import type { Country } from "../types";

export const countries: Country[] = [
  // North America
  {
    id: "US",
    name: "United States",
    iso2: "US",
    iso3: "USA",
    continent: "North America",
  },
  {
    id: "CA",
    name: "Canada",
    iso2: "CA",
    iso3: "CAN",
    continent: "North America",
  },
  {
    id: "MX",
    name: "Mexico",
    iso2: "MX",
    iso3: "MEX",
    continent: "North America",
  },

  // Europe
  {
    id: "GB",
    name: "United Kingdom",
    iso2: "GB",
    iso3: "GBR",
    continent: "Europe",
  },
  { id: "FR", name: "France", iso2: "FR", iso3: "FRA", continent: "Europe" },
  { id: "DE", name: "Germany", iso2: "DE", iso3: "DEU", continent: "Europe" },
  { id: "IT", name: "Italy", iso2: "IT", iso3: "ITA", continent: "Europe" },
  { id: "ES", name: "Spain", iso2: "ES", iso3: "ESP", continent: "Europe" },
  {
    id: "NL",
    name: "Netherlands",
    iso2: "NL",
    iso3: "NLD",
    continent: "Europe",
  },
  { id: "BE", name: "Belgium", iso2: "BE", iso3: "BEL", continent: "Europe" },
  {
    id: "CH",
    name: "Switzerland",
    iso2: "CH",
    iso3: "CHE",
    continent: "Europe",
  },
  { id: "AT", name: "Austria", iso2: "AT", iso3: "AUT", continent: "Europe" },
  { id: "SE", name: "Sweden", iso2: "SE", iso3: "SWE", continent: "Europe" },
  { id: "NO", name: "Norway", iso2: "NO", iso3: "NOR", continent: "Europe" },
  { id: "DK", name: "Denmark", iso2: "DK", iso3: "DNK", continent: "Europe" },
  { id: "FI", name: "Finland", iso2: "FI", iso3: "FIN", continent: "Europe" },
  { id: "PL", name: "Poland", iso2: "PL", iso3: "POL", continent: "Europe" },
  {
    id: "CZ",
    name: "Czech Republic",
    iso2: "CZ",
    iso3: "CZE",
    continent: "Europe",
  },
  { id: "HU", name: "Hungary", iso2: "HU", iso3: "HUN", continent: "Europe" },
  { id: "RO", name: "Romania", iso2: "RO", iso3: "ROU", continent: "Europe" },
  { id: "GR", name: "Greece", iso2: "GR", iso3: "GRC", continent: "Europe" },
  { id: "PT", name: "Portugal", iso2: "PT", iso3: "PRT", continent: "Europe" },
  { id: "IE", name: "Ireland", iso2: "IE", iso3: "IRL", continent: "Europe" },
  { id: "RU", name: "Russia", iso2: "RU", iso3: "RUS", continent: "Europe" },

  // Asia
  { id: "CN", name: "China", iso2: "CN", iso3: "CHN", continent: "Asia" },
  { id: "JP", name: "Japan", iso2: "JP", iso3: "JPN", continent: "Asia" },
  { id: "IN", name: "India", iso2: "IN", iso3: "IND", continent: "Asia" },
  { id: "KR", name: "South Korea", iso2: "KR", iso3: "KOR", continent: "Asia" },
  { id: "SG", name: "Singapore", iso2: "SG", iso3: "SGP", continent: "Asia" },
  { id: "HK", name: "Hong Kong", iso2: "HK", iso3: "HKG", continent: "Asia" },
  { id: "TW", name: "Taiwan", iso2: "TW", iso3: "TWN", continent: "Asia" },
  { id: "TH", name: "Thailand", iso2: "TH", iso3: "THA", continent: "Asia" },
  { id: "MY", name: "Malaysia", iso2: "MY", iso3: "MYS", continent: "Asia" },
  { id: "ID", name: "Indonesia", iso2: "ID", iso3: "IDN", continent: "Asia" },
  { id: "PH", name: "Philippines", iso2: "PH", iso3: "PHL", continent: "Asia" },
  { id: "VN", name: "Vietnam", iso2: "VN", iso3: "VNM", continent: "Asia" },
  {
    id: "AE",
    name: "United Arab Emirates",
    iso2: "AE",
    iso3: "ARE",
    continent: "Asia",
  },
  {
    id: "SA",
    name: "Saudi Arabia",
    iso2: "SA",
    iso3: "SAU",
    continent: "Asia",
  },
  { id: "IL", name: "Israel", iso2: "IL", iso3: "ISR", continent: "Asia" },
  { id: "TR", name: "Turkey", iso2: "TR", iso3: "TUR", continent: "Asia" },
  { id: "PK", name: "Pakistan", iso2: "PK", iso3: "PAK", continent: "Asia" },
  { id: "BD", name: "Bangladesh", iso2: "BD", iso3: "BGD", continent: "Asia" },
  { id: "LK", name: "Sri Lanka", iso2: "LK", iso3: "LKA", continent: "Asia" },

  // Oceania
  {
    id: "AU",
    name: "Australia",
    iso2: "AU",
    iso3: "AUS",
    continent: "Oceania",
  },
  {
    id: "NZ",
    name: "New Zealand",
    iso2: "NZ",
    iso3: "NZL",
    continent: "Oceania",
  },
  { id: "FJ", name: "Fiji", iso2: "FJ", iso3: "FJI", continent: "Oceania" },

  // South America
  {
    id: "BR",
    name: "Brazil",
    iso2: "BR",
    iso3: "BRA",
    continent: "South America",
  },
  {
    id: "AR",
    name: "Argentina",
    iso2: "AR",
    iso3: "ARG",
    continent: "South America",
  },
  {
    id: "CL",
    name: "Chile",
    iso2: "CL",
    iso3: "CHL",
    continent: "South America",
  },
  {
    id: "CO",
    name: "Colombia",
    iso2: "CO",
    iso3: "COL",
    continent: "South America",
  },
  {
    id: "PE",
    name: "Peru",
    iso2: "PE",
    iso3: "PER",
    continent: "South America",
  },
  {
    id: "VE",
    name: "Venezuela",
    iso2: "VE",
    iso3: "VEN",
    continent: "South America",
  },
  {
    id: "UY",
    name: "Uruguay",
    iso2: "UY",
    iso3: "URY",
    continent: "South America",
  },
  {
    id: "PY",
    name: "Paraguay",
    iso2: "PY",
    iso3: "PRY",
    continent: "South America",
  },
  {
    id: "EC",
    name: "Ecuador",
    iso2: "EC",
    iso3: "ECU",
    continent: "South America",
  },
  {
    id: "BO",
    name: "Bolivia",
    iso2: "BO",
    iso3: "BOL",
    continent: "South America",
  },

  // Africa
  {
    id: "ZA",
    name: "South Africa",
    iso2: "ZA",
    iso3: "ZAF",
    continent: "Africa",
  },
  { id: "EG", name: "Egypt", iso2: "EG", iso3: "EGY", continent: "Africa" },
  { id: "NG", name: "Nigeria", iso2: "NG", iso3: "NGA", continent: "Africa" },
  { id: "KE", name: "Kenya", iso2: "KE", iso3: "KEN", continent: "Africa" },
  { id: "GH", name: "Ghana", iso2: "GH", iso3: "GHA", continent: "Africa" },
  { id: "MA", name: "Morocco", iso2: "MA", iso3: "MAR", continent: "Africa" },
  { id: "TN", name: "Tunisia", iso2: "TN", iso3: "TUN", continent: "Africa" },
  { id: "DZ", name: "Algeria", iso2: "DZ", iso3: "DZA", continent: "Africa" },
  { id: "ET", name: "Ethiopia", iso2: "ET", iso3: "ETH", continent: "Africa" },
  { id: "TZ", name: "Tanzania", iso2: "TZ", iso3: "TZA", continent: "Africa" },
  { id: "UG", name: "Uganda", iso2: "UG", iso3: "UGA", continent: "Africa" },
  { id: "ZW", name: "Zimbabwe", iso2: "ZW", iso3: "ZWE", continent: "Africa" },
  { id: "BW", name: "Botswana", iso2: "BW", iso3: "BWA", continent: "Africa" },
  { id: "NA", name: "Namibia", iso2: "NA", iso3: "NAM", continent: "Africa" },
  { id: "ZM", name: "Zambia", iso2: "ZM", iso3: "ZMB", continent: "Africa" },

  // Additional countries referenced in brands
  { id: "IR", name: "Iran", iso2: "IR", iso3: "IRN", continent: "Asia" },
  { id: "IQ", name: "Iraq", iso2: "IQ", iso3: "IRQ", continent: "Asia" },
  { id: "AF", name: "Afghanistan", iso2: "AF", iso3: "AFG", continent: "Asia" },
  { id: "KW", name: "Kuwait", iso2: "KW", iso3: "KWT", continent: "Asia" },
  { id: "BH", name: "Bahrain", iso2: "BH", iso3: "BHR", continent: "Asia" },
  { id: "OM", name: "Oman", iso2: "OM", iso3: "OMN", continent: "Asia" },
  { id: "QA", name: "Qatar", iso2: "QA", iso3: "QAT", continent: "Asia" },
  { id: "JO", name: "Jordan", iso2: "JO", iso3: "JOR", continent: "Asia" },
  { id: "LB", name: "Lebanon", iso2: "LB", iso3: "LBN", continent: "Asia" },
  { id: "SY", name: "Syria", iso2: "SY", iso3: "SYR", continent: "Asia" },
  { id: "YE", name: "Yemen", iso2: "YE", iso3: "YEM", continent: "Asia" },
  { id: "KZ", name: "Kazakhstan", iso2: "KZ", iso3: "KAZ", continent: "Asia" },
  { id: "UZ", name: "Uzbekistan", iso2: "UZ", iso3: "UZB", continent: "Asia" },
  {
    id: "TM",
    name: "Turkmenistan",
    iso2: "TM",
    iso3: "TKM",
    continent: "Asia",
  },
  { id: "TJ", name: "Tajikistan", iso2: "TJ", iso3: "TJK", continent: "Asia" },
  { id: "KG", name: "Kyrgyzstan", iso2: "KG", iso3: "KGZ", continent: "Asia" },
  { id: "MN", name: "Mongolia", iso2: "MN", iso3: "MNG", continent: "Asia" },
  { id: "KH", name: "Cambodia", iso2: "KH", iso3: "KHM", continent: "Asia" },
  { id: "LA", name: "Laos", iso2: "LA", iso3: "LAO", continent: "Asia" },
  { id: "MM", name: "Myanmar", iso2: "MM", iso3: "MMR", continent: "Asia" },
  { id: "BT", name: "Bhutan", iso2: "BT", iso3: "BTN", continent: "Asia" },
  { id: "NP", name: "Nepal", iso2: "NP", iso3: "NPL", continent: "Asia" },
  { id: "MV", name: "Maldives", iso2: "MV", iso3: "MDV", continent: "Asia" },
  { id: "BN", name: "Brunei", iso2: "BN", iso3: "BRN", continent: "Asia" },
  { id: "TL", name: "East Timor", iso2: "TL", iso3: "TLS", continent: "Asia" },
  { id: "MO", name: "Macau", iso2: "MO", iso3: "MAC", continent: "Asia" },

  // Additional European countries
  { id: "IS", name: "Iceland", iso2: "IS", iso3: "ISL", continent: "Europe" },
  {
    id: "LU",
    name: "Luxembourg",
    iso2: "LU",
    iso3: "LUX",
    continent: "Europe",
  },
  { id: "MT", name: "Malta", iso2: "MT", iso3: "MLT", continent: "Europe" },
  { id: "CY", name: "Cyprus", iso2: "CY", iso3: "CYP", continent: "Europe" },
  { id: "EE", name: "Estonia", iso2: "EE", iso3: "EST", continent: "Europe" },
  { id: "LV", name: "Latvia", iso2: "LV", iso3: "LVA", continent: "Europe" },
  { id: "LT", name: "Lithuania", iso2: "LT", iso3: "LTU", continent: "Europe" },
  { id: "SI", name: "Slovenia", iso2: "SI", iso3: "SVN", continent: "Europe" },
  { id: "SK", name: "Slovakia", iso2: "SK", iso3: "SVK", continent: "Europe" },
  { id: "HR", name: "Croatia", iso2: "HR", iso3: "HRV", continent: "Europe" },
  {
    id: "BA",
    name: "Bosnia and Herzegovina",
    iso2: "BA",
    iso3: "BIH",
    continent: "Europe",
  },
  { id: "RS", name: "Serbia", iso2: "RS", iso3: "SRB", continent: "Europe" },
  {
    id: "ME",
    name: "Montenegro",
    iso2: "ME",
    iso3: "MNE",
    continent: "Europe",
  },
  {
    id: "MK",
    name: "North Macedonia",
    iso2: "MK",
    iso3: "MKD",
    continent: "Europe",
  },
  { id: "AL", name: "Albania", iso2: "AL", iso3: "ALB", continent: "Europe" },
  { id: "BG", name: "Bulgaria", iso2: "BG", iso3: "BGR", continent: "Europe" },
  { id: "MD", name: "Moldova", iso2: "MD", iso3: "MDA", continent: "Europe" },
  { id: "UA", name: "Ukraine", iso2: "UA", iso3: "UKR", continent: "Europe" },
  { id: "BY", name: "Belarus", iso2: "BY", iso3: "BLR", continent: "Europe" },

  // Additional African countries
  { id: "LY", name: "Libya", iso2: "LY", iso3: "LBY", continent: "Africa" },
  { id: "SD", name: "Sudan", iso2: "SD", iso3: "SDN", continent: "Africa" },
  {
    id: "SS",
    name: "South Sudan",
    iso2: "SS",
    iso3: "SSD",
    continent: "Africa",
  },
  {
    id: "CD",
    name: "Democratic Republic of Congo",
    iso2: "CD",
    iso3: "COD",
    continent: "Africa",
  },
  {
    id: "CG",
    name: "Republic of Congo",
    iso2: "CG",
    iso3: "COG",
    continent: "Africa",
  },
  {
    id: "CF",
    name: "Central African Republic",
    iso2: "CF",
    iso3: "CAF",
    continent: "Africa",
  },
  { id: "TD", name: "Chad", iso2: "TD", iso3: "TCD", continent: "Africa" },
  { id: "NE", name: "Niger", iso2: "NE", iso3: "NER", continent: "Africa" },
  { id: "ML", name: "Mali", iso2: "ML", iso3: "MLI", continent: "Africa" },
  {
    id: "BF",
    name: "Burkina Faso",
    iso2: "BF",
    iso3: "BFA",
    continent: "Africa",
  },
  {
    id: "CI",
    name: "Côte d'Ivoire",
    iso2: "CI",
    iso3: "CIV",
    continent: "Africa",
  },
  { id: "LR", name: "Liberia", iso2: "LR", iso3: "LBR", continent: "Africa" },
  {
    id: "SL",
    name: "Sierra Leone",
    iso2: "SL",
    iso3: "SLE",
    continent: "Africa",
  },
  { id: "GN", name: "Guinea", iso2: "GN", iso3: "GIN", continent: "Africa" },
  {
    id: "GW",
    name: "Guinea-Bissau",
    iso2: "GW",
    iso3: "GNB",
    continent: "Africa",
  },
  { id: "SN", name: "Senegal", iso2: "SN", iso3: "SEN", continent: "Africa" },
  { id: "GM", name: "Gambia", iso2: "GM", iso3: "GMB", continent: "Africa" },
  {
    id: "MR",
    name: "Mauritania",
    iso2: "MR",
    iso3: "MRT",
    continent: "Africa",
  },
  {
    id: "CV",
    name: "Cape Verde",
    iso2: "CV",
    iso3: "CPV",
    continent: "Africa",
  },
  {
    id: "ST",
    name: "São Tomé and Príncipe",
    iso2: "ST",
    iso3: "STP",
    continent: "Africa",
  },
  {
    id: "GQ",
    name: "Equatorial Guinea",
    iso2: "GQ",
    iso3: "GNQ",
    continent: "Africa",
  },
  { id: "GA", name: "Gabon", iso2: "GA", iso3: "GAB", continent: "Africa" },
  { id: "CM", name: "Cameroon", iso2: "CM", iso3: "CMR", continent: "Africa" },
  { id: "AO", name: "Angola", iso2: "AO", iso3: "AGO", continent: "Africa" },
  {
    id: "MZ",
    name: "Mozambique",
    iso2: "MZ",
    iso3: "MOZ",
    continent: "Africa",
  },
  { id: "MW", name: "Malawi", iso2: "MW", iso3: "MWI", continent: "Africa" },
  {
    id: "MG",
    name: "Madagascar",
    iso2: "MG",
    iso3: "MDG",
    continent: "Africa",
  },
  { id: "MU", name: "Mauritius", iso2: "MU", iso3: "MUS", continent: "Africa" },
  {
    id: "SC",
    name: "Seychelles",
    iso2: "SC",
    iso3: "SYC",
    continent: "Africa",
  },
  { id: "KM", name: "Comoros", iso2: "KM", iso3: "COM", continent: "Africa" },
  { id: "DJ", name: "Djibouti", iso2: "DJ", iso3: "DJI", continent: "Africa" },
  { id: "SO", name: "Somalia", iso2: "SO", iso3: "SOM", continent: "Africa" },
  { id: "ER", name: "Eritrea", iso2: "ER", iso3: "ERI", continent: "Africa" },
  { id: "RW", name: "Rwanda", iso2: "RW", iso3: "RWA", continent: "Africa" },
  { id: "BI", name: "Burundi", iso2: "BI", iso3: "BDI", continent: "Africa" },

  // Additional North American countries
  {
    id: "GT",
    name: "Guatemala",
    iso2: "GT",
    iso3: "GTM",
    continent: "North America",
  },
  {
    id: "BZ",
    name: "Belize",
    iso2: "BZ",
    iso3: "BLZ",
    continent: "North America",
  },
  {
    id: "SV",
    name: "El Salvador",
    iso2: "SV",
    iso3: "SLV",
    continent: "North America",
  },
  {
    id: "HN",
    name: "Honduras",
    iso2: "HN",
    iso3: "HND",
    continent: "North America",
  },
  {
    id: "NI",
    name: "Nicaragua",
    iso2: "NI",
    iso3: "NIC",
    continent: "North America",
  },
  {
    id: "CR",
    name: "Costa Rica",
    iso2: "CR",
    iso3: "CRI",
    continent: "North America",
  },
  {
    id: "PA",
    name: "Panama",
    iso2: "PA",
    iso3: "PAN",
    continent: "North America",
  },
  {
    id: "CU",
    name: "Cuba",
    iso2: "CU",
    iso3: "CUB",
    continent: "North America",
  },
  {
    id: "JM",
    name: "Jamaica",
    iso2: "JM",
    iso3: "JAM",
    continent: "North America",
  },
  {
    id: "HT",
    name: "Haiti",
    iso2: "HT",
    iso3: "HTI",
    continent: "North America",
  },
  {
    id: "DO",
    name: "Dominican Republic",
    iso2: "DO",
    iso3: "DOM",
    continent: "North America",
  },
  {
    id: "TT",
    name: "Trinidad and Tobago",
    iso2: "TT",
    iso3: "TTO",
    continent: "North America",
  },
  {
    id: "BB",
    name: "Barbados",
    iso2: "BB",
    iso3: "BRB",
    continent: "North America",
  },
  {
    id: "LC",
    name: "Saint Lucia",
    iso2: "LC",
    iso3: "LCA",
    continent: "North America",
  },
  {
    id: "GD",
    name: "Grenada",
    iso2: "GD",
    iso3: "GRD",
    continent: "North America",
  },
  {
    id: "VC",
    name: "Saint Vincent and the Grenadines",
    iso2: "VC",
    iso3: "VCT",
    continent: "North America",
  },
  {
    id: "AG",
    name: "Antigua and Barbuda",
    iso2: "AG",
    iso3: "ATG",
    continent: "North America",
  },
  {
    id: "KN",
    name: "Saint Kitts and Nevis",
    iso2: "KN",
    iso3: "KNA",
    continent: "North America",
  },
  {
    id: "DM",
    name: "Dominica",
    iso2: "DM",
    iso3: "DMA",
    continent: "North America",
  },
  {
    id: "BS",
    name: "Bahamas",
    iso2: "BS",
    iso3: "BHS",
    continent: "North America",
  },

  // Additional South American countries
  {
    id: "GY",
    name: "Guyana",
    iso2: "GY",
    iso3: "GUY",
    continent: "South America",
  },
  {
    id: "SR",
    name: "Suriname",
    iso2: "SR",
    iso3: "SUR",
    continent: "South America",
  },
  {
    id: "GF",
    name: "French Guiana",
    iso2: "GF",
    iso3: "GUF",
    continent: "South America",
  },

  // Additional Oceania countries
  {
    id: "PG",
    name: "Papua New Guinea",
    iso2: "PG",
    iso3: "PNG",
    continent: "Oceania",
  },
  {
    id: "SB",
    name: "Solomon Islands",
    iso2: "SB",
    iso3: "SLB",
    continent: "Oceania",
  },
  { id: "VU", name: "Vanuatu", iso2: "VU", iso3: "VUT", continent: "Oceania" },
  {
    id: "NC",
    name: "New Caledonia",
    iso2: "NC",
    iso3: "NCL",
    continent: "Oceania",
  },
  {
    id: "PF",
    name: "French Polynesia",
    iso2: "PF",
    iso3: "PYF",
    continent: "Oceania",
  },
  { id: "WS", name: "Samoa", iso2: "WS", iso3: "WSM", continent: "Oceania" },
  { id: "TO", name: "Tonga", iso2: "TO", iso3: "TON", continent: "Oceania" },
  { id: "TV", name: "Tuvalu", iso2: "TV", iso3: "TUV", continent: "Oceania" },
  { id: "KI", name: "Kiribati", iso2: "KI", iso3: "KIR", continent: "Oceania" },
  { id: "NR", name: "Nauru", iso2: "NR", iso3: "NRU", continent: "Oceania" },
  { id: "PW", name: "Palau", iso2: "PW", iso3: "PLW", continent: "Oceania" },
  {
    id: "FM",
    name: "Micronesia",
    iso2: "FM",
    iso3: "FSM",
    continent: "Oceania",
  },
  {
    id: "MH",
    name: "Marshall Islands",
    iso2: "MH",
    iso3: "MHL",
    continent: "Oceania",
  },
];

export const countryMap = countries.reduce((acc, country) => {
  acc[country.id] = country;
  acc[country.iso2] = country;
  acc[country.iso3] = country;
  return acc;
}, {} as Record<string, Country>);

export const getCountryById = (id: string): Country | undefined => {
  return countryMap[id.toUpperCase()];
};

export const getCountriesByContinent = (continent: string): Country[] => {
  return countries.filter((country) => country.continent === continent);
};

export const getAllCountries = (): Country[] => {
  return countries;
};

export const searchCountries = (query: string): Country[] => {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase();
  const results: Country[] = [];

  countries.forEach((country) => {
    // Exact name match
    if (country.name.toLowerCase().includes(searchTerm)) {
      results.push(country);
      return;
    }

    // ISO code match
    if (
      country.iso2.toLowerCase().includes(searchTerm) ||
      country.iso3.toLowerCase().includes(searchTerm)
    ) {
      results.push(country);
      return;
    }

    // Capital match - commented out as capital property doesn't exist in Country type
    // if (country.capital?.toLowerCase().includes(searchTerm)) {
    //   results.push(country);
    //   return;
    // }

    // Continent match
    if (country.continent.toLowerCase().includes(searchTerm)) {
      results.push(country);
    }
  });

  return results;
};
