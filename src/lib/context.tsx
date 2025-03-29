import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  PortfolioStock, 
  StockHistoricalData, 
  Transaction, 
  PortfolioSummary as PortfolioSummaryType,
  WatchlistItem,
  Stock,
  MarketIndexData
} from '@/types';
import { 
  portfolioStocks as initialPortfolioStocks, 
  stocksHistoricalData as initialStocksData,
  transactions as initialTransactions,
  portfolioSummary as initialPortfolioSummary,
  watchlistItems as initialWatchlistItems,
  marketIndices as initialMarketIndices
} from '@/lib/dummy-data';

interface StockContextType {
  // Data
  portfolioStocks: PortfolioStock[];
  stocksHistoricalData: Record<string, StockHistoricalData[]>;
  transactions: Transaction[];
  portfolioSummary: PortfolioSummaryType;
  watchlistItems: WatchlistItem[];
  marketIndices: MarketIndexData[];
  selectedStock: PortfolioStock;
  
  // UI state
  sidebarCollapsed: boolean;
  
  // Actions
  setSelectedStock: (stock: PortfolioStock) => void;
  toggleSidebar: () => void;
  addToWatchlist: (stock: Stock) => void;
  removeFromWatchlist: (stockId: string) => void;
  addTransaction: (transaction: Transaction) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data state
  const [portfolioStocks, setPortfolioStocks] = useState<PortfolioStock[]>(initialPortfolioStocks);
  const [stocksHistoricalData, setStocksHistoricalData] = useState<Record<string, StockHistoricalData[]>>(initialStocksData);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummaryType>(initialPortfolioSummary);
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>(initialWatchlistItems);
  const [marketIndices, setMarketIndices] = useState<MarketIndexData[]>(initialMarketIndices);
  
  // UI state
  const [selectedStock, setSelectedStock] = useState<PortfolioStock>(initialPortfolioStocks[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Actions
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  
  const addToWatchlist = (stock: Stock) => {
    const isAlreadyInWatchlist = watchlistItems.some(item => item.id === stock.id);
    if (isAlreadyInWatchlist) return;
    
    const newWatchlistItem: WatchlistItem = {
      ...stock,
      addedOn: new Date().toISOString()
    };
    
    setWatchlistItems([...watchlistItems, newWatchlistItem]);
  };
  
  const removeFromWatchlist = (stockId: string) => {
    setWatchlistItems(watchlistItems.filter(item => item.id !== stockId));
  };
  
  const addTransaction = (transaction: Transaction) => {
    // Add transaction to the list
    setTransactions([transaction, ...transactions]);
    
    // Update portfolio stocks based on transaction
    const updatedPortfolioStocks = [...portfolioStocks];
    const stockIndex = updatedPortfolioStocks.findIndex(stock => stock.id === transaction.stockId);
    
    if (transaction.type === 'buy') {
      // If stock already in portfolio, update it
      if (stockIndex !== -1) {
        const stock = updatedPortfolioStocks[stockIndex];
        const newQuantity = stock.quantity + transaction.quantity;
        const newTotalCost = stock.averageBuyPrice * stock.quantity + transaction.total;
        const newAverageBuyPrice = newTotalCost / newQuantity;
        
        updatedPortfolioStocks[stockIndex] = {
          ...stock,
          quantity: newQuantity,
          averageBuyPrice: newAverageBuyPrice,
          totalValue: newQuantity * stock.price,
          profitLoss: (stock.price - newAverageBuyPrice) * newQuantity,
          profitLossPercentage: ((stock.price - newAverageBuyPrice) / newAverageBuyPrice) * 100
        };
      }
      // If stock not in portfolio, it should be added (handled separately)
    } else if (transaction.type === 'sell') {
      if (stockIndex !== -1) {
        const stock = updatedPortfolioStocks[stockIndex];
        const newQuantity = stock.quantity - transaction.quantity;
        
        // If all shares sold, remove from portfolio
        if (newQuantity <= 0) {
          updatedPortfolioStocks.splice(stockIndex, 1);
        } else {
          // Otherwise update the stock
          updatedPortfolioStocks[stockIndex] = {
            ...stock,
            quantity: newQuantity,
            totalValue: newQuantity * stock.price,
            profitLoss: (stock.price - stock.averageBuyPrice) * newQuantity,
            profitLossPercentage: ((stock.price - stock.averageBuyPrice) / stock.averageBuyPrice) * 100
          };
        }
      }
    }
    
    setPortfolioStocks(updatedPortfolioStocks);
    
    // Recalculate portfolio summary
    // This is a simplified example - in a real app you would calculate this based on the actual portfolio data
    const newTotalValue = updatedPortfolioStocks.reduce((sum, stock) => sum + stock.totalValue, 0);
    const newTotalProfit = updatedPortfolioStocks.reduce((sum, stock) => sum + stock.profitLoss, 0);
    const newTotalProfitPercentage = (newTotalProfit / newTotalValue) * 100;
    
    setPortfolioSummary({
      ...portfolioSummary,
      totalValue: newTotalValue,
      totalProfit: newTotalProfit,
      totalProfitPercentage: newTotalProfitPercentage
    });
  };
  
  const value = {
    portfolioStocks,
    stocksHistoricalData,
    transactions,
    portfolioSummary,
    watchlistItems,
    marketIndices,
    selectedStock,
    sidebarCollapsed,
    setSelectedStock,
    toggleSidebar,
    addToWatchlist,
    removeFromWatchlist,
    addTransaction
  };
  
  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = () => {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStockContext must be used within a StockProvider');
  }
  return context;
}; 