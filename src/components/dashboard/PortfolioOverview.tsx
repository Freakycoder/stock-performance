"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { calculatePortfolioValue } from "@/lib/stockData";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { DonutChart } from "@tremor/react";

export function PortfolioOverview() {
  const portfolio = calculatePortfolioValue();
  
  const stats = [
    {
      title: "Total Value",
      value: formatCurrency(portfolio.totalValue),
      change: portfolio.totalGainLossPercent,
      icon: Wallet,
    },
    {
      title: "Total Gain/Loss",
      value: formatCurrency(portfolio.totalGainLoss),
      change: portfolio.totalGainLossPercent,
      icon: TrendingUp,
    },
  ];

  // Prepare data for pie chart
  const pieData = portfolio.holdings?.map((holding) => ({
    name: holding?.stock.symbol,
    value: holding?.currentValue,
  })) || [];

  // Define sector colors
  const customColors = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#14b8a6", // teal
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-blue-50 px-6 py-5 dark:bg-blue-950/20">
        <CardTitle className="text-lg font-semibold">Portfolio Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-950 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <stat.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <div className="mt-1 flex items-center">
                  <div
                    className={cn(
                      "flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium",
                      stat.change >= 0
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                    )}
                  >
                    {stat.change >= 0 ? (
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                    )}
                    {formatPercentage(Math.abs(stat.change))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6">
          <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">Portfolio Breakdown</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DonutChart
              data={pieData}
              category="value"
              index="name"
              valueFormatter={(value) => formatCurrency(value)}
              colors={customColors}
              className="h-64 mt-4"
            />
          </motion.div>
        </div>
        
        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Holdings</p>
          {portfolio.holdings
            ?.sort((a, b) => b?.currentValue! - a?.currentValue!)
            .slice(0, 3)
            .map((holding, i) => (
              <motion.div
                key={holding?.stockId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center justify-between rounded-lg border p-3 dark:border-gray-800"
              >
                <div className="flex items-center">
                  <div 
                    className="mr-3 h-8 w-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${holding?.stock.color}20` }}
                  >
                    <span className="text-xs font-semibold" style={{ color: holding?.stock.color }}>
                      {holding?.stock.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{holding?.stock.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{holding?.shares} shares</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(holding?.currentValue!)}</p>
                  <div
                    className={cn(
                      "inline-flex items-center text-xs",
                      holding?.gainLoss! >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}
                  >
                    {holding?.gainLoss! >= 0 ? "+" : ""}
                    {formatPercentage(holding?.gainLossPercent!)}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 bg-white dark:bg-gray-950 dark:border-gray-800">
        <button className="flex w-full items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-500">
          View All Holdings
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </CardFooter>
    </Card>
  );
}