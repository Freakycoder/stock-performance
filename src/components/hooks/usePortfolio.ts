import { useState, useEffect } from 'react';
import { 
  portfolioHoldings, 
  transactions, 
  calculatePortfolioValue, 
  calculateSectorAllocation 
} from '@/lib/stockData';
import { 
  PortfolioSummary, 
  PortfolioHolding, 
  Transaction, 
  SectorAllocation 
} from '@/lib/types';

interface UsePortfolioResult {
  portfolioSummary: PortfolioSummary | null;
  holdings: PortfolioHolding[];
  transactions: Transaction[];
  sectorAllocation: SectorAllocation[];
  portfolioLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for managing portfolio data and calculations
 * In a real application, this would fetch data from a backend API
 */
export function usePortfolio(): UsePortfolioResult {
  const [portfolioLoading, setPortfolioLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioSummary | null>(null);
  const [holdingsData, setHoldingsData] = useState<PortfolioHolding[]>([]);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [sectorAllocationData, setSectorAllocationData] = useState<SectorAllocation[]>([]);

  // Simulate fetching portfolio data
  useEffect(() => {
    try {
      // In a real app, this would be API calls
      // For now, we use our mock data and calculations
      
      // Get the portfolio summary from our calculation function
      // Make sure we properly cast it to match our PortfolioSummary type
      const portfolioSummary = calculatePortfolioValue();
      
      // Filter out any potentially null holdings to satisfy TypeScript
      const validPortfolio: PortfolioSummary = {
        ...portfolioSummary,
        holdings: portfolioSummary.holdings.filter((holding): holding is NonNullable<typeof holding> => 
          holding !== null
        )
      };
      
      setPortfolioData(validPortfolio);
      setHoldingsData(portfolioHoldings);
      
      // Sort transactions by date (newest first)
      const sortedTransactions = [...transactions].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setTransactionsData(sortedTransactions);
      
      // Get sector allocation data
      const sectorData = calculateSectorAllocation();
      setSectorAllocationData(sectorData);
      
      setPortfolioLoading(false);
    } catch (err) {
      console.error('Portfolio data error:', err);
      setError('Failed to fetch portfolio data');
      setPortfolioLoading(false);
    }
  }, []);

  return {
    portfolioSummary: portfolioData,
    holdings: holdingsData,
    transactions: transactionsData,
    sectorAllocation: sectorAllocationData,
    portfolioLoading,
    error,
  };
}