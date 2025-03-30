// src/pages/portfolio.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DonutChart, BarChart, LineChart } from "@tremor/react";
import { motion } from "framer-motion";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { calculatePortfolioValue, calculateSectorAllocation } from "@/lib/stockData";
import { ArrowUp, ArrowDown, TrendingUp, Wallet, PieChart, Calendar, Filter, Download, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";

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
    
  // Sample performance data for the line chart
  const performanceData = [
    { date: "Jan", Portfolio: 1.8, Benchmark: 1.2 },
    { date: "Feb", Portfolio: 2.3, Benchmark: 1.9 },
    { date: "Mar", Portfolio: 2.1, Benchmark: 1.5 },
    { date: "Apr", Portfolio: 3.5, Benchmark: 2.7 },
    { date: "May", Portfolio: 3.2, Benchmark: 2.2 },
    { date: "Jun", Portfolio: 3.8, Benchmark: 2.6 },
    { date: "Jul", Portfolio: 5.2, Benchmark: 3.8 },
    { date: "Aug", Portfolio: 4.9, Benchmark: 3.5 },
    { date: "Sep", Portfolio: 4.5, Benchmark: 3.1 },
    { date: "Oct", Portfolio: 5.8, Benchmark: 4.2 },
    { date: "Nov", Portfolio: 6.2, Benchmark: 4.8 },
    { date: "Dec", Portfolio: 7.1, Benchmark: 5.3 },
  ];

  // Define custom chart colors
  const customColors = [
    "#4f46e5", // indigo-600
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#14b8a6", // teal-500
    "#f59e0b", // amber-500
    "#10b981", // emerald-500
    "#6366f1", // indigo-500
  ];

  return (
    <DashboardLayout title="Portfolio">
      <div className="space-y-6">
        <Card className="shadow-sm overflow-hidden bg-card border-border">
          <CardHeader className="border-b border-border bg-muted/20 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold">Portfolio Overview</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Track your investment performance and asset allocation</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg h-9 gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg h-9 gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <Tabs defaultValue="overview" className="w-full">
            <div className="px-6 pt-4 border-b border-border">
              <TabsList className="h-10 bg-muted">
                <TabsTrigger value="overview" className="px-4 rounded-lg">Overview</TabsTrigger>
                <TabsTrigger value="performance" className="px-4 rounded-lg">Performance</TabsTrigger>
                <TabsTrigger value="holdings" className="px-4 rounded-lg">Holdings</TabsTrigger>
              </TabsList>
            </div>
          
            <TabsContent value="overview" className="p-6">
              {/* Stats Row */}
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-2xl p-6 border border-border overflow-hidden bg-gradient-to-br from-white to-muted dark:from-muted/20 dark:to-black/20">
                    <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 opacity-10">
                      <div className="h-full w-full rounded-full bg-primary"></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                        <p className="text-2xl font-bold mt-1">{formatCurrency(portfolio.totalValue)}</p>
                        <div className="flex items-center mt-1">
                          <span className={cn(
                            "flex items-center gap-1 text-sm font-medium",
                            portfolio.totalGainLossPercent >= 0 
                              ? "text-green-600 dark:text-green-400" 
                              : "text-red-600 dark:text-red-400"
                          )}>
                            {portfolio.totalGainLossPercent >= 0 ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )}
                            {formatPercentage(Math.abs(portfolio.totalGainLossPercent))}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">all time</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="relative rounded-2xl p-6 border border-border overflow-hidden bg-gradient-to-br from-white to-muted dark:from-muted/20 dark:to-black/20">
                    <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 opacity-10">
                      <div className="h-full w-full rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Gain/Loss</p>
                        <p className="text-2xl font-bold mt-1">{formatCurrency(portfolio.totalGainLoss)}</p>
                        <div className="flex items-center mt-1">
                          <Badge 
                            variant={portfolio.totalGainLossPercent >= 0 ? "success" : "destructive"}
                            className="flex items-center gap-1"
                          >
                            {formatCurrency(portfolio.totalGainLoss)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="relative rounded-2xl p-6 border border-border overflow-hidden bg-gradient-to-br from-white to-muted dark:from-muted/20 dark:to-black/20">
                    <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 opacity-10">
                      <div className="h-full w-full rounded-full bg-amber-500"></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Cost Basis</p>
                        <p className="text-2xl font-bold mt-1">{formatCurrency(portfolio.totalCost)}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-muted-foreground">
                            {portfolio.holdings.length} stocks in portfolio
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Charts Row */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Sector Allocation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="border-border overflow-hidden h-full">
                    <CardHeader className="p-4 border-b border-border">
                      <CardTitle className="text-lg font-medium">Sector Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <DonutChart
                        data={allocationData}
                        category="value"
                        index="name"
                        valueFormatter={(value) => `${value.toFixed(1)}%`}
                        colors={customColors}
                        className="h-64"
                        showAnimation={true}
                        showLabel={false}
                      />
                      
                      <div className="mt-6 space-y-2">
                        {sectorAllocation.map((sector, i) => (
                          <div key={sector.sector} className="flex items-center justify-between py-2 border-b border-border last:border-none">
                            <div className="flex items-center">
                              <div 
                                className="h-3 w-3 rounded-full mr-3" 
                                style={{ backgroundColor: customColors[i % customColors.length] }}
                              />
                              <span className="text-sm font-medium">{sector.sector}</span>
                            </div>
                            <Badge variant="outline" className="font-medium">
                              {formatPercentage(sector.percentage)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Top Holdings */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Card className="border-border overflow-hidden h-full">
                    <CardHeader className="p-4 border-b border-border">
                      <CardTitle className="text-lg font-medium">Top Holdings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <BarChart
                        data={holdingsData}
                        index="name"
                        categories={["Value"]}
                        colors={["primary"]}
                        valueFormatter={(value) => formatCurrency(value)}
                        showLegend={false}
                        showGridLines={false}
                        showAnimation={true}
                        className="h-64"
                      />
                      
                      <div className="mt-6 space-y-2">
                        {portfolio.holdings
                          .sort((a, b) => b.currentValue - a.currentValue)
                          .slice(0, 5)
                          .map((holding, i) => (
                            <div key={holding.stockId} className="flex items-center justify-between py-2 border-b border-border last:border-none">
                              <div className="flex items-center">
                                <div 
                                  className="h-8 w-8 rounded-lg flex items-center justify-center mr-3"
                                  style={{ backgroundColor: `${holding.stock.color}20` }}
                                >
                                  <span className="text-xs font-bold" style={{ color: holding.stock.color }}>
                                    {holding.stock.symbol.slice(0, 2)}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium">{holding.stock.name}</p>
                                  <p className="text-xs text-muted-foreground">{holding.shares} shares</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatCurrency(holding.currentValue)}</p>
                                <div className={cn(
                                  "text-xs",
                                  holding.gainLoss >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                )}>
                                  {holding.gainLoss >= 0 ? "+" : ""}
                                  {formatPercentage(holding.gainLossPercent)}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="p-6">
              <div className="space-y-6">
                <Card className="border-border overflow-hidden">
                  <CardHeader className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">Portfolio Performance</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs">YTD</Button>
                        <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs">1Y</Button>
                        <Button variant="default" size="sm" className="h-8 rounded-lg text-xs">All Time</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80">
                      <LineChart
                        data={performanceData}
                        index="date"
                        categories={["Portfolio", "Benchmark"]}
                        colors={["primary", "slate"]}
                        valueFormatter={(value) => `${value.toFixed(1)}%`}
                        showLegend={true}
                        showAnimation={true}
                        className="h-80"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-border overflow-hidden">
                    <CardHeader className="p-4 border-b border-border">
                      <CardTitle className="text-lg font-medium">Monthly Returns (%)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <BarChart
                        data={performanceData}
                        index="date"
                        categories={["Portfolio"]}
                        colors={["primary"]}
                        valueFormatter={(value) => `${value.toFixed(1)}%`}
                        showLegend={false}
                        showAnimation={true}
                        className="h-64"
                      />
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border overflow-hidden">
                    <CardHeader className="p-4 border-b border-border">
                      <CardTitle className="text-lg font-medium">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-xl p-4 bg-muted/30">
                            <p className="text-sm text-muted-foreground">YTD Return</p>
                            <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">+18.32%</p>
                          </div>
                          <div className="rounded-xl p-4 bg-muted/30">
                            <p className="text-sm text-muted-foreground">1Y Return</p>
                            <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">+24.65%</p>
                          </div>
                          <div className="rounded-xl p-4 bg-muted/30">
                            <p className="text-sm text-muted-foreground">Volatility</p>
                            <p className="text-2xl font-bold mt-1">12.8%</p>
                          </div>
                          <div className="rounded-xl p-4 bg-muted/30">
                            <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                            <p className="text-2xl font-bold mt-1">1.92</p>
                          </div>
                          <div className="rounded-xl p-4 bg-muted/30">
                            <p className="text-sm text-muted-foreground">Alpha</p>
                            <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">+4.37%</p>
                          </div>
                          <div className="rounded-xl p-4 bg-muted/30">
                            <p className="text-sm text-muted-foreground">Beta</p>
                            <p className="text-2xl font-bold mt-1">0.84</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="holdings" className="p-0">
              <div className="border-b border-border p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg h-9 gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="default" size="sm" className="rounded-lg h-9">
                    Add Stock
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <select className="h-9 bg-muted rounded-lg text-sm px-3 border-border focus:ring-primary">
                    <option>Sort by Value</option>
                    <option>Sort by Performance</option>
                    <option>Sort by Name</option>
                  </select>
                </div>
              </div>
            
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr className="border-b border-border text-left text-sm">
                      <th className="px-6 py-4 font-medium text-muted-foreground">Stock</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground text-right">Shares</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground text-right">Avg. Cost</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground text-right">Current Price</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground text-right">Value</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground text-right">Gain/Loss</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {portfolio.holdings.map((holding, i) => (
                      <motion.tr 
                        key={holding.stockId}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        className="group hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="h-10 w-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${holding.stock.color}20` }}
                            >
                              <span className="text-xs font-bold" style={{ color: holding.stock.color }}>
                                {holding.stock.symbol.slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{holding.stock.name}</p>
                              <p className="text-xs text-muted-foreground">{holding.stock.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">{holding.shares}</td>
                        <td className="px-6 py-4 text-right font-medium">{formatCurrency(holding.averageCost)}</td>
                        <td className="px-6 py-4 text-right font-medium">{formatCurrency(holding.stock.price)}</td>
                        <td className="px-6 py-4 text-right font-bold">{formatCurrency(holding.currentValue)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end">
                            <span className={cn(
                              "font-medium",
                              holding.gainLoss >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            )}>
                              {holding.gainLoss >= 0 ? "+" : ""}
                              {formatCurrency(holding.gainLoss)}
                            </span>
                            <Badge 
                              variant={holding.gainLoss >= 0 ? "success" : "destructive"}
                              className="mt-1"
                            >
                              {holding.gainLoss >= 0 ? "+" : ""}
                              {formatPercentage(holding.gainLossPercent)}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 justify-end">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg">
                              <PieChart className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg">
                              <TrendingUp className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
}