// src/pages/portfolio.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DonutChart, BarChart, LineChart } from "@tremor/react";
import { motion } from "framer-motion";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { calculatePortfolioValue, calculateSectorAllocation } from "@/lib/stockData";
import { ArrowUp, ArrowDown, TrendingUp, PieChart, BarChart3, Calendar, Filter, Download, Share2, Plus, ChevronRight, Sparkles, AlertTriangle, Info, Settings, Edit3, Eye, ExternalLink, Search, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PortfolioPage() {
  const portfolio = calculatePortfolioValue();
  const sectorAllocation = calculateSectorAllocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("YTD");

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
      <div className="space-y-8">
        {/* Header with portfolio summary and time range selector */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-800">Investment Portfolio</h1>
            <div className="flex items-center mt-1">
              <p className="text-gray-500">Total value:</p>
              <p className="ml-2 text-lg font-bold text-gray-800">{formatCurrency(portfolio.totalValue)}</p>
              <div className={cn(
                "flex items-center gap-0.5 ml-3 text-sm font-medium",
                portfolio.totalGainLossPercent >= 0
                  ? "text-green-600"
                  : "text-red-600"
              )}>
                {portfolio.totalGainLossPercent >= 0 ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                {portfolio.totalGainLossPercent >= 0 ? "+" : ""}
                {formatPercentage(Math.abs(portfolio.totalGainLossPercent))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <div className="relative inline-block text-left">
              <Button
                variant="outline"
                className="rounded-lg border-gray-200 text-gray-700 flex items-center gap-1.5"
              >
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{timeRange}</span>
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>

            <Button
              variant="outline"
              className="rounded-lg border-gray-200 text-gray-700 flex items-center gap-1.5"
            >
              <Download className="h-4 w-4 text-gray-500" />
              <span className="hidden sm:inline">Export</span>
            </Button>

            <Button
              variant="outline"
              className="rounded-lg border-gray-200 text-gray-700 flex items-center gap-1.5"
            >
              <Share2 className="h-4 w-4 text-gray-500" />
              <span className="hidden sm:inline">Share</span>
            </Button>

            <Button
              variant="default"
              className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Add Investment</span>
            </Button>
          </motion.div>
        </div>

        {/* Main analytics content with tabs */}
        <Card className="shadow-sm border-gray-200 bg-white overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 pt-6 border-b border-gray-200">
              <TabsList className="h-10 bg-transparent w-full sm:w-auto rounded-lg">
                <TabsTrigger value="overview" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">Overview</TabsTrigger>
                <TabsTrigger value="performance" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">Performance</TabsTrigger>
                <TabsTrigger value="holdings" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">Holdings</TabsTrigger>
                <TabsTrigger value="transactions" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">Transactions</TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6  space-y-6">
              {/* Stats Row */}
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-2xl p-6 border border-gray-200 overflow-hidden bg-gradient-to-br from-white to-gray-50">
                    <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 opacity-10">
                      <div className="h-full w-full rounded-full bg-blue-600"></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Value</p>
                        <p className="text-2xl font-bold mt-1 text-gray-800">{formatCurrency(portfolio.totalValue)}</p>
                        <div className="flex items-center mt-1">
                          <span className={cn(
                            "flex items-center gap-1 text-sm font-medium",
                            portfolio.totalGainLossPercent >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          )}>
                            {portfolio.totalGainLossPercent >= 0 ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )}
                            {formatPercentage(Math.abs(portfolio.totalGainLossPercent))}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">all time</span>
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
                  <div className="relative rounded-2xl p-6 border border-gray-200 overflow-hidden bg-gradient-to-br from-white to-gray-50">
                    <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 opacity-10">
                      <div className="h-full w-full rounded-full bg-green-600"></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Gain/Loss</p>
                        <p className="text-2xl font-bold mt-1 text-gray-800">{formatCurrency(portfolio.totalGainLoss)}</p>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant={portfolio.totalGainLossPercent >= 0 ? "success" : "destructive"}
                            className="flex items-center gap-1"
                            rounded="full"
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
                  <div className="relative rounded-2xl p-6 border border-gray-200 overflow-hidden bg-gradient-to-br from-white to-gray-50">
                    <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 opacity-10">
                      <div className="h-full w-full rounded-full bg-indigo-600"></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                        <BarChart3 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Annual Return</p>
                        <p className="text-2xl font-bold mt-1 text-gray-800">+18.4%</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="success" rounded="full">
                            +3.2% vs market
                          </Badge>
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
                  <Card className="border-gray-200 overflow-hidden h-full shadow-sm">
                    <CardHeader className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PieChart className="h-5 w-5 text-indigo-600" />
                          <CardTitle className="text-lg font-medium text-gray-800">Sector Allocation</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <Settings className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
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
                        {sectorAllocation.slice(0, 4).map((sector, i) => (
                          <div key={sector.sector} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-none">
                            <div className="flex items-center">
                              <div
                                className="h-3 w-3 rounded-full mr-3"
                                style={{ backgroundColor: customColors[i % customColors.length] }}
                              />
                              <span className="text-sm font-medium text-gray-700">{sector.sector}</span>
                            </div>
                            <Badge variant="outline" className="font-medium">
                              {formatPercentage(sector.percentage)}
                            </Badge>
                          </div>
                        ))}

                        {sectorAllocation.length > 4 && (
                          <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1 mt-2">
                            <span>View All Sectors</span>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
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
                  <Card className="border-gray-200 overflow-hidden h-full shadow-sm">
                    <CardHeader className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                          <CardTitle className="text-lg font-medium text-gray-800">Top Holdings</CardTitle>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-gray-200 text-gray-600 rounded-lg flex items-center gap-1.5"
                        >
                          <Filter className="h-3.5 w-3.5" />
                          Filter
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {portfolio.holdings
                          .sort((a, b) => b.currentValue - a.currentValue)
                          .slice(0, 5)
                          .map((holding, i) => (
                            <div key={holding.stockId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-none">
                              <div className="flex items-center">
                                <div
                                  className="h-9 w-9 rounded-lg flex items-center justify-center mr-3 shadow-sm"
                                  style={{ backgroundColor: `${holding.stock.color}15` }}
                                >
                                  <img className="rounded-lg" src={`${holding.logo}`}></img>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">{holding.stock.name}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-xs text-gray-500">{holding.shares} shares</p>
                                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                                    <p className="text-xs text-gray-500">Avg. {formatCurrency(holding.averageCost)}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-800">{formatCurrency(holding.currentValue)}</p>
                                <div className={cn(
                                  "text-xs mt-0.5",
                                  holding.gainLoss >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                )}>
                                  {holding.gainLoss >= 0 ? "+" : ""}
                                  {formatPercentage(holding.gainLossPercent)}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-4 justify-center rounded-lg border-gray-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        View All Holdings
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Insight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-gray-200 overflow-hidden shadow-sm bg-gradient-to-br from-amber-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 mt-1">
                            <AlertTriangle className="h-5 w-10" />
                          </div>
                          <h3 className="font-medium text-gray-800 text-lg">Concentration Risk</h3>
                        </div>
                        <div>
                          <p className="mt-1 text-gray-600">Your technology sector allocation is 60%, which represents high concentration risk.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 overflow-hidden shadow-sm bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 mt-1">
                            <Sparkles className="h-5 w-10" />
                          </div>
                          <h3 className="font-medium text-gray-800 text-lg">Opportunity Detected</h3>
                        </div>
                        <div>
                          <p className="mt-1 text-gray-600">Market dip in healthcare sector presents buying opportunity for diversification.</p>

                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 overflow-hidden shadow-sm bg-gradient-to-br from-green-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col gap-2">

                        <div className="flex gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 mt-1">
                            <Info className="h-5 w-10" />
                          </div>
                          <h3 className="font-medium text-gray-800 text-lg">Performance Insight</h3>
                        </div>
                        <div>
                          <p className="mt-1 text-gray-600">Your portfolio is outperforming the S&P 500 by 3.2% YTD, with lower volatility.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="p-6 space-y-6">
              <div className="space-y-6">
                <Card className="border-gray-200 shadow-sm bg-white">
                  <CardHeader className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-lg font-medium text-gray-800">Portfolio Performance</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs border-gray-200">YTD</Button>
                        <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs border-gray-200">1Y</Button>
                        <Button variant="default" size="sm" className="h-8 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-700">All Time</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80">
                      <LineChart
                        data={performanceData}
                        index="date"
                        categories={["Portfolio", "Benchmark"]}
                        colors={["blue", "gray"]}
                        valueFormatter={(value) => `${value.toFixed(1)}%`}
                        showLegend={true}
                        showAnimation={true}
                        className="h-80"
                      />
                    </div>

                    <div className="mt-6 flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-gray-800">Outperforming the Market</h3>
                          <p className="text-sm text-gray-600 mt-1">Your portfolio is outperforming the benchmark by 2.3% over the selected period.</p>
                        </div>
                      </div>
                      <Button variant="outline" className="ml-4 border-blue-200 text-blue-600 hover:bg-blue-100 rounded-lg shrink-0">
                        View Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-gray-200 shadow-sm bg-white">
                    <CardHeader className="p-4 border-b border-gray-200 bg-gray-50">
                      <CardTitle className="text-lg font-medium text-gray-800">Monthly Returns (%)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="h-64">
                        <BarChart
                          data={performanceData}
                          index="date"
                          categories={["Portfolio"]}
                          colors={["blue"]}
                          valueFormatter={(value) => `${value.toFixed(1)}%`}
                          showLegend={false}
                          showAnimation={true}
                          className="h-64"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200 shadow-sm bg-white">
                    <CardHeader className="p-4 border-b border-gray-200 bg-gray-50">
                      <CardTitle className="text-lg font-medium text-gray-800">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-800">Sharpe Ratio</h3>
                            <span className="font-semibold text-blue-600">1.86</span>
                          </div>
                          <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: '74%' }}></div>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">Higher than 67% of similar portfolios</p>
                        </div>

                        <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-800">Alpha</h3>
                            <span className="font-semibold text-green-600">+3.24%</span>
                          </div>
                          <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">Excess return relative to benchmark</p>
                        </div>

                        <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-800">Beta</h3>
                            <span className="font-semibold text-gray-800">0.92</span>
                          </div>
                          <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">Slightly less volatile than the market</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Holdings Tab */}
            <TabsContent value="holdings" className="p-0">
              <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search holdings..."
                      className="pl-9 h-10 w-full sm:w-[260px] rounded-xl border-gray-200"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg h-10 border-gray-200 flex items-center gap-1.5">
                    <Filter className="h-4 w-4 text-gray-500" />
                    Filter
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg h-10 border-gray-200">
                    Import
                  </Button>
                  <Button variant="default" size="sm" className="rounded-lg h-10 bg-blue-600 text-white hover:bg-blue-700">
                    Add Stock
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-200 text-left text-sm">
                      <th className="px-6 py-4 font-medium text-gray-500">Stock</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-right">Shares</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-right">Avg. Cost</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-right">Current Price</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-right">Value</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-right">Gain/Loss</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {portfolio.holdings.map((holding, i) => (
                      <motion.tr
                        key={holding.stockId}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        className="group hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-10 bg-white w-12 rounded-lg flex items-center justify-center shadow-sm"
                              style={{ backgroundColor: `${holding.stock.color}15` }}
                            >
                              <img className="rounded-lg" src={`${holding.logo}`}></img>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{holding.stock.name}</p>
                              <p className="text-xs text-gray-500">{holding.stock.symbol} • {holding.stock.sector}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-800">{holding.shares}</td>
                        <td className="px-6 py-4 text-right font-medium text-gray-800">{formatCurrency(holding.averageCost)}</td>
                        <td className="px-6 py-4 text-right font-medium text-gray-800">{formatCurrency(holding.stock.price)}</td>
                        <td className="px-6 py-4 text-right font-bold text-gray-800">{formatCurrency(holding.currentValue)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end">
                            <span className={cn(
                              "font-medium",
                              holding.gainLoss >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            )}>
                              {holding.gainLoss >= 0 ? "+" : ""}
                              {formatCurrency(holding.gainLoss)}
                            </span>
                            <Badge
                              variant={holding.gainLoss >= 0 ? "success" : "destructive"}
                              className="mt-1"
                              size="sm"
                              rounded="full"
                            >
                              {holding.gainLoss >= 0 ? "+" : ""}
                              {formatPercentage(holding.gainLossPercent)}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 justify-end">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                              <ExternalLink className="h-4 w-4" />
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