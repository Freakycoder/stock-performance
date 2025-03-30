// src/pages/market.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { stocks, marketIndexes } from "@/lib/stockData";
import { AreaChart } from "@tremor/react";
import Link from "next/link";

export default function MarketPage() {
  const [search, setSearch] = useState("");
  
  // Filter stocks based on search
  const filteredStocks = stocks.filter((stock) => {
    const searchTerm = search.toLowerCase();
    return (
      stock.name.toLowerCase().includes(searchTerm) ||
      stock.symbol.toLowerCase().includes(searchTerm) ||
      stock.sector.toLowerCase().includes(searchTerm)
    );
  });
  
  // Format stock data for charts
  const formatStockChart = (historicalData: any[]) => {
    // Get only the last 30 days of data
    const recentData = historicalData.slice(-30);
    
    // Format for Tremor area chart
    return recentData.map(point => ({
      date: point.date,
      Price: point.price
    }));
  };

  return (
    <DashboardLayout title="Market">
      <div className="space-y-6">
        {/* Market Indexes */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marketIndexes.map((index, i) => (
            <motion.div 
              key={index.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="shadow-sm border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{index.name}</p>
                      <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{index.value.toLocaleString()}</p>
                      <div className={cn(
                        "flex items-center gap-1 mt-2 text-sm font-medium px-2 py-1 rounded-full w-fit",
                        index.changePercent >= 0 
                          ? "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40" 
                          : "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40"
                      )}>
                        {index.changePercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {index.changePercent >= 0 ? "+" : ""}
                        {index.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <div className={cn(
                      "text-7xl font-thin opacity-10",
                      index.changePercent >= 0 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-red-600 dark:text-red-400"
                    )}>
                      {index.changePercent >= 0 ? "↗" : "↘"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Stock List */}
        <Card className="shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 px-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">All Stocks</CardTitle>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search stocks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-10 w-full sm:w-[260px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredStocks.map((stock, i) => (
                <motion.div
                  key={stock.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex flex-1 items-center">
                    <div 
                      className="flex h-12 w-12 items-center justify-center rounded-full mr-4"
                      style={{ backgroundColor: `${stock.color}15` }}
                    >
                      <span className="text-sm font-semibold" style={{ color: stock.color }}>
                        {stock.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{stock.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{stock.symbol}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-md">{stock.sector}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-32 h-16">
                    <AreaChart
                      data={formatStockChart(stock.historicalData)}
                      index="date"
                      categories={["Price"]}
                      colors={[stock.changePercent >= 0 ? "#10b981" : "#ef4444"]}
                      showLegend={false}
                      showXAxis={false}
                      showYAxis={false}
                      showGridLines={false}
                      showTooltip={false}
                      autoMinValue={true}
                      curveType="monotone"
                      className="h-16"
                    />
                  </div>
                  
                  <div className="ml-4 md:ml-6 text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(stock.price)}</p>
                    // src/pages/market.tsx (continued)
                    <div className={cn(
                      "flex items-center justify-end gap-1 text-xs font-medium mt-1 px-2 py-0.5 rounded-full w-fit ml-auto",
                      stock.changePercent >= 0 
                        ? "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40" 
                        : "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40"
                    )}>
                      {stock.changePercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {stock.changePercent >= 0 ? "+" : ""}
                      {formatPercentage(stock.changePercent)}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="ml-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" asChild>
                    <Link href={`/market/${stock.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
              
              {filteredStocks.length === 0 && (
                <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                  No stocks found matching "{search}".
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}