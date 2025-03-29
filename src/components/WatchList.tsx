'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WatchlistItem, Stock } from '@/types/index';
import { formatCurrency, formatPercentage, formatDate } from '@/lib/utils';
import { ArrowUp, ArrowDown, PlusCircle, Star, X, Search, Eye, EyeOff, MoreHorizontal } from 'lucide-react';
import { useStockContext } from '@/lib/context';

export const WatchList: React.FC = () => {
    const { watchlistItems: items, removeFromWatchlist, addToWatchlist, portfolioStocks, setSelectedStock } = useStockContext();
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'symbol' | 'price' | 'change'>('symbol');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Get all available stocks (combining portfolio stocks with watchlist stocks)
    const allStocks = [...portfolioStocks];
    
    // Filter stocks based on search term
    const filteredStocks = allStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Check if a stock is already in the watchlist
    const isInWatchlist = (stockId: string) => {
        return items.some(item => item.id === stockId);
    };
    
    // Sort watchlist items
    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === 'symbol') {
            return sortDirection === 'asc' 
                ? a.symbol.localeCompare(b.symbol)
                : b.symbol.localeCompare(a.symbol);
        } else if (sortBy === 'price') {
            return sortDirection === 'asc'
                ? a.price - b.price
                : b.price - a.price;
        } else {
            return sortDirection === 'asc'
                ? a.changePercentage - b.changePercentage
                : b.changePercentage - a.changePercentage;
        }
    });
    
    const toggleSort = (column: 'symbol' | 'price' | 'change') => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };
    
    const handleStockSelect = (stock: any) => {
        const portfolioStock = portfolioStocks.find(s => s.id === stock.id);
        if (portfolioStock) {
            setSelectedStock(portfolioStock);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card dark:bg-card rounded-xl shadow-sm p-6 border border-border h-full animate-fade-in"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Watchlist</h2>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm transition-colors"
                >
                    <PlusCircle size={14} />
                    <span>Add Stock</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xs font-medium text-muted-foreground border-b border-border">
                            <th className="pb-3 pl-4 cursor-pointer" onClick={() => toggleSort('symbol')}>
                                <div className="flex items-center gap-1">
                                    Symbol
                                    {sortBy === 'symbol' && (
                                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th className="pb-3 cursor-pointer" onClick={() => toggleSort('price')}>
                                <div className="flex items-center gap-1">
                                    Price
                                    {sortBy === 'price' && (
                                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th className="pb-3 cursor-pointer" onClick={() => toggleSort('change')}>
                                <div className="flex items-center gap-1">
                                    Change
                                    {sortBy === 'change' && (
                                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th className="pb-3">Added</th>
                            <th className="pb-3 pr-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedItems.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-16 text-center text-muted-foreground">
                                    <Eye size={28} className="mx-auto mb-2 opacity-40" />
                                    <p>No stocks in your watchlist</p>
                                    <p className="text-sm mt-1">Add some stocks to track them</p>
                                </td>
                            </tr>
                        ) : (
                            sortedItems.map((item) => {
                                const isPositive = item.changePercentage >= 0;

                                return (
                                    <motion.tr
                                        key={item.id}
                                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                                        className="border-b border-border last:border-b-0 cursor-pointer"
                                        onClick={() => handleStockSelect(item)}
                                    >
                                        <td className="py-4 pl-4">
                                            <div className="flex items-center">
                                                <img src={item.logoUrl} alt={item.name} className="w-8 h-8 mr-3" />
                                                <div>
                                                    <p className="font-medium">{item.symbol}</p>
                                                    <p className="text-xs text-muted-foreground">{item.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 font-medium">
                                            {formatCurrency(item.price)}
                                        </td>
                                        <td className="py-4">
                                            <div className={`flex items-center ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {isPositive ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                                                {formatPercentage(item.changePercentage)}
                                            </div>
                                        </td>
                                        <td className="py-4 text-sm text-muted-foreground">
                                            {formatDate(item.addedOn)}
                                        </td>
                                        <td className="py-4 pr-4 text-right">
                                            <div onClick={(e) => e.stopPropagation()} className="flex space-x-2 justify-end">
                                                <button 
                                                    onClick={() => removeFromWatchlist(item.id)}
                                                    className="p-1.5 rounded-md hover:bg-secondary dark:hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors"
                                                    title="Remove from watchlist"
                                                >
                                                    <EyeOff size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card dark:bg-card rounded-xl p-6 max-w-md w-full shadow-lg border border-border"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Add to Watchlist</h3>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="text-muted-foreground hover:text-foreground rounded-full p-1 hover:bg-secondary transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search stocks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-input dark:bg-input border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                autoFocus
                            />
                            <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                        </div>
                        
                        <div className="max-h-80 overflow-y-auto">
                            {filteredStocks.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">
                                    No stocks found matching "{searchTerm}"
                                </p>
                            ) : (
                                <ul className="divide-y divide-border">
                                    {filteredStocks.map(stock => (
                                        <li key={stock.id} className="py-3">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <img src={stock.logoUrl} alt={stock.name} className="w-8 h-8 mr-3" />
                                                    <div>
                                                        <p className="font-medium">{stock.symbol}</p>
                                                        <p className="text-xs text-muted-foreground">{stock.name}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        addToWatchlist(stock);
                                                        setShowAddModal(false);
                                                        setSearchTerm('');
                                                    }}
                                                    disabled={isInWatchlist(stock.id)}
                                                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                                                        isInWatchlist(stock.id)
                                                            ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                                                            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                                                    }`}
                                                >
                                                    {isInWatchlist(stock.id) ? 'Added' : 'Add'}
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};