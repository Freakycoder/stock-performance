// Types for stock data and market information
export interface HistoricalDataPoint {
  date: string;
  price: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface StockData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  logo: string;
  historicalData: HistoricalDataPoint[];
  sector: string;
  color: string;
}

// Types for portfolio data
export interface PortfolioHolding {
  stockId: string;
  shares: number;
  averageCost: number;
  logo : string
}

export interface PortfolioHoldingWithDetails extends PortfolioHolding {
  stock: StockData;
  currentValue: number;
  cost: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface Transaction {
  id: string;
  stockId: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  date: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  holdings: PortfolioHoldingWithDetails[];
}

// Types for asset allocation and sector breakdown
export interface SectorAllocation {
  sector: string;
  value: number;
  percentage: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

// UI and theme related types
export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export interface ChartOptions {
  type: 'area' | 'candlestick' | 'bar' | 'line';
  height?: number;
  showVolume?: boolean;
  colors?: string[];
  timeRange?: '1D' | '1W' | '1M' | '3M' | '1Y' | 'All';
}