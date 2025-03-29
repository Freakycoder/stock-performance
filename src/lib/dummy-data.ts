import {
    PortfolioStock,
    StockHistoricalData,
    Transaction,
    PortfolioSummary,
    WatchlistItem,
    MarketIndexData
} from '@/types';

export const generateHistoricalData = (days: number, volatility: number, trend: number = 0, startPrice: number = 100): { date: string; value: number }[] => {
    const data: { date: string; value: number }[] = [];
    let currentPrice = startPrice;

    for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        // Add some randomness with trend
        const change = (Math.random() - 0.5) * volatility + trend;
        currentPrice = Math.max(1, currentPrice + change);

        data.push({
            date: date.toISOString().split('T')[0],
            value: currentPrice
        });
    }

    return data;
};

export const portfolioStocks: PortfolioStock[] = [
    {
        id: '1',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 187.32,
        change: 1.25,
        changePercentage: 0.67,
        volume: 55240000,
        marketCap: 2940000000000,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
        quantity: 15,
        averageBuyPrice: 165.20,
        totalValue: 2809.80,
        profitLoss: 331.80,
        profitLossPercentage: 13.39,
        allocation: 24.5
    },
    {
        id: '2',
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 417.56,
        change: -2.34,
        changePercentage: -0.56,
        volume: 23450000,
        marketCap: 3110000000000,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
        quantity: 8,
        averageBuyPrice: 320.15,
        totalValue: 3340.48,
        profitLoss: 779.28,
        profitLossPercentage: 30.42,
        allocation: 29.1
    },
    {
        id: '3',
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 150.12,
        change: 0.87,
        changePercentage: 0.58,
        volume: 19870000,
        marketCap: 1880000000000,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
        quantity: 12,
        averageBuyPrice: 125.45,
        totalValue: 1801.44,
        profitLoss: 296.04,
        profitLossPercentage: 19.67,
        allocation: 15.7
    },
    {
        id: '4',
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 181.49,
        change: 3.21,
        changePercentage: 1.80,
        volume: 41230000,
        marketCap: 1900000000000,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
        quantity: 10,
        averageBuyPrice: 140.32,
        totalValue: 1814.90,
        profitLoss: 411.70,
        profitLossPercentage: 29.34,
        allocation: 15.8
    },
    {
        id: '5',
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 250.98,
        change: -5.43,
        changePercentage: -2.12,
        volume: 58920000,
        marketCap: 780000000000,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/2048px-Tesla_Motors.svg.png',
        quantity: 7,
        averageBuyPrice: 210.75,
        totalValue: 1756.86,
        profitLoss: 281.61,
        profitLossPercentage: 19.09,
        allocation: 15.3
    }
];

export const stocksHistoricalData: Record<string, StockHistoricalData[]> = {
    '1': [
        {
            id: '1-day',
            symbol: 'AAPL',
            timeframe: 'day',
            data: generateHistoricalData(30, 2, 0.1, 180)
        },
        {
            id: '1-week',
            symbol: 'AAPL',
            timeframe: 'week',
            data: generateHistoricalData(90, 3, 0.2, 170)
        },
        {
            id: '1-month',
            symbol: 'AAPL',
            timeframe: 'month',
            data: generateHistoricalData(180, 4, 0.15, 160)
        },
        {
            id: '1-year',
            symbol: 'AAPL',
            timeframe: 'year',
            data: generateHistoricalData(365, 5, 0.1, 150)
        },
        {
            id: '1-5year',
            symbol: 'AAPL',
            timeframe: '5year',
            data: generateHistoricalData(1825, 6, 0.05, 90)
        }
    ],
    '2': [
        {
            id: '2-day',
            symbol: 'MSFT',
            timeframe: 'day',
            data: generateHistoricalData(30, 3, -0.1, 420)
        },
        {
            id: '2-week',
            symbol: 'MSFT',
            timeframe: 'week',
            data: generateHistoricalData(90, 4, 0.3, 400)
        },
        {
            id: '2-month',
            symbol: 'MSFT',
            timeframe: 'month',
            data: generateHistoricalData(180, 6, 0.25, 380)
        },
        {
            id: '2-year',
            symbol: 'MSFT',
            timeframe: 'year',
            data: generateHistoricalData(365, 8, 0.2, 350)
        },
        {
            id: '2-5year',
            symbol: 'MSFT',
            timeframe: '5year',
            data: generateHistoricalData(1825, 12, 0.15, 200)
        }
    ],
    '3': [
        {
            id: '3-day',
            symbol: 'GOOGL',
            timeframe: 'day',
            data: generateHistoricalData(30, 1.5, 0.05, 149)
        },
        {
            id: '3-week',
            symbol: 'GOOGL',
            timeframe: 'week',
            data: generateHistoricalData(90, 2.5, 0.1, 145)
        },
        {
            id: '3-month',
            symbol: 'GOOGL',
            timeframe: 'month',
            data: generateHistoricalData(180, 3.5, 0.15, 140)
        },
        {
            id: '3-year',
            symbol: 'GOOGL',
            timeframe: 'year',
            data: generateHistoricalData(365, 5, 0.1, 135)
        },
        {
            id: '3-5year',
            symbol: 'GOOGL',
            timeframe: '5year',
            data: generateHistoricalData(1825, 8, 0.05, 95)
        }
    ],
    '4': [
        {
            id: '4-day',
            symbol: 'AMZN',
            timeframe: 'day',
            data: generateHistoricalData(30, 2, 0.2, 180)
        },
        {
            id: '4-week',
            symbol: 'AMZN',
            timeframe: 'week',
            data: generateHistoricalData(90, 3, 0.15, 175)
        },
        {
            id: '4-month',
            symbol: 'AMZN',
            timeframe: 'month',
            data: generateHistoricalData(180, 4, 0.1, 170)
        },
        {
            id: '4-year',
            symbol: 'AMZN',
            timeframe: 'year',
            data: generateHistoricalData(365, 6, 0.05, 160)
        },
        {
            id: '4-5year',
            symbol: 'AMZN',
            timeframe: '5year',
            data: generateHistoricalData(1825, 10, 0.1, 100)
        }
    ],
    '5': [
        {
            id: '5-day',
            symbol: 'TSLA',
            timeframe: 'day',
            data: generateHistoricalData(30, 5, -0.2, 255)
        },
        {
            id: '5-week',
            symbol: 'TSLA',
            timeframe: 'week',
            data: generateHistoricalData(90, 8, -0.1, 260)
        },
        {
            id: '5-month',
            symbol: 'TSLA',
            timeframe: 'month',
            data: generateHistoricalData(180, 10, 0.1, 250)
        },
        {
            id: '5-year',
            symbol: 'TSLA',
            timeframe: 'year',
            data: generateHistoricalData(365, 15, 0.2, 230)
        },
        {
            id: '5-5year',
            symbol: 'TSLA',
            timeframe: '5year',
            data: generateHistoricalData(1825, 20, 0.3, 70)
        }
    ]
};

export const transactions: Transaction[] = [
    {
        id: 't1',
        stockId: '1',
        stockSymbol: 'AAPL',
        stockName: 'Apple Inc.',
        type: 'buy',
        price: 165.20,
        quantity: 10,
        total: 1652.00,
        date: '2023-10-15'
    },
    {
        id: 't2',
        stockId: '2',
        stockSymbol: 'MSFT',
        stockName: 'Microsoft Corporation',
        type: 'buy',
        price: 320.15,
        quantity: 5,
        total: 1600.75,
        date: '2023-09-22'
    },
    {
        id: 't3',
        stockId: '3',
        stockSymbol: 'GOOGL',
        stockName: 'Alphabet Inc.',
        type: 'buy',
        price: 125.45,
        quantity: 8,
        total: 1003.60,
        date: '2023-11-05'
    },
    {
        id: 't4',
        stockId: '1',
        stockSymbol: 'AAPL',
        stockName: 'Apple Inc.',
        type: 'buy',
        price: 170.30,
        quantity: 5,
        total: 851.50,
        date: '2024-01-10'
    },
    {
        id: 't5',
        stockId: '4',
        stockSymbol: 'AMZN',
        stockName: 'Amazon.com Inc.',
        type: 'buy',
        price: 140.32,
        quantity: 10,
        total: 1403.20,
        date: '2023-12-18'
    },
    {
        id: 't6',
        stockId: '2',
        stockSymbol: 'MSFT',
        stockName: 'Microsoft Corporation',
        type: 'buy',
        price: 340.75,
        quantity: 3,
        total: 1022.25,
        date: '2024-02-03'
    },
    {
        id: 't7',
        stockId: '5',
        stockSymbol: 'TSLA',
        stockName: 'Tesla, Inc.',
        type: 'buy',
        price: 210.75,
        quantity: 7,
        total: 1475.25,
        date: '2024-01-25'
    },
    {
        id: 't8',
        stockId: '3',
        stockSymbol: 'GOOGL',
        stockName: 'Alphabet Inc.',
        type: 'buy',
        price: 132.80,
        quantity: 4,
        total: 531.20,
        date: '2024-02-15'
    }
];

export const portfolioSummary: PortfolioSummary = {
    totalValue: 11523.48,
    dayChange: -28.43,
    dayChangePercentage: -0.25,
    totalProfit: 2100.43,
    totalProfitPercentage: 22.30,
    allocation: {
        stocks: 75,
        crypto: 15,
        cash: 8,
        bonds: 2
    }
};

export const watchlistItems: WatchlistItem[] = [
    {
        id: 'w1',
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 950.02,
        change: 15.25,
        changePercentage: 1.63,
        volume: 49870000,
        marketCap: 2340000000000,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png',
        addedOn: '2024-01-05'
    },
    {
        id: 'w2',
        symbol: 'META',
        name: 'Meta Platforms, Inc.',
        price: 511.78,
        change: 2.34,
        changePercentage: 0.46,
        volume: 15670000,
        marketCap: 1310000000000,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png',
        addedOn: '2024-02-10'
    },
    {
        id: 'w3',
        symbol: 'AMD',
        name: 'Advanced Micro Devices, Inc.',
        price: 165.32,
        change: -3.21,
        changePercentage: -1.91,
        volume: 22450000,
        marketCap: 266000000000,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/AMD_logo_pre-2013.svg/1280px-AMD_logo_pre-2013.svg.png',
        addedOn: '2024-01-22',
        notes: 'Potential entry at $150'
    },
    {
        id: 'w4',
        symbol: 'DIS',
        name: 'The Walt Disney Company',
        price: 112.89,
        change: 0.67,
        changePercentage: 0.60,
        volume: 9870000,
        marketCap: 206000000000,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Disney_wordmark.svg/2560px-Disney_wordmark.svg.png',
        addedOn: '2024-02-28'
    }
];

export const marketIndices: MarketIndexData[] = [
    {
        id: 'i1',
        symbol: 'SPX',
        name: 'S&P 500',
        price: 5178.45,
        value: 5178.45,
        change: 20.15,
        changePercentage: 0.37,
        data: generateHistoricalData(30, 20, 0.8, 5100),
        region: 'United States',
        open: 5160.23,
        previousClose: 5158.30,
        dayHigh: 5185.92,
        dayLow: 5155.67,
        description: 'The Standard and Poor\'s 500 is a stock market index tracking the stock performance of 500 large companies listed on stock exchanges in the United States.',
        components: ['AAPL', 'MSFT', 'AMZN', 'NVDA', 'GOOGL', 'META', 'TSLA']
    },
    {
        id: 'i2',
        symbol: 'DJI',
        name: 'Dow Jones',
        price: 39425.32,
        value: 39425.32,
        change: -105.45,
        changePercentage: -0.27,
        data: generateHistoricalData(30, 150, -0.5, 39500),
        region: 'United States',
        open: 39530.77,
        previousClose: 39530.77,
        dayHigh: 39650.32,
        dayLow: 39380.21,
        description: 'The Dow Jones Industrial Average is a stock market index that measures the stock performance of 30 large companies listed on stock exchanges in the United States.',
        components: ['AAPL', 'MSFT', 'AMZN', 'WMT', 'JNJ', 'PG', 'V']
    },
    {
        id: 'i3',
        symbol: 'IXIC',
        name: 'NASDAQ',
        price: 16750.75,
        value: 16750.75,
        change: 95.25,
        changePercentage: 0.57,
        data: generateHistoricalData(30, 80, 1.2, 16700),
        region: 'United States',
        open: 16655.50,
        previousClose: 16655.50,
        dayHigh: 16800.25,
        dayLow: 16630.45,
        description: 'The Nasdaq Composite is a stock market index that includes almost all stocks listed on the Nasdaq stock exchange. It is heavily weighted towards companies in the technology sector.',
        components: ['AAPL', 'MSFT', 'AMZN', 'NVDA', 'GOOGL', 'META', 'TSLA']
    },
    {
        id: 'i4',
        symbol: 'FTSE',
        name: 'FTSE 100',
        price: 7936.95,
        value: 7936.95,
        change: 10.15,
        changePercentage: 0.13,
        data: generateHistoricalData(30, 40, 0.2, 7900),
        region: 'United Kingdom',
        open: 7926.80,
        previousClose: 7926.80,
        dayHigh: 7955.45,
        dayLow: 7910.30,
        description: 'The Financial Times Stock Exchange 100 Index, also called the FTSE 100 Index, is a share index of the 100 companies listed on the London Stock Exchange with the highest market capitalization.',
        components: ['HSBC', 'AZN', 'SHEL', 'ULVR', 'RIO', 'BP', 'GSK']
    },
    {
        id: 'i5',
        symbol: 'N225',
        name: 'Nikkei 225',
        price: 38262.16,
        value: 38262.16,
        change: -125.89,
        changePercentage: -0.33,
        data: generateHistoricalData(30, 200, -0.4, 38400),
        region: 'Japan',
        open: 38388.05,
        previousClose: 38388.05,
        dayHigh: 38450.25,
        dayLow: 38180.65,
        description: 'The Nikkei 225, more commonly called the Nikkei, is a stock market index for the Tokyo Stock Exchange. It has been calculated daily by the Nihon Keizai Shimbun newspaper since 1950.',
        components: ['7203.T', '9984.T', '6758.T', '6861.T', '6501.T', '7267.T', '9432.T']
    }
];