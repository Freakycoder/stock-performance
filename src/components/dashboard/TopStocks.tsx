// src/components/dashboard/TopStocks.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ExternalLink, Sparkles } from "lucide-react";
import { stocks } from "@/lib/stockData";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { AreaChart } from "@tremor/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/Badge";

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
    <Card className="overflow-hidden bg-card border-border shadow-sm h-full">
      <CardHeader className="p-6 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Top Performers</CardTitle>
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {topGainers.map((stock, i) => (
            <motion.div 
              key={stock.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center justify-between p-5 hover:bg-muted/20 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0" 
                  style={{ backgroundColor: `${stock.color}20` }}
                >
                  <span className="text-base font-bold" style={{ color: stock.color }}>
                    {stock.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-base line-clamp-1">{stock.name}</p>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">{stock.symbol}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold">{formatCurrency(stock.price)}</span>
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
                <div className="h-16 w-24 hidden md:block">
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
                <Link href={`/market/${stock.id}`}>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-4 border-t border-border bg-muted/10">
          <Link href="/market">
            <Button variant="outline" className="w-full rounded-lg justify-center">
              View All Stocks
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}