// src/pages/portfolio.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DonutChart, BarChart } from "@tremor/react";
import { motion } from "framer-motion";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { calculatePortfolioValue, calculateSectorAllocation } from "@/lib/stockData";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function PortfolioPage() {
  const portfolio = calculatePortfolioValue();
  const sectorAllocation = calculateSectorAllocation();
  
  // Format data for charts
  const allocationData = sectorAllocation.map(item => ({
    name: item.sector,
    value: item.percentage,
  }));
  
  // Format data for holdings bar chart
  const holdingsData = portfolio.holdings
    .sort((a, b) => b.currentValue - a.currentValue)
    .map(holding => ({
      name: holding.stock.symbol,
      "Value": holding.currentValue,
    }));

  return (
    <DashboardLayout title="Portfolio">
      <div className="space-y-6">
        <Card className="shadow-sm overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <CardHeader className="border-b bg-gray-50 dark:bg-gray-900/60 p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio Overview</CardTitle>
              <Tabs defaultValue="overview" className="w-full sm:w-auto">
                <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:flex bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Overview</TabsTrigger>
                  <TabsTrigger value="performance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Performance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-5">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                      <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{formatCurrency(portfolio.totalValue)}</p>
                      <div className="flex items-center mt-1 text-sm">
                        <span className={cn(
                          "flex items-center gap-1",
                          portfolio.totalGainLossPercent >= 0 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-red-600 dark:text-red-400"
                        )}>
                          {portfolio.totalGainLossPercent >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          {formatPercentage(Math.abs(portfolio.totalGainLossPercent))}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">all time</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Gain/Loss</p>
                      <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{formatCurrency(portfolio.totalGainLoss)}</p>
                      <div className="flex items-center mt-1 text-sm">
                        <span className={cn(
                          "flex items-center gap-1",
                          portfolio.totalGainLossPercent >= 0 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-red-600 dark:text-red-400"
                        )}>
                          {formatCurrency(portfolio.totalGainLoss)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Cost Basis</p>
                      <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{formatCurrency(portfolio.totalCost)}</p>
                      <div className="flex items-center mt-1 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          {portfolio.holdings.length} stocks in portfolio
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-6 mt-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Sector Allocation</h3>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <DonutChart
                          data={allocationData}
                          category="value"
                          index="name"
                          valueFormatter={(value) => `${value.toFixed(1)}%`}
                          colors={["#3b82f6", "#8b5cf6", "#14b8a6", "#f43f5e", "#0ea5e9", "#22c55e", "#eab308"]}
                          className="h-64"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Top Holdings</h3>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <BarChart
                          data={holdingsData}
                          index="name"
                          categories={["Value"]}
                          colors={["#3b82f6"]}
                          valueFormatter={(value) => formatCurrency(value)}
                          showLegend={false}
                          showGridLines={false}
                          className="h-64"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Holdings</h3>
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 dark:bg-gray-900/60">
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Stock</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Shares</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Cost</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Current Price</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Value</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Gain/Loss</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {portfolio.holdings.map((holding, i) => (
                              <motion.tr 
                                key={holding.stockId}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: i * 0.05 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                              >
                                <td className="px-4 py-3">
                                  <div className="flex items-center">
                                    <div 
                                      className="h-8 w-8 rounded-full flex items-center justify-center mr-3"
                                      style={{ backgroundColor: `${holding.stock.color}20` }}
                                    >
                                      <span className="text-xs font-medium" style={{ color: holding.stock.color }}>
                                        {holding.stock.symbol.slice(0, 2)}
                                      </span>
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900 dark:text-white">{holding.stock.name}</p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">{holding.stock.symbol}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-right text-gray-900 dark:text-white">{holding.shares}</td>
                                <td className="px-4 py-3 text-right text-gray-900 dark:text-white">{formatCurrency(holding.averageCost)}</td>
                                <td className="px-4 py-3 text-right text-gray-900 dark:text-white">{formatCurrency(holding.stock.price)}</td>
                                <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">{formatCurrency(holding.currentValue)}</td>
                                <td className="px-4 py-3 text-right">
                                  <div className={cn(
                                    "inline-flex items-center gap-1 font-medium",
                                    holding.gainLoss >= 0
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  )}>
                                    {holding.gainLoss >= 0 ? "+" : ""}
                                    {formatCurrency(holding.gainLoss)}
                                    <span className="text-xs">
                                      ({holding.gainLoss >= 0 ? "+" : ""}{holding.gainLossPercent.toFixed(2)}%)
                                    </span>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="mt-5">
                  <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">
                      Performance charts will be displayed here.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  );
}