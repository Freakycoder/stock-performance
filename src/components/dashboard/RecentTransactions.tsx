"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { transactions, getStockById } from "@/lib/stockData";
import { cn, formatCurrency } from "@/lib/utils";
import { format, parseISO } from "date-fns";

export function RecentTransactions() {
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <Card>
      <CardHeader className="bg-primary/5 px-6 py-5 dark:bg-primary/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
          <Clock className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {sortedTransactions.map((transaction, i) => {
            const stock = getStockById(transaction.stockId);
            
            if (!stock) return null;
            
            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="flex items-start justify-between"
              >
                <div className="flex items-center">
                  <div 
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full mr-3",
                      transaction.type === 'buy' 
                        ? "bg-profit-100 text-profit-700 dark:bg-profit-900 dark:text-profit-300" 
                        : "bg-loss-100 text-loss-700 dark:bg-loss-900 dark:text-loss-300"
                    )}
                  >
                    {transaction.type === 'buy' ? (
                      <ArrowDown className="h-5 w-5" />
                    ) : (
                      <ArrowUp className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'buy' ? 'Bought' : 'Sold'} {stock.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.shares} {transaction.shares === 1 ? 'share' : 'shares'} @ {formatCurrency(transaction.price)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {transaction.type === 'buy' ? '-' : '+'}
                    {formatCurrency(transaction.shares * transaction.price)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(parseISO(transaction.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {transactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-card border-t p-4">
        <button className="flex w-full items-center justify-center text-sm font-medium text-primary">
          View All Transactions
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </CardFooter>
    </Card>
  );
}