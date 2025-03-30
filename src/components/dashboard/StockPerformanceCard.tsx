// src/components/dashboard/StockPerformanceCard.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, ExternalLink } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { StockData } from "@/lib/stockData";
import { cn, formatCompactNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import { AreaChart } from "@tremor/react";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

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
  // Format data for Tremor chart
  const chartData = stock.historicalData.slice(-30).map((data : any) => ({
    date: data.date,
    Price: data.price,
  }));

  const isPositive = stock.changePercent >= 0;
  const chartColor = isPositive ? "emerald" : "rose";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      whileHover={{ translateY: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden border-border bg-card h-full">
        <CardContent className="p-0">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-xl" 
                  style={{ backgroundColor: `${stock.color}20` }}
                >
                  <span 
                    className="text-base font-semibold" 
                    style={{ color: stock.color }}
                  >
                    {stock.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{stock.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-muted-foreground">{stock.symbol}</span>
                    <Badge variant={isPositive ? "success" : "destructive"} className="h-5 flex items-center gap-0.5">
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {isPositive ? "+" : ""}{formatPercentage(stock.changePercent)}
                    </Badge>
                  </div>
                </div>
              </div>
              {href && (
                <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          <div className="h-40 px-2">
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
              className="h-40"
            />
          </div>

          <div className="grid grid-cols-2 divide-x border-t border-border">
            <div className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-base font-semibold mt-1">
                {formatCurrency(stock.price)}
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Market Cap</p>
              <p className="text-base font-semibold mt-1">
                {formatCompactNumber(stock.marketCap)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}