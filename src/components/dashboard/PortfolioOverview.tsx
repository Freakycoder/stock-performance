"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, ChevronRight, Info } from "lucide-react";
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
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Gain/Loss",
      value: formatCurrency(portfolio.totalGainLoss),
      change: portfolio.totalGainLossPercent,
      icon: TrendingUp,
      bgColor: portfolio.totalGainLoss >= 0 ? "bg-green-50" : "bg-red-50",
      iconColor: portfolio.totalGainLoss >= 0 ? "text-green-600" : "text-red-600",
    },
  ];

  // Prepare data for pie chart
  const pieData = portfolio.holdings?.map((holding) => ({
    name: holding?.stock.symbol,
    value: holding?.currentValue,
  })) || [];

  // Define custom colors
  const customColors = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#14b8a6", // teal
  ];

  // Calculate asset allocation percentages
  const totalValue = portfolio.totalValue;
  const assetAllocation = portfolio.holdings.reduce((acc, holding) => {
    const sector = holding.stock.sector;
    if (!acc[sector]) {
      acc[sector] = 0;
    }
    acc[sector] += holding.currentValue;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="overflow-hidden border-gray-200 shadow-sm bg-white">
      <CardHeader className="bg-gray-50 px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">Portfolio Overview</CardTitle>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100"
          >
            <Info className="h-3.5 w-3.5" />
            <span>Details</span>
          </motion.button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={cn("rounded-xl border border-gray-100 p-4 shadow-sm", stat.bgColor)}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-800">{stat.value}</p>
                <div className="mt-2 flex items-center">
                  <div
                    className={cn(
                      "flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      stat.change >= 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {stat.change >= 0 ? (
                      <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
                    )}
                    {formatPercentage(Math.abs(stat.change))}
                  </div>
                  <span className="ml-1.5 text-xs text-gray-500">vs. initial investment</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="mb-4 text-base font-medium text-gray-700">Portfolio Breakdown</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DonutChart
                data={pieData}
                category="value"
                index="name"
                valueFormatter={(value) => formatCurrency(value)}
                colors={customColors}
                className="h-60"
                showAnimation={true}
              />
            </motion.div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Asset Allocation</h4>
              {Object.entries(assetAllocation).map(([sector, value], i) => {
                const percentage = (value / totalValue) * 100;
                return (
                  <motion.div
                    key={sector}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-3 w-3 rounded-full" 
                          style={{ backgroundColor: customColors[i % customColors.length] }}
                        ></div>
                        <span className="font-medium text-gray-700">{sector}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">{formatCurrency(value)}</span>
                        <span className="font-medium text-gray-700 bg-gray-100 rounded-full px-2 py-0.5 text-xs">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <motion.div 
                        className="h-full rounded-full" 
                        style={{ 
                          backgroundColor: customColors[i % customColors.length],
                          width: `${percentage}%` 
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <h3 className="text-base font-medium text-gray-700">Top Holdings</h3>
          {portfolio.holdings
            ?.sort((a, b) => b?.currentValue! - a?.currentValue!)
            .slice(0, 3)
            .map((holding, i) => (
              <motion.div
                key={holding?.stockId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="flex items-center">
                  <div 
                    className="mr-4 h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${holding?.stock.color}15` }}
                  >
                    <span className="text-sm font-bold" style={{ color: holding?.stock.color }}>
                      {holding?.stock.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{holding?.stock.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-gray-500">{holding?.shares} shares</p>
                      <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                      <p className="text-xs text-gray-500">Avg. {formatCurrency(holding?.averageCost!)}/share</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{formatCurrency(holding?.currentValue!)}</p>
                  <div
                    className={cn(
                      "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium mt-0.5",
                      holding?.gainLoss! >= 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    )}
                  >
                    {holding?.gainLoss! >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {holding?.gainLoss! >= 0 ? "+" : ""}
                    {formatPercentage(holding?.gainLossPercent!)}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-200 p-4 bg-white">
        <button className="flex w-full items-center justify-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          View All Holdings
          <ChevronRight className="h-4 w-4" />
        </button>
      </CardFooter>
    </Card>
  );
}