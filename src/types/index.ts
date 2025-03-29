export interface Stock {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercentage: number;
    volume: number;
    marketCap: number;
    logoUrl: string;
}

export interface MarketIndexData extends Omit<Stock, 'volume' | 'marketCap' | 'logoUrl'> {
    data: { date: string; value: number }[];
}

export interface PortfolioStock extends Stock {
    quantity: number;
    averageBuyPrice: number;
    totalValue: number;
    profitLoss: number;
    profitLossPercentage: number;
    allocation: number;
}

export interface HistoricalDataPoint {
    date: string;
    value: number;
}

export interface StockHistoricalData {
    id: string;
    symbol: string;
    timeframe: 'day' | 'week' | 'month' | 'year' | '5year';
    data: HistoricalDataPoint[];
}

export interface Transaction {
    id: string;
    stockId: string;
    stockSymbol: string;
    stockName: string;
    type: 'buy' | 'sell';
    price: number;
    quantity: number;
    total: number;
    date: string;
}

export interface PortfolioSummary {
    totalValue: number;
    dayChange: number;
    dayChangePercentage: number;
    totalProfit: number;
    totalProfitPercentage: number;
    allocation: {
        stocks: number;
        crypto: number;
        cash: number;
        bonds: number;
    };
}

export interface WatchlistItem extends Stock {
    addedOn: string;
    notes?: string;
}