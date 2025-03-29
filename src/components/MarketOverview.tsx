'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ChevronDown, Search, Globe, Filter, ArrowUpDown } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { MarketIndexData } from '@/types/index';
import { useStockContext } from '@/lib/context';

export const MarketOverview: React.FC = () => {
    const { marketIndices } = useStockContext();
    const [expandedIndex, setExpandedIndex] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<'name' | 'change'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [regionFilter, setRegionFilter] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const regions = Array.from(new Set(marketIndices.map(index => index.region)));

    const handleSort = (key: 'name' | 'change') => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const filteredAndSortedIndices = marketIndices
        .filter(index => !regionFilter || index.region === regionFilter)
        .filter(index => !searchTerm || index.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortKey === 'name') {
                return sortDirection === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else {
                return sortDirection === 'asc'
                    ? a.changePercentage - b.changePercentage
                    : b.changePercentage - a.changePercentage;
            }
        });

    const toggleIndex = (id: string) => {
        setExpandedIndex(expandedIndex === id ? null : id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card dark:bg-card rounded-xl shadow-sm p-6 border border-border animate-fade-in h-full"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Market Overview</h2>
                <div className="flex gap-2">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-muted-foreground" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search indices..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-input dark:bg-input border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={regionFilter || ''}
                            onChange={(e) => setRegionFilter(e.target.value || null)}
                            className="pl-10 pr-4 py-2 bg-input dark:bg-input border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                        >
                            <option value="">All Regions</option>
                            {regions.map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe size={16} className="text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center mb-3 px-3 py-2 bg-secondary dark:bg-secondary/50 rounded-md">
                <div 
                    className="flex-1 flex items-center gap-1 cursor-pointer"
                    onClick={() => handleSort('name')}
                >
                    <span className="font-medium">Index</span>
                    {sortKey === 'name' && (
                        <ArrowUpDown size={16} className={`${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                    )}
                </div>
                <div 
                    className="w-32 flex items-center gap-1 cursor-pointer"
                    onClick={() => handleSort('change')}
                >
                    <span className="font-medium">Change</span>
                    {sortKey === 'change' && (
                        <ArrowUpDown size={16} className={`${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                    )}
                </div>
            </div>

            <div className="space-y-2 overflow-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
                {filteredAndSortedIndices.length > 0 ? (
                    filteredAndSortedIndices.map((index) => (
                        <div key={index.id} className="animate-fade-in">
                            <div
                                className="flex items-center justify-between px-4 py-3 rounded-md hover:bg-secondary/50 dark:hover:bg-secondary/30 cursor-pointer transition-colors"
                                onClick={() => toggleIndex(index.id)}
                            >
                                <div className="flex items-center">
                                    <ChevronDown
                                        size={18}
                                        className={`mr-2 text-muted-foreground transition-transform duration-200 ${
                                            expandedIndex === index.id ? 'transform rotate-180' : ''
                                        }`}
                                    />
                                    <div>
                                        <p className="font-medium">{index.name}</p>
                                        <p className="text-xs text-muted-foreground">{index.region}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-right">
                                        <p className="font-medium">{formatCurrency(index.value)}</p>
                                        <div className="flex items-center gap-1">
                                            {index.changePercentage >= 0 ? (
                                                <TrendingUp size={14} className="text-green-500" />
                                            ) : (
                                                <TrendingDown size={14} className="text-red-500" />
                                            )}
                                            <p
                                                className={`text-sm ${
                                                    index.changePercentage >= 0
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-red-600 dark:text-red-400'
                                                }`}
                                            >
                                                {formatPercentage(index.changePercentage)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {expandedIndex === index.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-4 py-3 mb-2 ml-6 border-l-2 border-border bg-secondary/30 dark:bg-secondary/20 rounded-r-md"
                                >
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Open</p>
                                            <p className="font-medium">{formatCurrency(index.open)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Previous Close</p>
                                            <p className="font-medium">{formatCurrency(index.previousClose)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Day High</p>
                                            <p className="font-medium">{formatCurrency(index.dayHigh)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Day Low</p>
                                            <p className="font-medium">{formatCurrency(index.dayLow)}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-xs text-muted-foreground">Description</p>
                                        <p className="text-sm mt-1">{index.description}</p>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-xs text-muted-foreground">Top Components</p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                                            {index.components.map((component, idx) => (
                                                <div key={idx} className="text-sm">
                                                    {component}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-32 text-muted-foreground">
                        No indices match your filters
                    </div>
                )}
            </div>
        </motion.div>
    );
};