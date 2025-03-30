import { useMemo, useState } from 'react';
import { HistoricalDataPoint, StockData, TimeRange } from '@/lib/types';
import { stocks as mockStocks } from '@/lib/stockData';

const timeRanges: TimeRange[] = [
  { label: '1D', value: '1D', days: 1 },
  { label: '1W', value: '1W', days: 7 },
  { label: '1M', value: '1M', days: 30 },
  { label: '3M', value: '3M', days: 90 },
  { label: '1Y', value: '1Y', days: 365 },
  { label: 'All', value: 'All', days: Infinity },
];

export function useStockData(stockId?: string) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange['value']>('1M');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch all stocks or a specific stock
  const stocks = useMemo(() => {
    if (!stockId) return mockStocks;
    const stock = mockStocks.find(s => s.id === stockId);
    return stock ? [stock] : [];
  }, [stockId]);

  // Filter historical data based on selected time range
  const getFilteredData = (data: HistoricalDataPoint[], range: string): HistoricalDataPoint[] => {
    const selectedRange = timeRanges.find(r => r.value === range) || timeRanges[2]; // Default to 1M
    if (selectedRange.value === 'All') return data;
    return data.slice(-selectedRange.days);
  };

  // Process all stocks with filtered historical data
  const processedStocks = useMemo(() => {
    return stocks.map(stock => ({
      ...stock,
      filteredHistoricalData: getFilteredData(stock.historicalData, selectedTimeRange)
    }));
  }, [stocks, selectedTimeRange]);

  // Get a single stock if stockId is provided
  const stock = useMemo(() => {
    if (!stockId) return null;
    return processedStocks.length > 0 ? processedStocks[0] : null;
  }, [stockId, processedStocks]);

  // Simulate loading data for a realistic feel
  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return {
    stocks: processedStocks,
    stock,
    isLoading,
    refreshData,
    timeRange: selectedTimeRange,
    setTimeRange: setSelectedTimeRange,
    timeRanges,
  };
}