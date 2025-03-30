// src/components/dashboard/RecentTransactions.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, ChevronRight, Filter } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { transactions, getStockById } from "@/lib/stockData";
import { cn, formatCurrency } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/Badge";

interface RecentTransactionsProps {
  limit?: number;
}

export function RecentTransactions({ limit = 5 }: RecentTransactionsProps) {
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return (
    <Card className="overflow-hidden h-full shadow-sm bg-card border-border">
      <CardHeader className="p-6 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
          <Button variant="outline" size="sm" className="h-9 rounded-lg flex items-center gap-1.5">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {sortedTransactions.map((transaction, i) => {
            const stock = getStockById(transaction.stockId);
            
            if (!stock) return null;
            
            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center justify-between p-5 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl shrink-0",
                      transaction.type === 'buy' 
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    )}
                  >
                    {transaction.type === 'buy' ? (
                      <ArrowDown className="h-5 w-5" />
                    ) : (
                      <ArrowUp className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {transaction.type === 'buy' ? 'Bought' : 'Sold'} {stock.symbol}
                      </p>
                      <Badge variant={transaction.type === 'buy' ? 'outline' : 'secondary'} className="capitalize">
                        {transaction.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm text-muted-foreground">
                        {transaction.shares} {transaction.shares === 1 ? 'share' : 'shares'} @ {formatCurrency(transaction.price)}
                      </p>
                      <p className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {format(parseISO(transaction.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-lg font-bold",
                    transaction.type === 'buy' ? "text-foreground" : "text-green-600 dark:text-green-400"
                  )}>
                    {transaction.type === 'buy' ? '-' : '+'}
                    {formatCurrency(transaction.shares * transaction.price)}
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
      <CardFooter className="p-4 border-t border-border bg-muted/10">
        <Link 
          href="/transactions" 
          className="w-full"
        >
          <Button variant="outline" className="w-full rounded-lg justify-center">
            View All Transactions
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}