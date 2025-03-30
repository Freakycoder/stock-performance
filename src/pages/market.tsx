// src/pages/market.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, TrendingDown, ExternalLink, Filter, ArrowUpDown, ChevronDown, Eye, BarChart4, Clock, Globe, ArrowRight } from "lucide-react";
import { cn, formatCurrency, formatPercentage, formatCompactNumber } from "@/lib/utils";
import { stocks, marketIndexes } from "@/lib/stockData";
import { AreaChart } from "@tremor/react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "change" | "marketCap">("change");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  
  // Toggle sort direction or change sort field
  const handleSort = (field: "name" | "price" | "change" | "marketCap") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };
  
  // Filter stocks based on search and sector filter
  const filteredStocks = stocks.filter((stock) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch = (
      stock.name.toLowerCase().includes(searchTerm) ||
      stock.symbol.toLowerCase().includes(searchTerm) ||
      stock.sector.toLowerCase().includes(searchTerm)
    );
    
    const matchesFilter = activeFilter === "all" || stock.sector.toLowerCase() === activeFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });
  
  // Sort stocks based on selected field and direction
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "change":
        comparison = a.changePercent - b.changePercent;
        break;
      case "marketCap":
        comparison = a.marketCap - b.marketCap;
        break;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });
  
  // Format stock data for charts
  const formatStockChart = (historicalData: any[]) => {
    // Get only the last 30 days of data
    const recentData = historicalData.slice(-30);
    
    // Format for Tremor area chart
    return recentData.map(point => ({
      date: point.date,
      Price: point.price
    }));
  };
  
  // Get unique sectors for filter
  const sectors = ["all", ...Array.from(new Set(stocks.map(stock => stock.sector.toLowerCase())))];

  // Format market activity info
  const marketOpen = new Date();
  marketOpen.setHours(9, 30, 0);
  const marketClose = new Date();
  marketClose.setHours(16, 0, 0);
  const now = new Date();
  const isMarketOpen = now >= marketOpen && now <= marketClose;

  return (
    <DashboardLayout title="Market">
      <div className="space-y-8">
        {/* Header with indicators */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-800"
            >
              Market Overview
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${isMarketOpen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}
            >
              <Clock className="h-4 w-4" />
              <span>{isMarketOpen ? 'Market Open' : 'Market Closed'}</span>
              <span className="text-xs text-gray-500 ml-1">• NYSE</span>
            </motion.div>
          </div>
          <p className="text-gray-500">Track global markets and discover investment opportunities</p>
        </div>
        
        {/* Market Indexes */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marketIndexes.map((index, i) => (
            <motion.div 
              key={index.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={cn(
                "rounded-xl p-6 border cursor-pointer transition-all duration-200",
                index.changePercent >= 0 
                  ? "border-green-200 bg-gradient-to-br from-green-50 to-white" 
                  : "border-red-200 bg-gradient-to-br from-red-50 to-white",
                selectedIndex === i ? "shadow-md ring-1 ring-blue-200" : "shadow-sm hover:shadow-md"
              )}
              onClick={() => setSelectedIndex(i)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-gray-800">{index.name}</h3>
                    <Globe className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-3xl font-bold mt-2 text-gray-800">{index.value.toLocaleString()}</p>
                  <div className={cn(
                    "flex items-center gap-1 mt-2 text-sm font-medium px-2 py-1 rounded-lg w-fit",
                    index.changePercent >= 0 
                      ? "text-green-700 bg-green-100" 
                      : "text-red-700 bg-red-100"
                  )}>
                    {index.changePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {index.changePercent >= 0 ? "+" : ""}
                    {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </div>
                </div>
                <div className={cn(
                  "text-7xl font-thin opacity-20",
                  index.changePercent >= 0 
                    ? "text-green-600" 
                    : "text-red-600"
                )}>
                  {index.changePercent >= 0 ? "↗" : "↘"}
                </div>
              </div>
              
              <AnimatePresence>
                {selectedIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Day Range</p>
                        <p className="text-sm font-medium text-gray-800">
                          {(index.value * 0.98).toLocaleString()} - {(index.value * 1.02).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">YTD Change</p>
                        <p className="text-sm font-medium text-green-600">+{(Math.random() * 10 + 5).toFixed(2)}%</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 w-full rounded-lg text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Stock List */}
        <Card className="shadow-sm border-gray-200 bg-white overflow-hidden">
          <CardHeader className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-2 text-white">
                  <BarChart4 className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Stock Market</CardTitle>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search stocks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-10 w-full sm:w-[260px] rounded-xl border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Tabs 
                    defaultValue="all" 
                    value={activeFilter} 
                    onValueChange={setActiveFilter} 
                    className="w-full sm:w-auto"
                  >
                    <TabsList className="h-10 bg-gray-100 rounded-xl">
                      {sectors.slice(0, 4).map((sector) => (
                        <TabsTrigger 
                          key={sector} 
                          value={sector} 
                          className="px-3 rounded-lg capitalize"
                        >
                          {sector}
                        </TabsTrigger>
                      ))}
                      {sectors.length > 4 && (
                        <div className="relative inline-block text-left">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 rounded-lg"
                          >
                            <span>More</span>
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm">
                    <th 
                      className="px-6 py-4 font-medium text-gray-500 cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        <span>Stock</span>
                        {sortBy === "name" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 font-medium text-gray-500 text-right cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort("price")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Price</span>
                        {sortBy === "price" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 font-medium text-gray-500 text-right cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort("change")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Change</span>
                        {sortBy === "change" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 font-medium text-gray-500 text-right cursor-pointer hover:text-gray-900 hidden md:table-cell"
                      onClick={() => handleSort("marketCap")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Market Cap</span>
                        {sortBy === "marketCap" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-500 hidden lg:table-cell">
                      <span>Chart</span>
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-500 text-right">
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedStocks.map((stock, i) => (
                    <motion.tr
                      key={stock.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm" 
                            style={{ backgroundColor: `${stock.color}15` }}
                          >
                            <span className="text-sm font-bold" style={{ color: stock.color }}>
                              {stock.symbol.slice(0, 2)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 line-clamp-1">{stock.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-medium text-gray-500">{stock.symbol}</span>
                              <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 capitalize">{stock.sector}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-right">
                        <p className="font-bold text-gray-800">{formatCurrency(stock.price)}</p>
                      </td>
                      
                      <td className="px-6 py-4 text-right">
                        <div className={cn(
                          "flex items-center justify-end gap-1 text-sm font-medium px-2 py-1 rounded-lg w-fit ml-auto",
                          stock.changePercent >= 0 
                            ? "text-green-700 bg-green-100" 
                            : "text-red-700 bg-red-100"
                        )}>
                          {stock.changePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {stock.changePercent >= 0 ? "+" : ""}
                          {formatPercentage(stock.changePercent)}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-right hidden md:table-cell font-medium text-gray-800">
                        {formatCompactNumber(stock.marketCap)}
                      </td>
                      
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="w-32 h-10">
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
                            className="h-10"
                          />
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-8 w-8 p-0 bg-gray-100"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Link href={`/market/${stock.id}`}>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                            >
                              <span className="mr-1">View</span>
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  
                  {sortedStocks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No stocks found matching "{search}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Market Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-gray-200 bg-white shadow-sm col-span-1 md:col-span-2">
            <CardHeader className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-800">Recent Market News</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-lg border-gray-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    title: "Federal Reserve Holds Interest Rates Steady",
                    description: "The Federal Reserve announced today that it will maintain current interest rates, citing steady inflation and strong employment numbers.",
                    source: "Wall Street Journal",
                    time: "2 hours ago",
                    tag: "Economy"
                  },
                  {
                    title: "Tech Stocks Rally After Strong Earnings Reports",
                    description: "Major tech companies exceeded earnings expectations, driving a sector-wide rally in technology stocks.",
                    source: "Bloomberg",
                    time: "4 hours ago",
                    tag: "Stocks"
                  },
                  {
                    title: "Oil Prices Drop Amid Global Economic Concerns",
                    description: "Crude oil prices fell by 3% amid concerns about global economic growth and reduced demand forecasts.",
                    source: "Reuters",
                    time: "Yesterday",
                    tag: "Commodities"
                  }
                ].map((news, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div 
                      className="rounded-lg h-12 w-12 flex items-center justify-center"
                      style={{ backgroundColor: news.tag === "Economy" ? "#EFF6FF" : news.tag === "Stocks" ? "#F0FDF4" : "#FEF2F2" }}
                    >
                      <span
                        className="text-sm font-bold"
                        style={{ color: news.tag === "Economy" ? "#3B82F6" : news.tag === "Stocks" ? "#22C55E" : "#EF4444" }}
                      >
                        {news.tag.slice(0, 1)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{news.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{news.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium text-gray-700">{news.source}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{news.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 bg-white shadow-sm">
            <CardHeader className="p-6 border-b border-gray-200 bg-gray-50">
              <CardTitle className="text-xl font-bold text-gray-800">Top Performers</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {stocks
                  .sort((a, b) => b.changePercent - a.changePercent)
                  .slice(0, 5)
                  .map((stock, i) => (
                    <motion.div
                      key={stock.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="flex h-8 w-8 items-center justify-center rounded-lg" 
                          style={{ backgroundColor: `${stock.color}15` }}
                        >
                          <span className="text-xs font-bold" style={{ color: stock.color }}>
                            {stock.symbol.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{stock.symbol}</p>
                          <p className="text-xs text-gray-500">{formatCurrency(stock.price)}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
                        stock.changePercent >= 0 
                          ? "text-green-700 bg-green-100" 
                          : "text-red-700 bg-red-100"
                      )}>
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}