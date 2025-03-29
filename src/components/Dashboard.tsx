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
    const [layoutType, setLayoutType] = useState<'standard' | 'masonry' | 'dashboard'>('standard');
    
    const mainContainerWidth = sidebarCollapsed ? 'pl-0 md:pl-20' : 'pl-0 md:pl-64';
    
    const filteredStocks = portfolioStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleStockSelect = (stock: any) => {
        setSelectedStock(stock);
        setSearchTerm('');
    };

    const cycleLayout = () => {
        if (layoutType === 'standard') setLayoutType('masonry');
        else if (layoutType === 'masonry') setLayoutType('dashboard');
        else setLayoutType('standard');
    };

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1.0]
            }
        })
    };

    return (
        <div className="bg-background dark:bg-background min-h-screen text-foreground dark:text-foreground font-sans">
            <div className="block md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="p-3 bg-card dark:bg-card rounded-full shadow-md text-foreground"
                >
                    <Menu size={20} />
                </button>
            </div>
            
            <Sidebar />

            <main className={`transition-all duration-300 ${mainContainerWidth}`}>
                <header className="sticky top-0 z-30 bg-background/60 dark:bg-background/60 backdrop-blur-xl border-b border-border/40 h-16 px-4 md:px-8 flex items-center justify-between">
                    <div className="flex-1 max-w-md">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search stocks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-card/50 dark:bg-card/50 border-0 rounded-full text-sm focus:ring-1 focus:ring-primary/30 dark:focus:ring-primary/30 shadow-sm transition-all"
                            />
                            <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
                            
                            {searchTerm.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-full left-0 w-full mt-2 bg-card dark:bg-card rounded-xl shadow-lg border border-border/40 z-50 max-h-60 overflow-y-auto"
                                >
                                    {filteredStocks.length === 0 ? (
                                        <div className="p-4 text-center text-muted-foreground">No stocks found</div>
                                    ) : (
                                        filteredStocks.map(stock => (
                                            <motion.div 
                                                key={stock.id} 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                                                className="p-3 cursor-pointer flex items-center border-b border-border/40 last:border-0"
                                                onClick={() => handleStockSelect(stock)}
                                            >
                                                <img src={stock.logoUrl} alt={stock.name} className="w-8 h-8 mr-3 rounded-full" />
                                                <div>
                                                    <p className="font-medium">{stock.symbol}</p>
                                                    <p className="text-xs text-muted-foreground">{stock.name}</p>
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
                                layoutType !== 'standard' 
                                    ? 'bg-primary/20 text-primary' 
                                    : 'bg-card dark:bg-card text-foreground'
                            }`}
                            title={`Current layout: ${layoutType}. Click to change.`}
                        >
                            <LayoutGrid size={16} />
                        </motion.button>
                        
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-card dark:bg-card rounded-full relative hover:shadow-md transition-all"
                        >
                            <Bell size={16} className="text-foreground dark:text-foreground" />
                            {notificationsCount > 0 && (
                                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-medium">
                                    {notificationsCount}
                                </span>
                            )}
                        </motion.button>
                        <div className="h-6 border-l border-border/40"></div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/10 flex items-center justify-center mr-2 text-primary">
                                <User size={14} />
                            </div>
                            <span className="text-sm font-medium hidden md:inline-block">John Doe</span>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-6">
                    {/* Header section common to all layouts */}
                    <motion.div 
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUpVariants}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
                    >
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full text-sm font-medium transition-all shadow-sm mt-3 md:mt-0"
                        >
                            <Plus size={16} />
                            <span>Add Stock</span>
                        </motion.button>
                    </motion.div>

                    {/* Portfolio Summary common to all layouts */}
                    <motion.div
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUpVariants}
                        className="mb-6"
                    >
                        <PortfolioSummary />
                    </motion.div>

                    {/* Dashboard Style Layout (CSS Grid with areas) */}
                    {layoutType === 'dashboard' && (
                        <div className="grid grid-cols-12 auto-rows-auto gap-4 md:gap-6" style={{
                            gridTemplateAreas: `
                                "chart chart chart chart chart chart chart chart overview overview overview overview"
                                "watchlist watchlist watchlist watchlist watchlist watchlist watchlist transactions transactions transactions transactions transactions"
                            `,
                        }}>
                            <motion.div 
                                custom={2}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="col-span-12 md:col-span-8 min-h-[400px]"
                                style={{ gridArea: 'chart' }}
                            >
                                <StockChart
                                    stock={selectedStock}
                                    historicalData={stocksHistoricalData[selectedStock.id]}
                                />
                            </motion.div>

                            <motion.div
                                custom={3}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="col-span-12 md:col-span-4 min-h-[400px]"
                                style={{ gridArea: 'overview' }}
                            >
                                <MarketOverview />
                            </motion.div>

                            <motion.div
                                custom={4}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="col-span-12 md:col-span-7 min-h-[350px]"
                                style={{ gridArea: 'watchlist' }}
                            >
                                <WatchList />
                            </motion.div>

                            <motion.div
                                custom={5}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="col-span-12 md:col-span-5 min-h-[350px]"
                                style={{ gridArea: 'transactions' }}
                            >
                                <TransactionHistory />
                            </motion.div>
                        </div>
                    )}

                    {/* Masonry Layout */}
                    {layoutType === 'masonry' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            <motion.div 
                                custom={2}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="md:col-span-2 min-h-[400px]"
                            >
                                <StockChart
                                    stock={selectedStock}
                                    historicalData={stocksHistoricalData[selectedStock.id]}
                                />
                            </motion.div>

                            <motion.div
                                custom={3}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="min-h-[400px] row-span-2"
                            >
                                <MarketOverview />
                            </motion.div>

                            <motion.div
                                custom={4}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="min-h-[350px]"
                            >
                                <WatchList />
                            </motion.div>

                            <motion.div
                                custom={5}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="min-h-[350px]"
                            >
                                <TransactionHistory />
                            </motion.div>
                        </div>
                    )}

                    {/* Standard Layout */}
                    {layoutType === 'standard' && (
                        <div className="grid grid-cols-12 gap-4 md:gap-6">
                            <motion.div 
                                custom={2}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="col-span-12 lg:col-span-8 min-h-[400px]"
                            >
                                <StockChart
                                    stock={selectedStock}
                                    historicalData={stocksHistoricalData[selectedStock.id]}
                                />
                            </motion.div>

                            <motion.div
                                custom={3}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="col-span-12 lg:col-span-4 min-h-[400px]"
                            >
                                <MarketOverview />
                            </motion.div>

                            <motion.div
                                custom={4}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="col-span-12 lg:col-span-7 min-h-[350px]"
                            >
                                <WatchList />
                            </motion.div>

                            <motion.div
                                custom={5}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUpVariants}
                                className="col-span-12 lg:col-span-5 min-h-[350px]"
                            >
                                <TransactionHistory />
                            </motion.div>
                        </div>
                    )}
                    
                    {/* Footer section */}
                    <motion.div 
                        custom={6}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUpVariants}
                        className="text-center mt-6"
                    >
                        <a href="https://finviz.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-sm hover:underline transition-all">
                            <span>Visit Finviz for more financial data</span>
                            <ArrowUpRight size={12} />
                        </a>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};