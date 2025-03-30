// src/pages/transactions.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Search, Filter, ChevronLeft, ChevronRight, Calendar, DownloadCloud, Plus, Sliders, Trash2, Eye, Edit, ExternalLink } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { transactions, getStockById } from "@/lib/stockData";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
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
  
  // Summary statistics
  const totalBuyValue = transactions
    .filter(t => t.type === 'buy')
    .reduce((acc, t) => acc + (t.shares * t.price), 0);
    
  const totalSellValue = transactions
    .filter(t => t.type === 'sell')
    .reduce((acc, t) => acc + (t.shares * t.price), 0);
    
  const netCashFlow = totalSellValue - totalBuyValue;

  return (
    <DashboardLayout title="Transactions">
      <div className="space-y-8">
        {/* Header with summary statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <ArrowDown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Purchases</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{formatCurrency(totalBuyValue)}</p>
                <p className="text-xs text-gray-500 mt-1">{transactions.filter(t => t.type === 'buy').length} buy transactions</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <ArrowUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{formatCurrency(totalSellValue)}</p>
                <p className="text-xs text-gray-500 mt-1">{transactions.filter(t => t.type === 'sell').length} sell transactions</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                netCashFlow >= 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              )}>
                {netCashFlow >= 0 ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Net Cash Flow</p>
                <p className={cn(
                  "text-xl font-bold mt-1",
                  netCashFlow >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {formatCurrency(Math.abs(netCashFlow))}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {netCashFlow >= 0 ? "Net inflow" : "Net outflow"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 w-full sm:w-[260px] rounded-xl border-gray-200"
              />
            </div>
            
            <Tabs value={filter} onValueChange={(value) => handleFilterChange(value as any)} className="w-full sm:w-auto">
              <TabsList className="h-10 bg-gray-100 w-full sm:w-auto rounded-xl">
                <TabsTrigger value="all" className="flex-1 sm:flex-none rounded-lg">All</TabsTrigger>
                <TabsTrigger value="buy" className="flex-1 sm:flex-none rounded-lg">Buy</TabsTrigger>
                <TabsTrigger value="sell" className="flex-1 sm:flex-none rounded-lg">Sell</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex items-center gap-2 flex-wrap"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-lg h-10 border-gray-200 text-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 text-gray-500 mr-1.5" />
              <span>Filters</span>
              <Badge variant="secondary" className="ml-1.5 bg-gray-100">{showFilters ? "On" : "Off"}</Badge>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-lg h-10 border-gray-200 text-gray-700"
            >
              <Calendar className="h-4 w-4 text-gray-500 mr-1.5" />
              <span>Date Range</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-lg h-10 border-gray-200 text-gray-700"
            >
              <DownloadCloud className="h-4 w-4 text-gray-500 mr-1.5" />
              <span>Export</span>
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="rounded-lg h-10 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              <span>New Transaction</span>
            </Button>
          </motion.div>
        </div>
        
        {/* Advanced filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className="border-gray-200 shadow-sm bg-white">
                <CardHeader className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders className="h-5 w-5 text-gray-500" />
                      <CardTitle className="text-lg font-medium text-gray-800">Advanced Filters</CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full text-gray-500"
                      onClick={() => setShowFilters(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">From</label>
                          <Input type="date" className="rounded-lg border-gray-200" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">To</label>
                          <Input type="date" className="rounded-lg border-gray-200" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Min</label>
                          <Input type="number" placeholder="0" className="rounded-lg border-gray-200" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Max</label>
                          <Input type="number" placeholder="10000" className="rounded-lg border-gray-200" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stock Sector</label>
                      <select className="w-full h-10 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <option value="">All Sectors</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="consumer">Consumer</option>
                        <option value="energy">Energy</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button 
                      variant="outline" 
                      className="rounded-lg border-gray-200"
                      onClick={() => setShowFilters(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="default" 
                      className="rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Transactions list */}
        <Card className="shadow-sm border-gray-200 bg-white overflow-hidden">
          <CardHeader className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">Transaction History</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredTransactions.length} transactions found
                </p>
              </div>
              {filter !== 'all' && (
                <Badge variant={filter === 'buy' ? 'info' : 'success'} className="capitalize text-sm px-3 py-1" rounded="full">
                  {filter} Transactions
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200 text-left text-sm">
                    <th className="px-6 py-4 font-medium text-gray-500">Type</th>
                    <th className="px-6 py-4 font-medium text-gray-500">Stock</th>
                    <th className="px-6 py-4 font-medium text-gray-500 text-right">Shares</th>
                    <th className="px-6 py-4 font-medium text-gray-500 text-right">Price</th>
                    <th className="px-6 py-4 font-medium text-gray-500 text-right">Total</th>
                    <th className="px-6 py-4 font-medium text-gray-500 text-right">Date</th>
                    <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedTransactions.map((transaction, i) => {
                    const stock = getStockById(transaction.stockId);
                    if (!stock) return null;
                    
                    const isSelected = selectedTransaction === transaction.id;
                    
                    return (
                      <motion.tr 
                        key={transaction.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                        className={cn(
                          "group hover:bg-gray-50 transition-colors cursor-pointer",
                          isSelected ? "bg-blue-50" : ""
                        )}
                        onClick={() => setSelectedTransaction(isSelected ? null : transaction.id)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div 
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
                                transaction.type === 'buy' 
                                  ? "bg-blue-50 text-blue-600" 
                                  : "bg-green-50 text-green-600"
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
                              className="h-9 w-9 rounded-lg flex items-center justify-center shadow-sm" 
                              style={{ backgroundColor: `${stock.color}15` }}
                            >
                              <span className="text-xs font-bold" style={{ color: stock.color }}>
                                {stock.symbol.slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{stock.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <p className="text-xs font-medium text-gray-500">{stock.symbol}</p>
                                <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                                <Badge 
                                  variant={transaction.type === 'buy' ? 'default' : 'success'} 
                                  className="capitalize text-[10px] h-4 px-1.5" 
                                  rounded="full"
                                >
                                  {transaction.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-800">
                          {transaction.shares}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-800">
                          {formatCurrency(transaction.price)}
                        </td>
                        <td className="px-6 py-4 text-right font-semibold">
                          <span className={cn(
                            transaction.type === 'buy' 
                              ? "text-gray-800" 
                              : "text-green-600"
                          )}>
                            {transaction.type === 'buy' ? '-' : '+'}
                            {formatCurrency(transaction.shares * transaction.price)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-500">
                          {format(parseISO(transaction.date), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            >
                              <Trash2 className="h-4 w-4" />
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
                          <div className="rounded-full bg-gray-100 h-12 w-12 flex items-center justify-center">
                            <Search className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-gray-500">No transactions found.</p>
                          {search && (
                            <Button 
                              variant="link" 
                              onClick={() => setSearch('')}
                              className="text-blue-600"
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
            
            {/* Transaction details expansion */}
            <AnimatePresence>
              {selectedTransaction && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-blue-50 border-t border-blue-100 overflow-hidden"
                >
                  {(() => {
                    const transaction = transactions.find(t => t.id === selectedTransaction);
                    const stock = transaction ? getStockById(transaction.stockId) : null;
                    
                    if (!transaction || !stock) return null;
                    
                    return (
                      <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-500">Transaction Type</p>
                              <p className="text-base font-medium text-gray-800 mt-1 capitalize">{transaction.type}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Date & Time</p>
                              <p className="text-base font-medium text-gray-800 mt-1">{format(parseISO(transaction.date), 'MMMM d, yyyy')}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Transaction ID</p>
                              <p className="text-base font-medium text-gray-800 mt-1">{transaction.id}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-500">Stock</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div 
                                  className="h-6 w-6 rounded-md flex items-center justify-center" 
                                  style={{ backgroundColor: `${stock.color}15` }}
                                >
                                  <span className="text-xs font-bold" style={{ color: stock.color }}>
                                    {stock.symbol.slice(0, 2)}
                                  </span>
                                </div>
                                <p className="text-base font-medium text-gray-800">{stock.name} ({stock.symbol})</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Shares</p>
                              <p className="text-base font-medium text-gray-800 mt-1">{transaction.shares} shares @ {formatCurrency(transaction.price)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Total Amount</p>
                              <p className="text-base font-medium text-gray-800 mt-1">{formatCurrency(transaction.shares * transaction.price)}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col">
                            <div className="flex-1 space-y-4">
                              <div>
                                <p className="text-sm text-gray-500">Current Stock Price</p>
                                <p className="text-base font-medium text-gray-800 mt-1">{formatCurrency(stock.price)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Value Change Since Transaction</p>
                                <div className={cn(
                                  "flex items-center gap-1 mt-1",
                                  stock.price > transaction.price ? "text-green-600" : "text-red-600"
                                )}>
                                  {stock.price > transaction.price ? (
                                    <ArrowUp className="h-4 w-4" />
                                  ) : (
                                    <ArrowDown className="h-4 w-4" />
                                  )}
                                  <p className="text-base font-medium">
                                    {formatCurrency(Math.abs(stock.price - transaction.price) * transaction.shares)}
                                    {" "}
                                    ({((stock.price / transaction.price - 1) * 100).toFixed(2)}%)
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-auto pt-4 flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                className="rounded-lg border-gray-300"
                                onClick={() => setSelectedTransaction(null)}
                              >
                                Close
                              </Button>
                              <Button 
                                variant="outline" 
                                className="rounded-lg border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                <ExternalLink className="h-4 w-4 mr-1.5" />
                                View Stock
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-800">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-medium text-gray-800">
                    {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
                  </span>{" "}
                  of <span className="font-medium text-gray-800">{filteredTransactions.length}</span> transactions
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg border-gray-200"
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
                        className={cn(
                          "h-8 w-8 p-0 rounded-lg",
                          currentPage === pageNum 
                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                            : "border-gray-200"
                        )}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg border-gray-200"
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