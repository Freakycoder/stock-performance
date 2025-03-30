// src/components/dashboard/RecentTransactions.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, ChevronRight, Filter, Calendar, Plus, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { transactions, getStockById } from "@/lib/stockData";
import { cn, formatCurrency } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/Badge";
import { useState } from "react";

interface RecentTransactionsProps {
  limit?: number;
}

export function RecentTransactions({ limit = 5 }: RecentTransactionsProps) {
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
  // Filter transactions if needed
  const filteredTransactions = filter === 'all' 
    ? sortedTransactions
    : sortedTransactions.filter(t => t.type === filter);
  
  // Limit the number of transactions shown
  const limitedTransactions = filteredTransactions.slice(0, limit);

  return (
    <Card className="flex flex-col overflow-hidden bg-white border-gray-200 shadow-sm h-full">
      <CardHeader className="flex-shrink-0 p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-2 text-white">
              <Calendar className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-800">Recent Transactions</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-gray-200 p-1">
              <button 
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('buy')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                  filter === 'buy' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Buy
              </button>
              <button 
                onClick={() => setFilter('sell')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                  filter === 'sell' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Sell
              </button>
            </div>
            
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-0">
        <div className="divide-y divide-gray-100">
          {limitedTransactions.length > 0 ? (
            limitedTransactions.map((transaction, i) => {
              const stock = getStockById(transaction.stockId);
              
              if (!stock) return null;
              
              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group flex items-center justify-between p-5 hover:bg-gray-50 transition-colors relative"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div 
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-lg shrink-0",
                        transaction.type === 'buy' 
                          ? "bg-green-50 text-green-600" 
                          : "bg-red-50 text-red-600"
                      )}
                    >
                      {transaction.type === 'buy' ? (
                        <ArrowDown className="h-5 w-5" />
                      ) : (
                        <ArrowUp className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800 truncate max-w-[200px]">
                          {transaction.type === 'buy' ? 'Bought' : 'Sold'} {stock.symbol}
                        </p>
                        <Badge variant={transaction.type === 'buy' ? 'outline' : 'secondary'} className="capitalize">
                          {transaction.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-gray-500 truncate">
                          {transaction.shares} {transaction.shares === 1 ? 'share' : 'shares'} @ {formatCurrency(transaction.price)}
                        </p>
                        <div className="flex items-center">
                          <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                        </div>
                        <p className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 shrink-0">
                          {format(parseISO(transaction.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right min-w-[120px] shrink-0">
                    <p className={cn(
                      "text-lg font-bold truncate",
                      transaction.type === 'buy' ? "text-gray-800" : "text-green-600"
                    )}>
                      {transaction.type === 'buy' ? '-' : '+'}
                      {formatCurrency(transaction.shares * transaction.price)}
                    </p>
                    <motion.button
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="mt-1 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 hover:underline flex items-center gap-1 justify-end"
                    >
                      View Details
                      <ExternalLink className="h-3 w-3" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-gray-100 p-3">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <p className="mt-2 text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
        <Link 
          href="/transactions" 
          className="w-full"
        >
          <Button variant="outline" className="w-full rounded-lg justify-center text-blue-600 border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
            View All Transactions
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}