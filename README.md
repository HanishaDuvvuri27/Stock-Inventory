# StockHub - Professional Inventory Management Portal

A modern, responsive web application for managing retail inventory with real-time data visualization, advanced filtering, and seamless user experience across all devices.

## 🚀 Features

### 📊 Inventory Overview
- **High-density product listing** with comprehensive details (Name, Price, Brand, Category, Stock Status, Rating)
- **Advanced sorting** by Price and Name with visual indicators
- **Category filtering** with dropdown selection
- **Real-time search** with debounced input for instant product discovery
- **Pagination** with "Load More" functionality for optimal performance
- **Responsive table design** with mobile-optimized card layouts

### 🖼️ Product Details
- **Visual product showcase** with image gallery and navigation
- **Comprehensive specifications** including dimensions, warranty, shipping info
- **Customer reviews** display with ratings
- **Similar products recommendations** with visual cards
- **Price calculations** with discount percentage display

### 📂 Catalogue Overview
- **Category-based browsing** with representative product images
- **Drill-down navigation** to filtered inventory views
- **Visual category cards** for intuitive exploration

### 🏠 Welcome Dashboard
- **Professional landing page** with feature highlights
- **Direct navigation** to Inventory and Catalogue sections
- **Responsive design** with modern UI elements

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **API**: DummyJSON (https://dummyjson.com)
- **Code Quality**: ESLint with TypeScript rules

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js) or **yarn**

### Checking Your Environment

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd stock-inventory
```

### 2. Install Dependencies

```bash
npm install
```

This command will install all the required dependencies listed in `package.json`.

### 3. Start Development Server

```bash
npm run dev
```

The development server will start and you'll see output similar to:
```
Vite dev server running at:
➜ Local:   http://localhost:5173/
➜ Network: http://192.168.1.100:5173/
➜ press h to show help
```

Open your browser and navigate to `http://localhost:5173` to view the application.

### 4. Build for Production

```bash
npm run build
```

This command will:
- Type-check your TypeScript code
- Bundle and minify your code
- Optimize assets
- Generate the production build in the `dist/` folder

### 5. Preview Production Build

```bash
npm run preview
```

This serves the built application from the `dist/` folder for testing before deployment.

## 📁 Project Structure

```
stock-inventory/
├── public/                 # Static assets
├── src/
│   ├── api/
│   │   └── client.ts       # API client for DummyJSON
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   ├── ErrorState.tsx  # Error display component
│   │   ├── EmptyState.tsx  # Empty state component
│   │   ├── ProductCard.tsx # Product card component
│   │   ├── ProductSkeleton.tsx # Loading skeleton
│   │   └── StockBadge.tsx  # Stock status badge
│   ├── hooks/
│   │   └── useDebounce.ts  # Debounce hook for search
│   ├── lib/
│   │   └── utils.ts        # Utility functions
│   ├── pages/
│   │   ├── CataloguePage.tsx # Category overview
│   │   ├── HomePage.tsx    # Welcome page
│   │   ├── InventoryPage.tsx # Main inventory view
│   │   └── ProductPage.tsx # Product details
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   └── utils/
│       └── stock.ts        # Stock-related utilities
├── dist/                   # Production build output (generated)
├── index.html              # Main HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (includes TypeScript compilation) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🌐 API Integration

This application integrates with [DummyJSON](https://dummyjson.com), a free REST API for testing and prototyping. The API provides:

- Product catalog with 100+ products
- Category-based product filtering
- Product search functionality
- Individual product details with reviews

### Key Endpoints Used:
- `GET /products` - Fetch products with pagination
- `GET /products/search` - Search products by query
- `GET /products/categories` - Get all categories
- `GET /products/category/{category}` - Get products by category
- `GET /products/{id}` - Get individual product details

## 🎨 Styling & Design

- **Tailwind CSS** for utility-first styling
- **Responsive design** with mobile-first approach
- **Dark mode support** with CSS custom properties
- **Consistent color palette** (purple/violet theme)
- **Professional typography** with proper spacing
- **Smooth animations** and transitions

## 🔍 Development Features

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** integration (via ESLint)

### Performance Optimizations
- **Code splitting** with Vite
- **Lazy loading** for images
- **Debounced search** to reduce API calls
- **React Query** for efficient data fetching and caching
- **Skeleton loading** states for better UX

### Developer Experience
- **Hot Module Replacement** (HMR) during development
- **Type checking** during build
- **Error boundaries** for graceful error handling
- **Responsive development** tools

## 🚀 Deployment

### Deploying to Production

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your web server or hosting platform:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront
   - Any static hosting service

### Environment Variables

No environment variables are required for this project as it uses a public API. However, if you need to configure different API endpoints, you can add them to a `.env` file:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and test thoroughly
4. Run linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Open a Pull Request

## 📝 Assumptions & Notes

- **API Limitations**: Uses DummyJSON for demo purposes. In production, replace with your actual inventory API.
- **Data Volume**: Currently handles up to 100 products. For larger inventories, implement server-side pagination.
- **Browser Support**: Modern browsers with ES6+ support.
- **Mobile Optimization**: Designed for mobile-first responsive experience.

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Dependencies issues**:
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build fails**:
   - Check TypeScript errors: `npx tsc --noEmit`
   - Run linter: `npm run lint`

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify Node.js and npm versions
3. Ensure all dependencies are installed
4. Check network connectivity for API calls

