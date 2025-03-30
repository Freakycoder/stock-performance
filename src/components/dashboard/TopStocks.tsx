"use client";

import { motion } from "framer-motion";
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { stocks } from "@/lib/stockData";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { AreaChart } from "@tremor/react";

export function TopStocks() {
  // Get top performing stocks by percentage change
  const topGainers = [...stocks]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3);
    
  // Get worst performing stocks by percentage change
  const topLosers = [...stocks]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 3);
  
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="bg-green-50/30 px-6 py-5 dark:bg-green-900/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Top Gainers</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {topGainers.map((stock, i) => (
              <motion.div 
                key={stock.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="flex h-8 w-8 items-center justify-center rounded-full" 
                        style={{ backgroundColor: `${stock.color}20` }}
                      >
                        <span className="text-xs font-semibold" style={{ color: stock.color }}>
                          {stock.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{stock.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stock.symbol}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-xl font-bold">{formatCurrency(stock.price)}</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      +{formatPercentage(stock.changePercent)}
                    </span>
                  </div>
                </div>
                <div className="ml-4 h-16 w-24">
                  <AreaChart
                    data={formatStockChart(stock.historicalData)}
                    index="date"
                    categories={["Price"]}
                    colors={["emerald"]}
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
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-white border-t p-4 dark:bg-gray-950 dark:border-gray-800">
          <button className="flex w-full items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-500">
            View All Gainers
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="bg-red-50/30 px-6 py-5 dark:bg-red-900/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Top Losers</CardTitle>
            <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {topLosers.map((stock, i) => (
              <motion.div 
                key={stock.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="flex h-8 w-8 items-center justify-center rounded-full" 
                        style={{ backgroundColor: `${stock.color}20` }}
                      >
                        <span className="text-xs font-semibold" style={{ color: stock.color }}>
                          {stock.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{stock.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stock.symbol}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-xl font-bold">{formatCurrency(stock.price)}</span>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      {formatPercentage(stock.changePercent)}
                    </span>
                  </div>
                </div>
                <div className="ml-4 h-16 w-24">
                  <AreaChart
                    data={formatStockChart(stock.historicalData)}
                    index="date"
                    categories={["Price"]}
                    colors={["red"]}
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
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-white border-t p-4 dark:bg-gray-950 dark:border-gray-800">
          <button className="flex w-full items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-500">
            View All Losers
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}