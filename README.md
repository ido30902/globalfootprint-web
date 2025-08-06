# Global Brand Footprint Visualization

A responsive web application that visualizes the global presence of brands and chains through an interactive world map. Users can search for any brand/chain and see which countries they operate in highlighted with the brand's signature color.

![Global Brand Footprint](https://via.placeholder.com/800x400?text=Global+Brand+Footprint+App)

## 🌟 Features

### Interactive World Map

- Clean, accurate SVG world map showing all country boundaries
- Countries are individually selectable and highlightable
- Responsive design that works on desktop, tablet, and mobile
- Smooth color transitions when switching between brands
- Country hover effects with detailed information

### Search Functionality

- Prominent search bar with real-time suggestions
- Support for brand names, company names, and common aliases
- Case-insensitive search with intelligent matching
- Popular brands showcase when no search is active
- Clear search results and "no results found" states

### Visual Highlighting System

- Brand countries highlighted with their signature colors
- Smooth animations and transitions
- Interactive legend showing brand information
- Country count and coverage statistics
- Continental breakdown visualization

### Comprehensive Brand Database

- **100+ Global Brands** across multiple industries:
  - **Fast Food**: McDonald's, KFC, Burger King, Subway, Pizza Hut, Domino's, Starbucks
  - **Retail**: Walmart, Amazon, IKEA, H&M, Zara, Uniqlo
  - **Technology**: Apple Store, Microsoft, Google, Samsung
  - **Automotive**: Toyota, BMW, Mercedes-Benz, Ford
  - **Hotels**: Hilton, Marriott
  - **Banking**: HSBC, Citibank
  - **Airlines**: Emirates, Lufthansa
  - **Telecommunications**: Vodafone
  - And many more...

### Brand Information Panel

- Detailed brand information including:
  - Industry classification
  - Founded year and headquarters
  - Global presence statistics
  - Continental breakdown charts
  - Alternative names and aliases
  - Real-time country hover information

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd globalfootprint-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - Modern React with latest features
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### UI Components

- **shadcn/ui** - Pre-built, accessible UI components
- **Lucide React** - Beautiful icon library
- **Custom SVG Map** - Interactive world map implementation

### Key Libraries

- **D3.js libraries** - For advanced map projections (ready for enhancement)
- **TopojSON** - Topology data handling (ready for enhancement)

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop** (1024px and above) - Full layout with side panel
- **Tablet** (768px - 1023px) - Stacked layout with responsive map
- **Mobile** (320px - 767px) - Touch-friendly interface with optimized search

## 🎨 Design System

### Color Palette

- Uses each brand's authentic signature colors
- Consistent gray scale for neutral elements
- Accessible color contrasts throughout

### Typography

- Inter font family for modern, readable text
- Responsive text sizing
- Clear hierarchy with semantic heading structure

### Components

All components built with:

- Accessibility (ARIA labels, keyboard navigation)
- Dark mode ready (CSS custom properties)
- Mobile-first responsive approach
- Consistent spacing and styling

## 🔍 How to Use

1. **Search for a Brand**

   - Use the search bar to find brands like "McDonald's", "Starbucks", or "IKEA"
   - Browse popular brands when the search is empty
   - Try searching by industry like "Fast Food" or "Technology"

2. **Explore the Map**

   - Countries where the brand operates are highlighted in the brand's color
   - Hover over countries to see detailed information
   - Use the legend to understand the current selection

3. **View Brand Details**

   - The right panel shows comprehensive brand information
   - See continental breakdown and coverage statistics
   - View alternative names and brand aliases

4. **Clear Selection**
   - Click the X button next to the selected brand
   - Search for a new brand to replace the current selection

## 📊 Data Structure

### Brand Interface

```typescript
interface Brand {
  id: string;
  name: string;
  color: string; // Hex color code
  aliases: string[]; // Alternative names
  countries: string[]; // ISO country codes
  description: string;
  industry: string;
  founded?: number;
  headquarters?: string;
}
```

### Country Interface

```typescript
interface Country {
  id: string; // ISO code
  name: string; // Full country name
  iso2: string; // 2-letter ISO code
  iso3: string; // 3-letter ISO code
  continent: string; // Continent name
}
```

## 🎯 Future Enhancements

### Planned Features

- [ ] **Multiple Brand Comparison** - Show different brands simultaneously
- [ ] **Historical Data** - Brand expansion over time
- [ ] **Export Functionality** - Save map as image
- [ ] **Filter by Industry** - Browse brands by category
- [ ] **Ranking System** - Most global brands statistics
- [ ] **Real-time Data** - API integration for live brand data

### Technical Improvements

- [ ] **Detailed Map Data** - Replace simplified SVG with GeoJSON
- [ ] **Advanced Zoom/Pan** - D3.js integration for map manipulation
- [ ] **Performance Optimization** - Lazy loading and virtualization
- [ ] **Offline Support** - Service worker implementation
- [ ] **API Integration** - Backend service for brand data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Brands

To add a new brand to the database:

1. Edit `src/data/brands.ts`
2. Add the brand following the `Brand` interface
3. Include accurate country data and brand colors
4. Test the search functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Brand data compiled from public sources and official company information
- Map visualization inspired by modern data visualization practices
- UI components built with accessibility and user experience in mind

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
