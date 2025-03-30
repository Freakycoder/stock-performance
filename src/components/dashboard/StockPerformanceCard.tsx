// src/components/dashboard/StockPerformanceCard.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, ExternalLink, Eye, Plus, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { StockData } from "@/lib/stockData";
import { cn, formatCompactNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import { AreaChart } from "@tremor/react";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

interface StockPerformanceCardProps {
  stock: StockData;
  animationDelay?: number;
  href?: string;
}

export function StockPerformanceCard({ 
  stock, 
  animationDelay = 0,
  href
}: StockPerformanceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format data for Tremor chart
  const chartData = stock.historicalData.slice(-30).map((data : any) => ({
    date: data.date,
    Price: data.price,
  }));

  const isPositive = stock.changePercent >= 0;
  const chartColor = isPositive ? "emerald" : "rose";
  
  // Calculate high and low values
  const prices = stock.historicalData.slice(-30).map(data => data.price);
  const highValue = Math.max(...prices);
  const lowValue = Math.min(...prices);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="flex flex-col overflow-hidden border-gray-200 bg-white shadow-sm h-full transition-all duration-200 hover:shadow-md">
        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Header section */}
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm shrink-0" 
                  style={{ backgroundColor: `${stock.color}15` }}
                >
                  <span 
                    className="text-base font-semibold" 
                    style={{ color: stock.color }}
                  >
                    {stock.symbol.slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{stock.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-gray-500">{stock.symbol}</span>
                    <Badge variant={isPositive ? "success" : "destructive"} className="h-5 flex items-center gap-0.5" rounded="full">
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {isPositive ? "+" : ""}{formatPercentage(stock.changePercent)}
                    </Badge>
                  </div>
                </div>
              </div>
              {href && !isHovered && (
                <Link href={href} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
              
              {/* Action buttons that appear on hover */}
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 shrink-0"
                >
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-gray-100 text-gray-600">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-gray-100 text-gray-600">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {href && (
                    <Link href={href}>
                      <Button variant="default" size="sm" className="h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Chart section */}
          <div className="h-40 px-2 flex-grow">
            <AreaChart
              data={chartData}
              index="date"
              categories={["Price"]}
              colors={[chartColor]}
              showLegend={false}
              showXAxis={false}
              showYAxis={false}
              showGridLines={false}
              showTooltip={true}
              autoMinValue={true}
              curveType="monotone"
              className="h-40 w-full"
            />
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 divide-x border-t border-gray-200 mt-auto">
            <div className="p-4 text-center">
              <p className="text-xs text-gray-500">Price</p>
              <p className="text-base font-semibold text-gray-800 mt-1 truncate">
                {formatCurrency(stock.price)}
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-gray-500">Market Cap</p>
              <p className="text-base font-semibold text-gray-800 mt-1 truncate">
                {formatCompactNumber(stock.marketCap)}
              </p>
            </div>
          </div>
          
          {/* Additional info that appears on hover */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-200"
          >
            <div className="grid grid-cols-3 divide-x">
              <div className="p-3 text-center">
                <p className="text-xs text-gray-500">Volume</p>
                <p className="text-sm font-medium text-gray-800 truncate">
                  {(stock.volume / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-gray-500">High</p>
                <p className="text-sm font-medium text-gray-800 truncate">
                  {formatCurrency(highValue)}
                </p>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-gray-500">Low</p>
                <p className="text-sm font-medium text-gray-800 truncate">
                  {formatCurrency(lowValue)}
                </p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 text-center border-t border-gray-200">
              <p className="text-xs text-gray-500 truncate">
                {stock.sector} • {(stock.marketCap / 1000000000).toFixed(1)}B Market Cap
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}