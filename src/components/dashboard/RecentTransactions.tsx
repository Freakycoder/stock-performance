// src/components/dashboard/RecentTransactions.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { transactions, getStockById } from "@/lib/stockData";
import { cn, formatCurrency } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Link from "next/link";

interface RecentTransactionsProps {
  limit?: number;
}

export function RecentTransactions({ limit }: RecentTransactionsProps) {
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return (
    <Card className="overflow-hidden h-full shadow-sm">
      <CardHeader className="p-5 border-b bg-background">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {sortedTransactions.map((transaction, i) => {
            const stock = getStockById(transaction.stockId);
            
            if (!stock) return null;
            
            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center justify-between p-4 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center">
                  <div 
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full mr-3",
                      transaction.type === 'buy' 
                        ? "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400" 
                        : "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                    )}
                  >
                    {transaction.type === 'buy' ? (
                      <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
                    ) : (
                      <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'buy' ? 'Bought' : 'Sold'} {stock.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {transaction.shares} {transaction.shares === 1 ? 'share' : 'shares'} @ {formatCurrency(transaction.price)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-medium",
                    transaction.type === 'buy' ? "text-foreground" : "text-green-600 dark:text-green-400"
                  )}>
                    {transaction.type === 'buy' ? '-' : '+'}
                    {formatCurrency(transaction.shares * transaction.price)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {format(parseISO(transaction.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {sortedTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t bg-background">
        <Link 
          href="/transactions" 
          className="flex w-full items-center justify-center text-sm text-primary hover:underline"
        >
          View All Transactions
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}