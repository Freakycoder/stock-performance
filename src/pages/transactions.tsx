// src/pages/transactions.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Search, Filter, ChevronLeft, ChevronRight, Calendar, DownloadCloud, Plus } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { transactions, getStockById } from "@/lib/stockData";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const itemsPerPage = 10;
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Filter transactions based on search and type filter
  const filteredTransactions = sortedTransactions.filter((transaction) => {
    const stock = getStockById(transaction.stockId);
    if (!stock) return false;
    
    const searchTerm = search.toLowerCase();
    const matchesSearch = 
      stock.name.toLowerCase().includes(searchTerm) ||
      stock.symbol.toLowerCase().includes(searchTerm) ||
      transaction.type.toLowerCase().includes(searchTerm);
      
    const matchesFilter = filter === 'all' || transaction.type === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Paginate transactions
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleFilterChange = (value: 'all' | 'buy' | 'sell') => {
    setFilter(value);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  return (
    <DashboardLayout title="Transactions">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 w-full sm:w-[260px] rounded-xl"
              />
            </div>
            
            <Tabs value={filter} onValueChange={(value) => handleFilterChange(value as any)} className="w-full sm:w-auto">
              <TabsList className="h-10 bg-muted w-full sm:w-auto">
                <TabsTrigger value="all" className="flex-1 sm:flex-none rounded-lg">All</TabsTrigger>
                <TabsTrigger value="buy" className="flex-1 sm:flex-none rounded-lg">Buy</TabsTrigger>
                <TabsTrigger value="sell" className="flex-1 sm:flex-none rounded-lg">Sell</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <Button variant="outline" size="sm" className="rounded-lg h-10 w-full sm:w-auto justify-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Filter Date</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg h-10 w-full sm:w-auto justify-center gap-1">
              <DownloadCloud className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button variant="default" size="sm" className="rounded-lg h-10 w-full sm:w-auto justify-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Transaction</span>
            </Button>
          </motion.div>
        </div>
        
        <Card className="shadow-sm border-border bg-card overflow-hidden">
          <CardHeader className="p-6 border-b border-border bg-muted/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Transaction History</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredTransactions.length} transactions found
                </p>
              </div>
              {filter !== 'all' && (
                <Badge variant={filter === 'buy' ? 'success' : 'destructive'} className="capitalize text-sm px-3 py-1">
                  {filter} Transactions
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr className="border-b border-border text-left text-sm">
                    <th className="px-6 py-4 font-medium text-muted-foreground">Type</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground">Stock</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground text-right">Shares</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground text-right">Price</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground text-right">Total</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground text-right">Date</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedTransactions.map((transaction, i) => {
                    const stock = getStockById(transaction.stockId);
                    if (!stock) return null;
                    
                    return (
                      <motion.tr 
                        key={transaction.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                        className="group hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div 
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
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
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" 
                              style={{ backgroundColor: `${stock.color}20` }}
                            >
                              <span className="text-xs font-bold" style={{ color: stock.color }}>
                                {stock.symbol.slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{stock.name}</p>
                              <p className="text-xs text-muted-foreground">{stock.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {transaction.shares}
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {formatCurrency(transaction.price)}
                        </td>
                        <td className="px-6 py-4 text-right font-bold">
                          <span className={cn(
                            transaction.type === 'buy' 
                              ? "text-foreground" 
                              : "text-green-600 dark:text-green-400"
                          )}>
                            {transaction.type === 'buy' ? '-' : '+'}
                            {formatCurrency(transaction.shares * transaction.price)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-muted-foreground">
                          {format(parseISO(transaction.date), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-8 rounded-lg">
                              Details
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                  
                  {paginatedTransactions.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center">
                            <Search className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground">No transactions found.</p>
                          {search && (
                            <Button 
                              variant="link" 
                              onClick={() => setSearch('')}
                              className="text-primary"
                            >
                              Clear search
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center px-6 py-4 border-t border-border bg-muted/20">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredTransactions.length}</span> transactions
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
                    let pageNum;
                    if (totalPages <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage <= 2) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 1) {
                      pageNum = totalPages - 2 + i;
                    } else {
                      pageNum = currentPage - 1 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 p-0 rounded-lg"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}