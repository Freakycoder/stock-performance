// src/components/dashboard/TopStocks.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ExternalLink, Sparkles, ArrowRight, Eye } from "lucide-react";
import { stocks } from "@/lib/stockData";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { AreaChart } from "@tremor/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/Badge";
import { useState } from "react";

interface TopStocksProps {
  limit?: number;
}

export function TopStocks({ limit = 3 }: TopStocksProps) {
  const [hoveredStock, setHoveredStock] = useState<string | null>(null);
  
  // Get top performing stocks by percentage change
  const topGainers = [...stocks]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, limit);
    
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
    <div className="space-y-4">
      {topGainers.map((stock, i) => (
        <motion.div 
          key={stock.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          onHoverStart={() => setHoveredStock(stock.id)}
          onHoverEnd={() => setHoveredStock(null)}
          className="relative overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0 shadow-sm" 
                style={{ backgroundColor: `${stock.color}15` }}
              >
                <span className="text-base font-bold" style={{ color: stock.color }}>
                  {stock.symbol.slice(0, 2)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-800 line-clamp-1">{stock.name}</p>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-500">{stock.symbol}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold text-gray-800">{formatCurrency(stock.price)}</span>
                  <Badge 
                    variant={stock.changePercent >= 0 ? "success" : "destructive"}
                    className="flex items-center gap-0.5"
                  >
                    {stock.changePercent >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stock.changePercent >= 0 ? "+" : ""}
                    {formatPercentage(stock.changePercent)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block h-16 w-24">
                <AreaChart
                  data={formatStockChart(stock.historicalData)}
                  index="date"
                  categories={["Price"]}
                  colors={[stock.changePercent >= 0 ? "emerald" : "rose"]}
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
            </div>
            
            {/* Market stats that appear on hover */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: hoveredStock === stock.id ? 1 : 0,
                x: hoveredStock === stock.id ? 0 : 20
              }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-4 flex items-center gap-3"
            >
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Vol</span>
                  <span className="text-xs font-medium text-gray-800">{(stock.volume / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500">Cap</span>
                  <span className="text-xs font-medium text-gray-800">{(stock.marketCap / 1000000000).toFixed(1)}B</span>
                </div>
              </div>
              
              <Link href={`/market/${stock.id}`} className="flex">
                <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0 bg-gray-100 hover:bg-gray-200">
                  <Eye className="h-4 w-4 text-gray-600" />
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Chart section that displays on non-hover state */}
          <motion.div 
            animate={{ 
              opacity: hoveredStock === stock.id ? 0 : 1,
              height: hoveredStock === stock.id ? '0px' : '60px',
            }}
            transition={{ duration: 0.2 }}
            className="px-2 overflow-hidden"
          >
            <AreaChart
              data={formatStockChart(stock.historicalData)}
              index="date"
              categories={["Price"]}
              colors={[stock.changePercent >= 0 ? "emerald" : "rose"]}
              showLegend={false}
              showXAxis={false}
              showYAxis={false}
              showGridLines={false}
              showTooltip={false}
              autoMinValue={true}
              curveType="monotone"
              className="h-16 -mt-2"
            />
          </motion.div>
          
          {/* Analysis section that displays on hover */}
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: hoveredStock === stock.id ? 1 : 0,
              height: hoveredStock === stock.id ? 'auto' : '0px'
            }}
            transition={{ duration: 0.2 }}
            className="mt-1 overflow-hidden"
          >
            <div className="grid grid-cols-3 border-t border-gray-100">
              <div className="border-r border-gray-100 p-3">
                <p className="text-xs text-gray-500">52W High</p>
                <p className="text-sm font-medium text-gray-800">{formatCurrency(stock.price * 1.3)}</p>
              </div>
              <div className="border-r border-gray-100 p-3">
                <p className="text-xs text-gray-500">52W Low</p>
                <p className="text-sm font-medium text-gray-800">{formatCurrency(stock.price * 0.7)}</p>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500">Avg Vol</p>
                <p className="text-sm font-medium text-gray-800">{(stock.volume / 1000000).toFixed(1)}M</p>
              </div>
            </div>
            <div className="border-t border-gray-100 p-3 flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-medium text-gray-800">
                  Top {i + 1} performer today
                </span>
              </div>
              <Link href={`/market/${stock.id}`}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-700 flex gap-1 items-center h-8 px-3"
                >
                  View Analysis
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ))}
      
      <Link href="/market" className="mt-4 block">
        <Button 
          variant="outline" 
          className="w-full rounded-lg justify-center text-blue-600 border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
        >
          View All Stocks
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}