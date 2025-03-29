'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, DollarSign, Percent, PieChart, TrendingUp, BarChart } from 'lucide-react';
import { PortfolioSummary as PortfolioSummaryType } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { useStockContext } from '@/lib/context';

export const PortfolioSummary: React.FC = () => {
    const { portfolioSummary: summary } = useStockContext();
    
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: 'easeOut'
            }
        })
    };

    const isPositive = (value: number) => value >= 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-card dark:bg-card p-6 rounded-xl shadow-sm border border-border card-hover animate-fade-in"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Portfolio Value</h3>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <DollarSign size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-bold mb-1">
                        {formatCurrency(summary.totalValue)}
                    </span>
                    <div className="flex items-center">
                        <span className={`flex items-center ${isPositive(summary.dayChange) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {isPositive(summary.dayChange) ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                            {formatCurrency(Math.abs(summary.dayChange))}
                        </span>
                        <span className={`ml-2 ${isPositive(summary.dayChangePercentage) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {formatPercentage(summary.dayChangePercentage)}
                        </span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-card dark:bg-card p-6 rounded-xl shadow-sm border border-border card-hover animate-fade-in"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Profit/Loss</h3>
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <TrendingUp size={18} className="text-purple-600 dark:text-purple-400" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-bold mb-1">
                        {formatCurrency(summary.totalProfit)}
                    </span>
                    <div className="flex items-center">
                        <span className={`flex items-center ${isPositive(summary.totalProfitPercentage) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {isPositive(summary.totalProfitPercentage) ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                            {formatPercentage(summary.totalProfitPercentage)}
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground">all time</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-card dark:bg-card p-6 rounded-xl shadow-sm border border-border card-hover animate-fade-in"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Asset Allocation</h3>
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <PieChart size={18} className="text-green-600 dark:text-green-400" />
                    </div>
                </div>
                <div className="mt-2">
                    <div className="w-full h-4 bg-secondary dark:bg-secondary rounded-full overflow-hidden mb-2">
                        <div className="flex h-full">
                            <div
                                className="bg-primary h-full"
                                style={{ width: `${summary.allocation.stocks}%` }}
                            ></div>
                            <div
                                className="bg-green-500 h-full"
                                style={{ width: `${summary.allocation.crypto}%` }}
                            ></div>
                            <div
                                className="bg-blue-500 h-full"
                                style={{ width: `${summary.allocation.cash}%` }}
                            ></div>
                            <div
                                className="bg-amber-500 h-full"
                                style={{ width: `${summary.allocation.bonds}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="flex items-center">
                            <span className="w-2 h-2 inline-block bg-primary rounded-full mr-1"></span>
                            Stocks {summary.allocation.stocks}%
                        </span>
                        <span className="flex items-center">
                            <span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-1"></span>
                            Crypto {summary.allocation.crypto}%
                        </span>
                        <span className="flex items-center">
                            <span className="w-2 h-2 inline-block bg-blue-500 rounded-full mr-1"></span>
                            Cash {summary.allocation.cash}%
                        </span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-gradient-to-br from-primary to-purple-600 p-6 rounded-xl shadow-sm text-white card-hover animate-fade-in"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white/80">Trending Stocks</h3>
                    <div className="p-2 bg-white/10 rounded-lg">
                        <BarChart size={18} className="text-white" />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-white/90 font-medium">NVDA</span>
                        <div className="flex items-center">
                            <ArrowUp size={14} className="mr-1" />
                            <span className="font-medium">1.63%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-white/90 font-medium">AAPL</span>
                        <div className="flex items-center">
                            <ArrowUp size={14} className="mr-1" />
                            <span className="font-medium">0.67%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-white/90 font-medium">MSFT</span>
                        <div className="flex items-center">
                            <ArrowDown size={14} className="mr-1" />
                            <span className="font-medium">0.56%</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};