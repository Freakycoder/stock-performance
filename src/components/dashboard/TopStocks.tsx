// src/components/dashboard/TopStocks.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { stocks } from "@/lib/stockData";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { AreaChart } from "@tremor/react";
import { Button } from "@/components/ui/button";

interface TopStocksProps {
  limit?: number;
}

export function TopStocks({ limit = 3 }: TopStocksProps) {
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
          className="flex items-center justify-between rounded-lg border p-4 transition-all duration-200 hover:shadow-md bg-card"
        >
          <div className="flex items-center gap-3">
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-full" 
              style={{ backgroundColor: `${stock.color}20` }}
            >
              <span className="text-sm font-semibold" style={{ color: stock.color }}>
                {stock.symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{stock.name}</p>
                <span className="text-xs text-muted-foreground">{stock.symbol}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-semibold">{formatCurrency(stock.price)}</span>
                <span className={cn(
                  "flex items-center text-xs font-medium",
                  stock.changePercent >= 0 ? "text-success" : "text-destructive"
                )}>
                  {stock.changePercent >= 0 ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {stock.changePercent >= 0 ? "+" : ""}
                  {formatPercentage(stock.changePercent)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-16 w-24">
              <AreaChart
                data={formatStockChart(stock.historicalData)}
                index="date"
                categories={["Price"]}
                colors={[stock.changePercent >= 0 ? "emerald" : "red"]}
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
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}