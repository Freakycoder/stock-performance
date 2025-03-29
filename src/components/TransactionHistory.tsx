'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, formatDate } from '@/lib/utils';
import { TrendingUp, TrendingDown, Calendar, Filter, ChevronDown } from 'lucide-react';
import { useStockContext } from '@/lib/context';

export const TransactionHistory: React.FC = () => {
  const { transactions } = useStockContext();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const filteredTransactions = filter === 'all' 
    ? transactions
    : transactions.filter(t => t.type === filter);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card dark:bg-card rounded-xl shadow-sm p-6 border border-border h-full animate-fade-in"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        <div className="relative">
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-1 text-sm bg-secondary dark:bg-secondary p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            <Filter size={14} />
            <span className="capitalize">{filter}</span>
            <ChevronDown size={14} className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {filterOpen && (
            <div className="absolute right-0 top-full mt-1 bg-card dark:bg-card rounded-lg shadow-lg border border-border z-10 w-36">
              <ul>
                <li className="hover:bg-secondary dark:hover:bg-secondary p-2 cursor-pointer text-sm transition-colors text-muted-foreground hover:text-foreground"
                    onClick={() => { setFilter('all'); setFilterOpen(false); }}>
                  All
                </li>
                <li className="hover:bg-secondary dark:hover:bg-secondary p-2 cursor-pointer text-sm transition-colors text-muted-foreground hover:text-foreground"
                    onClick={() => { setFilter('buy'); setFilterOpen(false); }}>
                  Buy
                </li>
                <li className="hover:bg-secondary dark:hover:bg-secondary p-2 cursor-pointer text-sm transition-colors text-muted-foreground hover:text-foreground"
                    onClick={() => { setFilter('sell'); setFilterOpen(false); }}>
                  Sell
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredTransactions.slice(0, 5).map((transaction) => (
          <motion.div 
            key={transaction.id}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="flex items-center p-3 bg-secondary dark:bg-secondary rounded-lg"
          >
            <div className={`p-2 rounded-full mr-4 ${
              transaction.type === 'buy' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            }`}>
              {transaction.type === 'buy' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium">{transaction.stockSymbol}</span>
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full capitalize bg-secondary-foreground/10 text-secondary-foreground">
                  {transaction.type}
                </span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Calendar size={12} className="mr-1" />
                {formatDate(transaction.date)}
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-medium">{formatCurrency(transaction.total)}</div>
              <div className="text-sm text-muted-foreground">
                {transaction.quantity} shares at {formatCurrency(transaction.price)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredTransactions.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <Filter size={32} className="mb-2 opacity-50" />
          <p>No {filter} transactions found</p>
        </div>
      )}
      
      <button className="w-full mt-4 py-2 text-sm text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-center gap-2">
        View All Transactions
        <ChevronDown size={14} />
      </button>
    </motion.div>
  );
};