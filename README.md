# StockMate: Stock Portfolio Visualization & Analytics

## Project Overview
StockMate is a comprehensive web application for stock portfolio management, market analysis, and financial insights. The platform provides investors with a modern, intuitive interface to track investments, monitor market trends, and make data-driven decisions.

Built using Next.js and TypeScript on the frontend with a sleek, animated interface, StockMate combines powerful financial tools with an engaging user experience. The glass-effect UI components and dynamic animated backgrounds create a visually appealing environment without sacrificing functionality or performance.

## Features

### Portfolio Management
- **Portfolio Dashboard**: Comprehensive overview of holdings, performance metrics, and allocation insights.
- **Performance Tracking**: Visual charts showing historical performance against benchmarks.
- **Asset Allocation**: Interactive visualizations of portfolio diversification across sectors and asset classes.
- **Transaction History**: Detailed record of all buy/sell transactions with filtering and search capabilities.

### Market Analysis
- **Market Overview**: Real-time data on major indices and market trends.
- **Stock Details**: In-depth analysis of individual stocks with price charts, key metrics, and performance data.
- **Technical Indicators**: Support for various technical analysis tools and indicators.
- **Watchlists**: Custom watchlists to track potential investments.

### Advanced Features
- **Financial Contributions**: System for adding funds to investment accounts.
- **Alerts & Notifications**: Custom alert system for price movements, market news, and portfolio changes.
- **Analytics Dashboard**: Advanced metrics including risk assessment, alpha/beta measurements, and correlation analysis.
- **Interactive Charts**: Highly configurable charts with multiple timeframes and comparison features.

## Tech Stack

### Frontend
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion for smooth transitions and effects
- **Charts**: Recharts, Tremor, and ApexCharts for data visualization
- **State Management**: React Hooks and Context API
- **Real-time Updates**: WebSocket integration for live data

### UI Components
- **Animated Background**: Dynamic floating geometric shapes with customizable properties.
- **Glass Effect UI**: Modern translucent card components with backdrop blur effects.
- **Responsive Design**: Fully adaptive layout for all device sizes.
- **Dark/Light Mode**: Comprehensive theming system.

## Key Components

### AnimatedBackground
The `AnimatedBackground` component creates a visually engaging backdrop with animated geometric shapes. These shapes float gently across the screen with subtle movements and rotations, providing an elegant, dynamic atmosphere without distracting from the content.

#### Usage Example
```tsx
<AnimatedBackground>
  <YourContent />
</AnimatedBackground>
```

#### Customizable Properties
- Shape types: circles, squares, triangles, and hexagons.
- Opacity levels for visual intensity.
- Animation speed and movement patterns.
- Color schemes that can be tailored to match branding.

### Glass Effect Cards
StockMate implements modern glass-morphism UI through custom card components that provide a translucent, frosted-glass appearance:

#### Example
```tsx
<GlassCard>
  <GlassCardHeader>
    <CardTitle>Portfolio Summary</CardTitle>
  </GlassCardHeader>
  <GlassCardContent>
    {/* Your content here */}
  </GlassCardContent>
</GlassCard>
```

### Dashboard Layout
The `DashboardLayout` component provides a consistent structure throughout the application, including:
- Responsive sidebar navigation that collapses on smaller screens.
- Header with user information and global controls.
- Main content area with the animated background.
- Smooth loading transitions between pages.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/stockmate.git
cd stockmate
```

2. Install dependencies:
```sh
npm install
# or
yarn install
```

3. Start the development server:
```sh
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Configuration

Create a `.env.local` file in the root directory to configure environment variables:
```sh
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_WEBSOCKET_URL=wss://your-websocket-url.com
```

## UI Customization

### Animated Background
The animated background can be customized by modifying the `AnimatedBackground.tsx` component:
```tsx
// Adjust shapes count
const numberOfShapes = 15; // Change this number to increase/decrease shapes

// Modify opacity for more/less visibility
const opacityRange = [0.3, 0.6]; // [min, max] opacity values

// Change colors
const getRandomColor = () => `hsla(${Math.random() * 360}, 70%, 60%, ${Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0]})`;
```

### Theme Settings
StockMate supports theme customization through Tailwind CSS:
- Edit `tailwind.config.js` to modify colors, spacing, and other global theme values.
- Use the `useTheme` hook to programmatically access and change theme settings.
- Modify `src/styles/globals.css` for base style modifications.

## Development Guidelines

### Component Creation
- Use TypeScript interfaces for props.
- Follow the existing naming conventions.
- Implement responsive designs using Tailwind's utility classes.
- Add appropriate animations using Framer Motion.
- Consider glass effects for cards and containers.

### State Management
- Use `usePortfolio` hook for portfolio data access.
- Use `useStockData` hook for stock market information.
- Create dedicated contexts for global state requirements.

### Adding New Pages
1. Create a new file in the `pages` directory.
2. Use the `DashboardLayout` component for consistent structure.
3. Implement the page content using existing UI components.
4. Add navigation links in the `SideNav` component.

## Deployment

### Building for Production
```sh
npm run build
# or
yarn build
```

### Deployment Options
- **Vercel**: Recommended for Next.js applications with seamless deployment.
- **Netlify**: Excellent alternative with continuous deployment from Git.
- **AWS Amplify**: Robust option for applications requiring additional AWS services.
- **Docker**: Container deployment available through the included `Dockerfile`.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m 'Add some amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

## Performance Optimization
StockMate implements several performance optimizations:
- Dynamic imports for heavy components like charts.
- Image optimization through Next.js `Image` component.
- Code splitting and lazy loading for faster initial page loads.
- Memoization of expensive calculations using `React.useMemo`.
- Throttling of real-time updates to prevent excessive re-renders.

## Future Roadmap
- Portfolio Optimization Tools: AI-powered suggestions for portfolio improvement.
- Extended Technical Analysis: Additional technical indicators and drawing tools.
- Social Features: Sharing capabilities and community insights.
- Mobile Applications: Native mobile apps for iOS and Android.
- Advanced Tax Reporting: Comprehensive tax documentation and analysis.
- Custom Screeners: Advanced stock screening with custom criteria.

## License
This project is licensed under the MIT License - see the `LICENSE` file for details.