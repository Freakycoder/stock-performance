"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { StockData } from "@/lib/stockData";
import { cn, formatCompactNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import { AreaChart } from "@tremor/react";

interface StockPerformanceCardProps {
  stock: StockData;
  animationDelay?: number;
}

export function StockPerformanceCard({ stock, animationDelay = 0 }: StockPerformanceCardProps) {
  // Format data for Tremor chart
  const chartData = stock.historicalData.slice(-30).map((data : any) => ({
    date: data.date,
    Price: data.price,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-full" 
                style={{ backgroundColor: `${stock.color}20` }}
              >
                <span 
                  className="text-sm font-semibold" 
                  style={{ color: stock.color }}
                >
                  {stock.symbol.slice(0, 2)}
                </span>
              </div>
              <div>
                <CardTitle className="text-base font-semibold">{stock.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{stock.symbol}</p>
              </div>
            </div>
            <div 
              className={cn(
                "flex items-center rounded-full px-2 py-1 text-xs font-medium",
                stock.changePercent >= 0
                  ? "bg-profit-100 text-profit-700 dark:bg-profit-900 dark:text-profit-300"
                  : "bg-loss-100 text-loss-700 dark:bg-loss-900 dark:text-loss-300"
              )}
            >
              {stock.changePercent >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {stock.changePercent >= 0 ? "+" : ""}
              {formatPercentage(stock.changePercent)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-32">
            <AreaChart
              data={chartData}
              index="date"
              categories={["Price"]}
              colors={[stock.changePercent >= 0 ? "emerald" : "red"]}
              showLegend={false}
              showXAxis={false}
              showYAxis={false}
              showGridLines={false}
              showTooltip={true}
              autoMinValue={true}
              curveType="monotone"
              className="h-32"
            />
          </div>
          <div className="grid grid-cols-2 divide-x border-t">
            <div className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-base font-semibold">
                {formatCurrency(stock.price)}
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Market Cap</p>
              <p className="text-base font-semibold">
                {formatCompactNumber(stock.marketCap)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}