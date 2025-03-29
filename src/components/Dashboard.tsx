'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { PortfolioSummary } from './PortfolioSummary';
import { StockChart } from './StockChart';
import { MarketOverview } from './MarketOverview';
import { WatchList } from './WatchList';
import { TransactionHistory } from './TransactionHistory';
import { Bell, Search, User, Plus, ArrowUpRight, Menu, LayoutGrid } from 'lucide-react';
import { useStockContext } from '@/lib/context';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
    const { 
        sidebarCollapsed, 
        selectedStock, 
        stocksHistoricalData, 
        portfolioStocks,
        setSelectedStock,
        toggleSidebar
    } = useStockContext();

    const [searchTerm, setSearchTerm] = useState('');
    const [notificationsCount, setNotificationsCount] = useState(3);
    const [layoutType, setLayoutType] = useState<'minimal' | 'compact' | 'expanded'>('minimal');
    
    const filteredStocks = portfolioStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleStockSelect = (stock: any) => {
        setSelectedStock(stock);
        setSearchTerm('');
    };

    const cycleLayout = () => {
        if (layoutType === 'minimal') setLayoutType('compact');
        else if (layoutType === 'compact') setLayoutType('expanded');
        else setLayoutType('minimal');
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    return (
        <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen text-zinc-800 dark:text-zinc-200 font-sans">
            {/* Mobile menu toggle */}
            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-md text-zinc-800 dark:text-zinc-200"
            >
                <Menu size={20} />
            </motion.button>
            
            <Sidebar />

            <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-60'}`}>
                {/* Header Bar */}
                <motion.header 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sticky top-0 z-30 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-700 h-16 px-4 md:px-6 flex items-center justify-between"
                >
                    <div className="flex-1 max-w-md">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search stocks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-700 border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 shadow-sm transition-all"
                            />
                            <Search size={16} className="absolute left-3 top-2.5 text-zinc-400 dark:text-zinc-500" />
                            
                            {searchTerm.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 z-50 max-h-60 overflow-y-auto"
                                >
                                    {filteredStocks.length === 0 ? (
                                        <div className="p-4 text-center text-zinc-400 dark:text-zinc-500">No stocks found</div>
                                    ) : (
                                        filteredStocks.map(stock => (
                                            <motion.div 
                                                key={stock.id} 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                                                className="p-3 cursor-pointer flex items-center border-b border-zinc-200 dark:border-zinc-700 last:border-0"
                                                onClick={() => handleStockSelect(stock)}
                                            >
                                                <img src={stock.logoUrl} alt={stock.name} className="w-8 h-8 mr-3 rounded-full" />
                                                <div>
                                                    <p className="font-medium">{stock.symbol}</p>
                                                    <p className="text-xs text-zinc-400 dark:text-zinc-500">{stock.name}</p>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            onClick={cycleLayout}
                            className={`p-2 rounded-full relative hover:shadow-md transition-all ${
                                layoutType !== 'minimal' 
                                    ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200' 
                                    : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                            }`}
                            title={`Current layout: ${layoutType}. Click to change.`}
                        >
                            <LayoutGrid size={16} />
                        </motion.button>
                        
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white dark:bg-zinc-800 rounded-full relative hover:shadow-md transition-all"
                        >
                            <Bell size={16} className="text-zinc-800 dark:text-zinc-200" />
                            {notificationsCount > 0 && (
                                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[10px] flex items-center justify-center font-medium">
                                    {notificationsCount}
                                </span>
                            )}
                        </motion.button>
                        <div className="h-6 border-l border-zinc-200 dark:border-zinc-700"></div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-2 text-zinc-800 dark:text-zinc-200">
                                <User size={14} />
                            </div>
                            <span className="text-sm font-medium hidden md:inline-block">John Doe</span>
                        </div>
                    </div>
                </motion.header>

                {/* Dashboard Content */}
                <div className="p-4 md:p-6">
                    {/* Header section */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
                        >
                            <h1 className="text-2xl font-semibold">Dashboard</h1>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 dark:bg-zinc-100 hover:bg-zinc-900 dark:hover:bg-white text-white dark:text-zinc-900 rounded-lg text-sm font-medium transition-all shadow-sm mt-3 md:mt-0"
                            >
                                <Plus size={16} />
                                <span>Add Stock</span>
                            </motion.button>
                        </motion.div>

                        {/* Portfolio Summary */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <PortfolioSummary />
                        </motion.div>

                        {/* Grid layouts */}
                        {layoutType === 'minimal' && (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                                <motion.div 
                                    variants={itemVariants}
                                    className="md:col-span-8 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[400px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <StockChart
                                        stock={selectedStock}
                                        historicalData={stocksHistoricalData[selectedStock.id]}
                                    />
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="md:col-span-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[400px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <MarketOverview />
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="md:col-span-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[350px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <WatchList />
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="md:col-span-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[350px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <TransactionHistory />
                                </motion.div>
                            </div>
                        )}

                        {layoutType === 'compact' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <motion.div 
                                    variants={itemVariants}
                                    className="col-span-1 lg:col-span-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[400px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <StockChart
                                        stock={selectedStock}
                                        historicalData={stocksHistoricalData[selectedStock.id]}
                                    />
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="col-span-1 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[400px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <MarketOverview />
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="col-span-1 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[350px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <WatchList />
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="col-span-1 lg:col-span-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[350px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <TransactionHistory />
                                </motion.div>
                            </div>
                        )}

                        {layoutType === 'expanded' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <motion.div 
                                    variants={itemVariants}
                                    className="md:col-span-3 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[400px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <StockChart
                                        stock={selectedStock}
                                        historicalData={stocksHistoricalData[selectedStock.id]}
                                    />
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="md:col-span-1 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[350px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <MarketOverview />
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="md:col-span-1 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[350px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <WatchList />
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="md:col-span-1 bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 min-h-[350px] border border-zinc-200 dark:border-zinc-700"
                                >
                                    <TransactionHistory />
                                </motion.div>
                            </div>
                        )}
                        
                        {/* Footer */}
                        <motion.div 
                            variants={itemVariants}
                            className="text-center mt-6 text-zinc-500 dark:text-zinc-400"
                        >
                            <a href="https://finviz.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 text-sm hover:underline transition-all">
                                <span>Visit Finviz for more financial data</span>
                                <ArrowUpRight size={12} />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};