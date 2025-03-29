'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
    Legend
} from 'recharts';
import { StockHistoricalData, PortfolioStock, Transaction } from '@/types/index';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { useStockContext } from '@/lib/context';
import { DollarSign, TrendingUp, TrendingDown, BarChart3, ArrowRight, Calendar, Info } from 'lucide-react';

interface StockChartProps {
    stock: PortfolioStock;
    historicalData: StockHistoricalData[];
}

export const StockChart: React.FC<StockChartProps> = ({ stock, historicalData }) => {
    const { addTransaction } = useStockContext();
    const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month' | 'year' | '5year'>('month');
    const [showTradeModal, setShowTradeModal] = useState(false);
    const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
    const [quantity, setQuantity] = useState<string>('1');
    const [showStats, setShowStats] = useState(false);

    const data = historicalData?.find(d => d.timeframe === selectedTimeframe)?.data || [];

    const isPositive = stock.change >= 0;
    const chartColor = isPositive ? 'var(--primary)' : '#EF4444';
    const gradientStartColor = isPositive ? 'rgba(59, 130, 246, 0.5)' : 'rgba(239, 68, 68, 0.5)';
    const gradientEndColor = isPositive ? 'rgba(59, 130, 246, 0.0)' : 'rgba(239, 68, 68, 0.0)';

    const timeframeOptions = [
        { value: 'day', label: '1D' },
        { value: 'week', label: '1W' },
        { value: 'month', label: '1M' },
        { value: 'year', label: '1Y' },
        { value: '5year', label: '5Y' }
    ];

    const handleTrade = () => {
        const parsedQuantity = parseInt(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) return;
        
        if (tradeType === 'sell' && parsedQuantity > stock.quantity) {
            // Can't sell more than owned
            return;
        }

        const total = parsedQuantity * stock.price;
        
        const newTransaction: Transaction = {
            id: `tr-${Date.now()}`,
            stockId: stock.id,
            stockSymbol: stock.symbol,
            stockName: stock.name,
            type: tradeType,
            price: stock.price,
            quantity: parsedQuantity,
            total: total,
            date: new Date().toISOString()
        };
        
        addTransaction(newTransaction);
        setShowTradeModal(false);
        setQuantity('1');
    };

    const formatXAxis = (tickItem: string) => {
        const date = new Date(tickItem);
        if (selectedTimeframe === 'day') {
            return date.getHours() + ':00';
        } else if (selectedTimeframe === 'week') {
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        } else if (selectedTimeframe === 'month') {
            return date.toLocaleDateString('en-US', { day: '2-digit' });
        } else if (selectedTimeframe === 'year' || selectedTimeframe === '5year') {
            return date.toLocaleDateString('en-US', { month: 'short' });
        }
        return tickItem;
    };

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card dark:bg-card p-3 shadow-md rounded border border-border">
                    <p className="text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(payload[0].payload.date).toLocaleDateString()}
                    </p>
                    <p className="font-medium">{formatCurrency(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    // Calculate maximum and minimum prices from the historical data
    const maxPrice = data.length > 0 ? Math.max(...data.map(d => d.value)) : stock.price;
    const minPrice = data.length > 0 ? Math.min(...data.map(d => d.value)) : stock.price;
    const priceRange = maxPrice - minPrice;

    // Calculate additional stats
    const currentProfit = stock.quantity * (stock.price - stock.averageBuyPrice);
    const potentialProfit = stock.quantity * (maxPrice - stock.averageBuyPrice);
    const maxProfitPercent = ((maxPrice - stock.averageBuyPrice) / stock.averageBuyPrice) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card dark:bg-card rounded-xl shadow-sm p-6 border border-border animate-fade-in"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <img
                        src={stock.logoUrl}
                        alt={stock.name}
                        className="w-10 h-10 mr-3"
                    />
                    <div>
                        <h2 className="text-xl font-bold">{stock.symbol}</h2>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold">{formatCurrency(stock.price)}</p>
                    <p className={`text-sm ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {formatCurrency(stock.change)} ({formatPercentage(stock.changePercentage)})
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button 
                        onClick={() => {
                            setTradeType('buy');
                            setShowTradeModal(true);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Buy
                    </button>
                    <button 
                        onClick={() => {
                            setTradeType('sell');
                            setShowTradeModal(true);
                        }}
                        className={`${
                            stock.quantity > 0 
                              ? 'bg-red-500 hover:bg-red-600 text-white' 
                              : 'bg-red-300 text-white cursor-not-allowed'
                        } px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                        disabled={stock.quantity <= 0}
                    >
                        Sell
                    </button>
                    <button
                        onClick={() => setShowStats(!showStats)}
                        className="bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                        <Info size={16} />
                        <span>Stats</span>
                    </button>
                </div>
                <div className="flex justify-end space-x-1">
                    {timeframeOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setSelectedTimeframe(option.value as any)}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${selectedTimeframe === option.value
                                    ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary'
                                    : 'text-muted-foreground hover:bg-secondary dark:hover:bg-secondary'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <defs>
                            <linearGradient id={`colorValue${stock.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={gradientStartColor} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={gradientEndColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatXAxis}
                            tick={{ fontSize: 12 }}
                            tickMargin={10}
                            tickCount={5}
                            stroke="var(--muted-foreground)"
                        />
                        <YAxis
                            domain={['dataMin - 5', 'dataMax + 5']}
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`}
                            tickMargin={10}
                            width={60}
                            stroke="var(--muted-foreground)"
                            orientation="right"
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={chartColor}
                            strokeWidth={2}
                            fill={`url(#colorValue${stock.id})`}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {showStats && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 bg-secondary dark:bg-secondary/50 p-4 rounded-lg"
                >
                    <h3 className="font-medium mb-2 flex items-center gap-1">
                        <BarChart3 size={16} />
                        Performance Metrics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        <div>
                            <p className="text-xs text-muted-foreground">Highest Price</p>
                            <p className="font-medium">{formatCurrency(maxPrice)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Lowest Price</p>
                            <p className="font-medium">{formatCurrency(minPrice)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Price Volatility</p>
                            <p className="font-medium">{formatPercentage((priceRange / minPrice) * 100)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Max Potential Profit</p>
                            <p className={`font-medium ${maxProfitPercent > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {formatPercentage(maxProfitPercent)}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary dark:bg-secondary/50 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Quantity</h4>
                    <p className="text-lg font-semibold">{stock.quantity}</p>
                </div>
                <div className="bg-secondary dark:bg-secondary/50 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Avg. Cost</h4>
                    <p className="text-lg font-semibold">{formatCurrency(stock.averageBuyPrice)}</p>
                </div>
                <div className="bg-secondary dark:bg-secondary/50 p-4 rounded-lg">
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Total Value</h4>
                    <p className="text-lg font-semibold">{formatCurrency(stock.totalValue)}</p>
                </div>
            </div>

            {showTradeModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card dark:bg-card rounded-xl p-6 max-w-md w-full shadow-lg border border-border"
                    >
                        <h3 className="text-xl font-bold mb-4">
                            {tradeType === 'buy' ? 'Buy' : 'Sell'} {stock.symbol}
                        </h3>
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground mb-2">Current Price</p>
                            <p className="text-lg font-bold">{formatCurrency(stock.price)}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Quantity
                            </label>
                            <input
                                type="number"
                                min="1"
                                max={tradeType === 'sell' ? stock.quantity : undefined}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full px-3 py-2 bg-input dark:bg-input border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground mb-2">Total</p>
                            <p className="text-lg font-bold">
                                {formatCurrency(parseFloat(quantity || '0') * stock.price)}
                            </p>
                        </div>
                        {tradeType === 'buy' && (
                            <div className="p-3 bg-secondary dark:bg-secondary rounded-lg mb-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Average Cost After Purchase</span>
                                    <span className="font-medium">
                                        {formatCurrency(
                                            (stock.averageBuyPrice * stock.quantity + stock.price * parseFloat(quantity || '0')) / 
                                            (stock.quantity + parseFloat(quantity || '0'))
                                        )}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="flex space-x-3">
                            <button
                                onClick={handleTrade}
                                className={`flex-1 py-2 rounded-md text-white font-medium ${
                                    tradeType === 'buy' 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : 'bg-red-500 hover:bg-red-600'
                                }`}
                            >
                                {tradeType === 'buy' ? 'Buy' : 'Sell'}
                            </button>
                            <button
                                onClick={() => setShowTradeModal(false)}
                                className="flex-1 py-2 bg-secondary dark:bg-secondary hover:bg-secondary/80 dark:hover:bg-secondary/80 rounded-md font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};