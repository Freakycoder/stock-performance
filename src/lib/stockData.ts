import { addDays, format, subDays } from 'date-fns';
import { 
  StockData, 
  HistoricalDataPoint, 
  PortfolioHolding, 
  Transaction, 
  PortfolioSummary,
  SectorAllocation
} from './types';

// Generate historical data for a stock
const generateHistoricalData = (
  startPrice: number,
  volatility: number,
  days: number = 60
): HistoricalDataPoint[] => {
  let currentPrice = startPrice;
  const today = new Date();
  
  return Array.from({ length: days }).map((_, i) => {
    const date = format(subDays(today, days - i - 1), 'yyyy-MM-dd');
    
    // Simulate price movement
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    const open = currentPrice;
    currentPrice += change;
    const close = currentPrice;
    
    // Simulate high and low
    const high = Math.max(open, close) * (1 + Math.random() * 0.02);
    const low = Math.min(open, close) * (1 - Math.random() * 0.02);
    
    // Simulate volume
    const volume = Math.floor(Math.random() * 10000000) + 1000000;
    
    return {
      date,
      price: close,
      volume,
      open,
      high,
      low,
      close,
    };
  });
};

// Mock stock data
export const stocks: StockData[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    price: 190.45,
    change: 2.35,
    changePercent: 1.25,
    volume: 67452000,
    marketCap: 3000000000000,
    logo: "/logo/apple.jpg",
    sector: 'Technology',
    color: '#06b6d4',
    historicalData: generateHistoricalData(170, 0.01),
  },
  {
    id: '2',
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    price: 425.22,
    change: 5.67,
    changePercent: 1.35,
    volume: 23564000,
    marketCap: 3200000000000,
    logo: '/logo/microsoft.jpg',
    sector: 'Technology',
    color: '#3b82f6',
    historicalData: generateHistoricalData(400, 0.01),
  },
  {
    id: '3',
    name: 'Amazon.com Inc.',
    symbol: 'AMZN',
    price: 177.23,
    change: -2.14,
    changePercent: -1.19,
    volume: 43521000,
    marketCap: 1800000000000,
    logo: '/logo/amazon.jpg',
    sector: 'Consumer Cyclical',
    color: '#f97316',
    historicalData: generateHistoricalData(180, 0.015),
  },
  {
    id: '4',
    name: 'Alphabet Inc.',
    symbol: 'GOOGL',
    price: 149.56,
    change: 1.23,
    changePercent: 0.83,
    volume: 25678000,
    marketCap: 1900000000000,
    logo: '/logo/google.jpg',
    sector: 'Technology',
    color: '#8b5cf6',
    historicalData: generateHistoricalData(145, 0.01),
  },
  {
    id: '5',
    name: 'Tesla, Inc.',
    symbol: 'TSLA',
    price: 196.47,
    change: -5.24,
    changePercent: -2.60,
    volume: 98765000,
    marketCap: 620000000000,
    logo: '/logo/tesla-white.jpg',
    sector: 'Automotive',
    color: '#22c55e',
    historicalData: generateHistoricalData(210, 0.025),
  },
  {
    id: '6',
    name: 'NVIDIA Corporation',
    symbol: 'NVDA',
    price: 840.32,
    change: 25.67,
    changePercent: 3.15,
    volume: 54789000,
    marketCap: 2070000000000,
    logo: '/logo/nvidia.jpg',
    sector: 'Technology',
    color: '#14b8a6',
    historicalData: generateHistoricalData(800, 0.02),
  },
  {
    id: '7',
    name: 'Meta Platforms, Inc.',
    symbol: 'META',
    price: 476.72,
    change: 12.34,
    changePercent: 2.66,
    volume: 21345000,
    marketCap: 1220000000000,
    logo: '/logo/meta-white.jpg',
    sector: 'Technology',
    color: '#ec4899',
    historicalData: generateHistoricalData(450, 0.015),
  },
  {
    id: '8',
    name: 'JPMorgan Chase & Co.',
    symbol: 'JPM',
    price: 193.12,
    change: 0.87,
    changePercent: 0.45,
    volume: 12678000,
    marketCap: 560000000000,
    logo: '/logo/jp.jpg',
    sector: 'Financial Services',
    color: '#6366f1',
    historicalData: generateHistoricalData(190, 0.008),
  },
];

// Mock portfolio data
export const portfolioHoldings: PortfolioHolding[] = [
  { stockId: '1', shares: 15, averageCost: 150.25, logo : '/logo/apple.jpg' },
  { stockId: '2', shares: 8, averageCost: 380.50, logo : '/logo/microsoft.jpg' },
  { stockId: '4', shares: 20, averageCost: 125.80, logo : '/logo/google.jpg' },
  { stockId: '6', shares: 5, averageCost: 750.65, logo : '/logo/nvidia.jpg' },
  { stockId: '7', shares: 10, averageCost: 420.30, logo : '/logo/meta-white.jpg' },
];

// Mock transaction history
export const transactions: Transaction[] = [
  {
    id: 't1',
    stockId: '1',
    type: 'buy',
    shares: 5,
    price: 185.45,
    date: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
    logo : '/logo/apple.jpg'
  },
  {
    id: 't2',
    stockId: '6',
    type: 'buy',
    shares: 2,
    price: 790.20,
    date: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
    logo : '/logo/nvidia.jpg'
  },
  {
    id: 't3',
    stockId: '3',
    type: 'sell',
    shares: 12,
    price: 180.15,
    date: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    logo : '/logo/amazon.jpg'
  },
  {
    id: 't4',
    stockId: '7',
    type: 'buy',
    shares: 3,
    price: 450.78,
    date: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    logo : '/logo/meta-white.jpg'
  },
  {
    id: 't5',
    stockId: '2',
    type: 'buy',
    shares: 1,
    price: 415.30,
    date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    logo : '/logo/microsoft.jpg'
  },
  {
    id: 't6',
    stockId: '5',
    type: 'sell',
    shares: 8,
    price: 205.65,
    date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    logo : '/logo/tesla-white.jpg'
  },
];

// Calculate portfolio value and other metrics
export const calculatePortfolioValue = (): PortfolioSummary => {
  let totalValue = 0;
  let totalCost = 0;
  let totalGainLoss = 0;
  
  const holdingsWithDetails = portfolioHoldings.map(holding => {
    const stock = stocks.find(s => s.id === holding.stockId);
    if (!stock) return null;
    
    const currentValue = stock.price * holding.shares;
    const cost = holding.averageCost * holding.shares;
    const gainLoss = currentValue - cost;
    const gainLossPercent = (gainLoss / cost) * 100;
    
    totalValue += currentValue;
    totalCost += cost;
    totalGainLoss += gainLoss;
    
    return {
      ...holding,
      stock,
      currentValue,
      cost,
      gainLoss,
      gainLossPercent,
    };
  }).filter((holding): holding is NonNullable<typeof holding> => holding !== null);
  
  const totalGainLossPercent = (totalGainLoss / totalCost) * 100;
  
  return {
    totalValue,
    totalCost,
    totalGainLoss,
    totalGainLossPercent,
    holdings: holdingsWithDetails,
  };
};

// Calculate sector allocation
export const calculateSectorAllocation = (): SectorAllocation[] => {
  // Original code
  const portfolio = calculatePortfolioValue();
  const sectorMap = new Map<string, number>();
  
  // Adjust this to increase specific sector allocations
  // Manual overrides for sector allocation percentages
  const manualAllocations = {
    "Technology": 60,  // Increased from whatever it was
    "Finance": 40,
  };
  
  // Total should be 100%
  const totalManualAllocation = Object.values(manualAllocations).reduce((sum, val) => sum + val, 0);
  if (totalManualAllocation !== 100) {
    console.warn("Manual allocations don't add up to 100%");
  }
  
  // Assign sector values based on percentages
  let sectorColors : any = {
    "Technology": "#3b82f6",  // Explicit color values
    "Finance": "#8b5cf6",
  };
  
  const allocation = Object.entries(manualAllocations).map(([sector, percentage]) => {
    const value = (percentage / 100) * portfolio.totalValue;
    return {
      sector,
      value,
      percentage,
      color: sectorColors[sector] || "#64748b" 
    };
  });
  
  return allocation;
};

// Market index data
export const marketIndexes = [
  {
    name: 'S&P 500',
    value: 5204.34,
    change: 0.86,
    changePercent: 1.24,
  },
  {
    name: 'NASDAQ',
    value: 16274.94,
    change: 275.87,
    changePercent: 1.73,
  },
  {
    name: 'Dow Jones',
    value: 39069.59,
    change: 125.69,
    changePercent: 0.32,
  },
];

// Get stock by ID
export const getStockById = (id: string): StockData | undefined => {
  return stocks.find(stock => stock.id === id);
};

export type { HistoricalDataPoint, StockData };
