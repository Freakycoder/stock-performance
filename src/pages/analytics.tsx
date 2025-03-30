// src/pages/analytics.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart, LineChart, DonutChart, AreaChart } from "@tremor/react";
import { ChevronDown, Share2, Download, ChevronRight, Calendar, ArrowUpRight, ArrowDownRight, TrendingUp, PieChart, BarChart3, Zap, AlertTriangle, Info, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<"1M" | "3M" | "6M" | "1Y" | "YTD" | "All">("YTD");

    // Sample data for charts
    const performanceData = [
        { date: "Jan", Return: 2.5, Benchmark: 1.8 },
        { date: "Feb", Return: 1.1, Benchmark: 0.7 },
        { date: "Mar", Return: -1.4, Benchmark: -2.1 },
        { date: "Apr", Return: 3.2, Benchmark: 2.3 },
        { date: "May", Return: 1.9, Benchmark: 0.8 },
        { date: "Jun", Return: -0.6, Benchmark: -0.3 },
        { date: "Jul", Return: 4.2, Benchmark: 3.1 },
        { date: "Aug", Return: 2.8, Benchmark: 2.5 },
        { date: "Sep", Return: -2.1, Benchmark: -1.7 },
        { date: "Oct", Return: 1.8, Benchmark: 1.1 },
        { date: "Nov", Return: 5.3, Benchmark: 4.2 },
        { date: "Dec", Return: 3.7, Benchmark: 2.9 },
    ];

    const riskData = [
        { category: "Low Risk", value: 30 },
        { category: "Medium Risk", value: 45 },
        { category: "High Risk", value: 25 },
    ];

    const sectorPerformanceData = [
        { sector: "Technology", performance: 18.4 },
        { sector: "Healthcare", performance: 12.8 },
        { sector: "Finance", performance: 7.3 },
        { sector: "Consumer", performance: -4.2 },
        { sector: "Energy", performance: -8.7 },
    ];

    // Monthly performance data for area chart
    const monthlyPerformance = [
        { date: "Jan", value: 2.5 },
        { date: "Feb", value: 3.6 },
        { date: "Mar", value: 2.2 },
        { date: "Apr", value: 5.4 },
        { date: "May", value: 7.3 },
        { date: "Jun", value: 6.7 },
        { date: "Jul", value: 10.9 },
        { date: "Aug", value: 13.7 },
        { date: "Sep", value: 11.6 },
        { date: "Oct", value: 13.4 },
        { date: "Nov", value: 18.7 },
        { date: "Dec", value: 22.4 },
    ];

    const keyMetrics = [
        {
            title: "Portfolio Return",
            value: "+18.4%",
            change: 3.2,
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Sharpe Ratio",
            value: "1.86",
            change: 0.24,
            icon: Zap,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Volatility",
            value: "12.4%",
            change: -1.8,
            icon: AlertTriangle,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
        },
        {
            title: "Alpha",
            value: "+4.2%",
            change: 1.1,
            icon: PieChart,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
    ];

    return (
        <DashboardLayout title="Analytics">
            <div className="space-y-8">
                {/* Header with time range selector */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-2xl font-bold text-gray-800">Portfolio Analytics</h1>
                        <p className="mt-1 text-gray-500">Track performance, risk, and allocation metrics</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="relative inline-block text-left">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg border-gray-200 text-gray-700 flex items-center gap-1.5 h-9"
                            >
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>{timeRange}</span>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </Button>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-gray-200 text-gray-700 h-9 w-9 p-0"
                        >
                            <Download className="h-4 w-4 text-gray-500" />
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-gray-200 text-gray-700 h-9 w-9 p-0"
                        >
                            <Share2 className="h-4 w-4 text-gray-500" />
                        </Button>
                    </motion.div>
                </div>

                {/* Key metrics section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {keyMetrics.map((metric, i) => (
                        <motion.div
                            key={metric.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full transition-all duration-200 hover:shadow-md">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 opacity-[0.07] rounded-full bg-blue-600 blur-2xl"></div>

                                <div className="relative flex items-center gap-4">
                                    <div className="flex flex-col">

                                        <div className="flex items-center gap-3">
                                            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", metric.bgColor)}>
                                                <metric.icon className={cn("h-6 w-6", metric.color)} />
                                            </div>
                                            <p className="text-md font-medium text-gray-500">{metric.title}</p>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="mt-1 truncate text-2xl font-bold text-gray-800">{metric.value}</p>
                                            <div className="flex items-center mt-1.5">
                                                <span
                                                    className={cn(
                                                        "flex items-center text-xs font-medium gap-0.5 rounded-full px-2 py-0.5",
                                                        metric.change >= 0
                                                            ? "text-green-700 bg-green-50"
                                                            : "text-red-700 bg-red-50"
                                                    )}
                                                >
                                                    {metric.change >= 0 ? (
                                                        <ArrowUpRight className="h-3 w-3" />
                                                    ) : (
                                                        <ArrowDownRight className="h-3 w-3" />
                                                    )}
                                                    {metric.change >= 0 ? "+" : ""}
                                                    {Math.abs(metric.change).toFixed(2)}
                                                </span>
                                                <span className="text-xs text-gray-500 ml-1.5">vs. benchmark</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main analytics content with tabs */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <Tabs defaultValue="performance" className="w-full">
                        <div className="px-6 pt-6 border-b border-gray-200 bg-gray-50">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                <TabsList className="h-10 bg-gray-100 w-full sm:w-auto rounded-lg">
                                    <TabsTrigger value="performance" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">Performance</TabsTrigger>
                                    <TabsTrigger value="risk" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">Risk & Return</TabsTrigger>
                                    <TabsTrigger value="sectors" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">Sectors</TabsTrigger>
                                </TabsList>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-9 rounded-lg flex items-center gap-1.5 border-gray-200"
                                    >
                                        <Info className="h-4 w-4 text-gray-500" />
                                        <span>Compare</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <TabsContent value="performance" className="p-6 space-y-6">
                            <Card className="shadow-sm border-gray-200 bg-white">
                                <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-2 text-white">
                                                <TrendingUp className="h-5 w-5" />
                                            </div>
                                            <CardTitle className="text-lg font-medium text-gray-800">Performance Metrics</CardTitle>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                                                <span className="text-sm text-gray-600">Your Portfolio</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                                                <span className="text-sm text-gray-600">Benchmark</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="h-72">
                                        <LineChart
                                            data={performanceData}
                                            index="date"
                                            categories={["Return", "Benchmark"]}
                                            colors={["blue", "gray"]}
                                            valueFormatter={(value) => `${value.toFixed(1)}%`}
                                            showLegend={false}
                                            showGridLines={true}
                                            curveType="monotone"
                                            className="h-72"
                                        />
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <p className="text-xs font-medium text-gray-500">YTD Return</p>
                                            <div className="flex items-baseline gap-1">
                                                <p className="mt-1 text-xl font-semibold text-green-600">+18.4%</p>
                                                <span className="text-xs text-green-600">+2.3%</span>
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <p className="text-xs font-medium text-gray-500">1Y Return</p>
                                            <div className="flex items-baseline gap-1">
                                                <p className="mt-1 text-xl font-semibold text-green-600">+22.6%</p>
                                                <span className="text-xs text-green-600">+4.1%</span>
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <p className="text-xs font-medium text-gray-500">Best Month</p>
                                            <div className="flex items-baseline gap-1">
                                                <p className="mt-1 text-xl font-semibold text-gray-800">Nov</p>
                                                <span className="text-xs text-green-600">+5.3%</span>
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <p className="text-xs font-medium text-gray-500">Worst Month</p>
                                            <div className="flex items-baseline gap-1">
                                                <p className="mt-1 text-xl font-semibold text-gray-800">Mar</p>
                                                <span className="text-xs text-red-600">-1.4%</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid gap-6 md:grid-cols-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <Card className="shadow-sm border-gray-200 bg-white h-full">
                                        <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 p-2 text-white">
                                                        <BarChart3 className="h-5 w-5" />
                                                    </div>
                                                    <CardTitle className="text-lg font-medium text-gray-800">Monthly Returns</CardTitle>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="h-64">
                                                <BarChart
                                                    data={performanceData}
                                                    index="date"
                                                    categories={["Return"]}
                                                    colors={["blue"]}
                                                    valueFormatter={(value) => `${value.toFixed(1)}%`}
                                                    showLegend={false}
                                                    className="h-64"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <Card className="shadow-sm border-gray-200 bg-white h-full">
                                        <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 p-2 text-white">
                                                        <PieChart className="h-5 w-5" />
                                                    </div>
                                                    <CardTitle className="text-lg font-medium text-gray-800">Return Distribution</CardTitle>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="h-64">
                                                <DonutChart
                                                    data={[
                                                        { range: "< 0%", value: 20, color: "#ef4444" },
                                                        { range: "0-2%", value: 25, color: "#f59e0b" },
                                                        { range: "2-5%", value: 35, color: "#3b82f6" },
                                                        { range: "> 5%", value: 20, color: "#10b981" },
                                                    ]}
                                                    index="range"
                                                    category="value"
                                                    valueFormatter={(value) => `${value}%`}
                                                    colors={["rose", "amber", "blue", "emerald"]}
                                                    className="h-64"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>

                            <Card className="shadow-sm border-gray-200 bg-white">
                                <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="text-lg font-medium text-gray-800">Cumulative Growth</CardTitle>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-lg border-gray-200 text-blue-600 hover:bg-blue-50 text-sm"
                                        >
                                            Export Data
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="h-72">
                                        <AreaChart
                                            data={monthlyPerformance}
                                            index="date"
                                            categories={["value"]}
                                            colors={["blue"]}
                                            valueFormatter={(value) => `${value.toFixed(1)}%`}
                                            showLegend={false}
                                            showGridLines={true}
                                            className="h-72"
                                        />
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <Button
                                            variant="ghost"
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1"
                                        >
                                            View Detailed Analysis
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="risk" className="p-6 space-y-6">
                            <Card className="shadow-sm border-gray-200 bg-white">
                                <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 p-2 text-white">
                                                <AlertTriangle className="h-5 w-5" />
                                            </div>
                                            <CardTitle className="text-lg font-medium text-gray-800">Risk Assessment</CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid md:grid-cols-2 gap-6 items-center">
                                        <div className="h-72">
                                            <DonutChart
                                                data={riskData}
                                                index="category"
                                                category="value"
                                                valueFormatter={(value) => `${value}%`}
                                                colors={["emerald", "amber", "rose"]}
                                                className="h-72"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="rounded-lg border border-gray-200 p-4">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                                        <h3 className="font-medium text-gray-800">Low Risk Assets</h3>
                                                    </div>
                                                    <span className="font-semibold text-gray-800">30%</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">Primarily government bonds and high-quality corporate bonds with stable returns.</p>
                                            </div>

                                            <div className="rounded-lg border border-gray-200 p-4">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                                        <h3 className="font-medium text-gray-800">Medium Risk Assets</h3>
                                                    </div>
                                                    <span className="font-semibold text-gray-800">45%</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">Balanced mix of blue-chip stocks, REITs, and medium-term bonds with moderate growth potential.</p>
                                            </div>

                                            <div className="rounded-lg border border-gray-200 p-4">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                                                        <h3 className="font-medium text-gray-800">High Risk Assets</h3>
                                                    </div>
                                                    <span className="font-semibold text-gray-800">25%</span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">Growth-oriented stocks, emerging markets, and alternative investments with higher volatility.</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="shadow-sm border-gray-200 bg-white">
                                    <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
                                        <CardTitle className="text-lg font-medium text-gray-800">Risk Metrics</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-medium text-gray-800">Sharpe Ratio</h3>
                                                    <span className="font-semibold text-blue-600">1.86</span>
                                                </div>
                                                <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '74%' }}></div>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-500">Higher than 67% of similar portfolios</p>
                                            </div>

                                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-medium text-gray-800">Beta</h3>
                                                    <span className="font-semibold text-gray-800">0.92</span>
                                                </div>
                                                <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '92%' }}></div>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-500">Slightly less volatile than the market</p>
                                            </div>

                                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-medium text-gray-800">Maximum Drawdown</h3>
                                                    <span className="font-semibold text-red-600">-12.4%</span>
                                                </div>
                                                <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-red-600 rounded-full" style={{ width: '38%' }}></div>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-500">Better than 62% of similar portfolios</p>
                                            </div>

                                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-medium text-gray-800">Sortino Ratio</h3>
                                                    <span className="font-semibold text-green-600">2.14</span>
                                                </div>
                                                <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-600 rounded-full" style={{ width: '85%' }}></div>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-500">Higher than 85% of similar portfolios</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="shadow-sm border-gray-200 bg-white">
                                    <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
                                        <CardTitle className="text-lg font-medium text-gray-800">Portfolio Volatility</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="h-64">
                                            <LineChart
                                                data={[
                                                    { date: "Jan", Portfolio: 9.8, Benchmark: 12.4 },
                                                    { date: "Feb", Portfolio: 10.2, Benchmark: 14.1 },
                                                    { date: "Mar", Portfolio: 12.5, Benchmark: 15.6 },
                                                    { date: "Apr", Portfolio: 11.3, Benchmark: 13.9 },
                                                    { date: "May", Portfolio: 10.8, Benchmark: 12.7 },
                                                    { date: "Jun", Portfolio: 9.7, Benchmark: 11.5 },
                                                    { date: "Jul", Portfolio: 8.9, Benchmark: 10.8 },
                                                    { date: "Aug", Portfolio: 9.4, Benchmark: 12.3 },
                                                    { date: "Sep", Portfolio: 11.2, Benchmark: 14.1 },
                                                    { date: "Oct", Portfolio: 10.5, Benchmark: 13.4 },
                                                    { date: "Nov", Portfolio: 9.8, Benchmark: 11.9 },
                                                    { date: "Dec", Portfolio: 8.7, Benchmark: 10.2 },
                                                ]}
                                                index="date"
                                                categories={["Portfolio", "Benchmark"]}
                                                colors={["blue", "gray"]}
                                                valueFormatter={(value) => `${value.toFixed(1)}%`}
                                                showLegend={false}
                                                className="h-64"
                                            />
                                        </div>

                                        <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 p-4">
                                            <div className="flex items-start gap-3">
                                                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                                                <div>
                                                    <h3 className="font-medium text-gray-800">Lower Volatility</h3>
                                                    <p className="mt-1 text-sm text-gray-600">Your portfolio shows consistently lower volatility than the benchmark, indicating better risk-adjusted returns.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="sectors" className="p-6 space-y-6">
                            <Card className="shadow-sm border-gray-200 bg-white">
                                <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 p-2 text-white">
                                                <BarChart3 className="h-5 w-5" />
                                            </div>
                                            <CardTitle className="text-lg font-medium text-gray-800">Sector Performance</CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="h-72">
                                        <BarChart
                                            data={sectorPerformanceData}
                                            index="sector"
                                            categories={["performance"]}
                                            colors={["blue"]}
                                            valueFormatter={(value) => `${value.toFixed(1)}%`}
                                            showLegend={false}
                                            className="h-72"
                                        />
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        {sectorPerformanceData.map((sector, i) => (
                                            <div
                                                key={sector.sector}
                                                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                                                        style={{
                                                            backgroundColor: sector.performance >= 0 ? "#e0f2fe" : "#fee2e2",
                                                            color: sector.performance >= 0 ? "#0284c7" : "#dc2626"
                                                        }}
                                                    >
                                                        {sector.performance >= 0 ? (
                                                            <TrendingUp className="h-5 w-5" />
                                                        ) : (
                                                            <TrendingDown className="h-5 w-5" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{sector.sector}</p>
                                                        <p className="text-xs text-gray-500">12 holdings</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p
                                                            className={cn(
                                                                "font-semibold",
                                                                sector.performance >= 0 ? "text-green-600" : "text-red-600"
                                                            )}
                                                        >
                                                            {sector.performance >= 0 ? "+" : ""}
                                                            {sector.performance.toFixed(1)}%
                                                        </p>
                                                        <p className="text-xs text-gray-500">YTD Performance</p>
                                                    </div>
                                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-sm border-gray-200 bg-white">
                                <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="text-lg font-medium text-gray-800">Sector Allocation</CardTitle>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-lg border-gray-200 text-blue-600 hover:bg-blue-50 text-sm"
                                        >
                                            Adjust Allocation
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid md:grid-cols-2 gap-6 items-center">
                                        <div className="h-80">
                                            <DonutChart
                                                data={[
                                                    { sector: "Technology", allocation: 35 },
                                                    { sector: "Healthcare", allocation: 18 },
                                                    { sector: "Financial", allocation: 15 },
                                                    { sector: "Consumer", allocation: 12 },
                                                    { sector: "Energy", allocation: 8 },
                                                    { sector: "Other", allocation: 12 },
                                                ]}
                                                index="sector"
                                                category="allocation"
                                                valueFormatter={(value) => `${value}%`}
                                                colors={["blue", "cyan", "indigo", "violet", "purple", "slate"]}
                                                className="h-80"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            {[
                                                { sector: "Technology", allocation: 35, color: "#3b82f6" },
                                                { sector: "Healthcare", allocation: 18, color: "#06b6d4" },
                                                { sector: "Financial", allocation: 15, color: "#6366f1" },
                                                { sector: "Consumer", allocation: 12, color: "#8b5cf6" },
                                                { sector: "Energy", allocation: 8, color: "#a855f7" },
                                                { sector: "Other", allocation: 12, color: "#64748b" },
                                            ].map((item) => (
                                                <div key={item.sector} className="space-y-1">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className="h-3 w-3 rounded-full"
                                                                style={{ backgroundColor: item.color }}
                                                            ></div>
                                                            <p className="font-medium text-gray-800">{item.sector}</p>
                                                        </div>
                                                        <p className="font-medium text-gray-800">{item.allocation}%</p>
                                                    </div>
                                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                backgroundColor: item.color,
                                                                width: `${item.allocation}%`
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="mt-6 pt-4 border-t border-gray-200">
                                                <div className="rounded-lg bg-amber-50 border border-amber-100 p-4">
                                                    <div className="flex items-start gap-3">
                                                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                                                        <div>
                                                            <h3 className="font-medium text-gray-800">Technology Overweight</h3>
                                                            <p className="mt-1 text-sm text-gray-600">Your technology allocation is 10% higher than the benchmark. Consider rebalancing for better diversification.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </DashboardLayout>
    );
}