// src/pages/market.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown, ExternalLink, Filter, Layers, ArrowUpDown } from "lucide-react";
import { cn, formatCurrency, formatPercentage, formatCompactNumber } from "@/lib/utils";
import { stocks, marketIndexes } from "@/lib/stockData";
import { AreaChart } from "@tremor/react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "change" | "marketCap">("change");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Toggle sort direction or change sort field
  const handleSort = (field: "name" | "price" | "change" | "marketCap") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };
  
  // Filter stocks based on search
  const filteredStocks = stocks.filter((stock) => {
    const searchTerm = search.toLowerCase();
    return (
      stock.name.toLowerCase().includes(searchTerm) ||
      stock.symbol.toLowerCase().includes(searchTerm) ||
      stock.sector.toLowerCase().includes(searchTerm)
    );
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

  return (
    <DashboardLayout title="Market">
      <div className="space-y-6">
        {/* Market Indexes */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marketIndexes.map((index, i) => (
            <motion.div 
              key={index.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="overflow-hidden border-border bg-card shadow-sm h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium text-muted-foreground">{index.name}</h3>
                      <p className="text-3xl font-bold mt-1">{index.value.toLocaleString()}</p>
                      <div className={cn(
                        "flex items-center gap-1 mt-2 text-sm font-medium px-2 py-1 rounded-lg w-fit",
                        index.changePercent >= 0 
                          ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30" 
                          : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
                      )}>
                        {index.changePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {index.changePercent >= 0 ? "+" : ""}
                        {index.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <div className={cn(
                      "text-7xl font-thin opacity-10",
                      index.changePercent >= 0 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-red-600 dark:text-red-400"
                    )}>
                      {index.changePercent >= 0 ? "↗" : "↘"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Stock List */}
        <Card className="shadow-sm border-border bg-card overflow-hidden">
          <CardHeader className="p-6 border-b border-border bg-muted/20">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <CardTitle className="text-xl font-bold">All Stocks</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search stocks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-10 w-full sm:w-[260px] rounded-xl"
                  />
                </div>
                <Tabs defaultValue="all" className="w-full sm:w-auto">
                  <TabsList className="h-10 bg-muted">
                    <TabsTrigger value="all" className="px-3 rounded-md">All</TabsTrigger>
                    <TabsTrigger value="technology" className="px-3 rounded-md">Technology</TabsTrigger>
                    <TabsTrigger value="finance" className="px-3 rounded-md">Finance</TabsTrigger>
                    <TabsTrigger value="consumer" className="px-3 rounded-md">Consumer</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30 text-left text-sm">
                    <th 
                      className="px-6 py-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
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
                      className="px-6 py-4 font-medium text-muted-foreground text-right cursor-pointer hover:text-foreground"
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
                      className="px-6 py-4 font-medium text-muted-foreground text-right cursor-pointer hover:text-foreground"
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
                      className="px-6 py-4 font-medium text-muted-foreground text-right cursor-pointer hover:text-foreground hidden md:table-cell"
                      onClick={() => handleSort("marketCap")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Market Cap</span>
                        {sortBy === "marketCap" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-4 font-medium text-muted-foreground hidden lg:table-cell">
                      <span>Chart</span>
                    </th>
                    <th className="px-6 py-4 font-medium text-muted-foreground text-right">
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sortedStocks.map((stock, i) => (
                    <motion.tr
                      key={stock.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="hover:bg-muted/20 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0" 
                            style={{ backgroundColor: `${stock.color}15` }}
                          >
                            <span className="text-sm font-bold" style={{ color: stock.color }}>
                              {stock.symbol.slice(0, 2)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium line-clamp-1">{stock.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-medium text-muted-foreground">{stock.symbol}</span>
                              <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground">{stock.sector}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-right">
                        <p className="font-bold">{formatCurrency(stock.price)}</p>
                      </td>
                      
                      <td className="px-6 py-4 text-right">
                        <div className={cn(
                          "flex items-center justify-end gap-1 text-sm font-medium px-2 py-1 rounded-lg w-fit ml-auto",
                          stock.changePercent >= 0 
                            ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30" 
                            : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
                        )}>
                          {stock.changePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {stock.changePercent >= 0 ? "+" : ""}
                          {formatPercentage(stock.changePercent)}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-right hidden md:table-cell font-medium">
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
                        <Link href={`/market/${stock.id}`}>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                          >
                            <span className="mr-1">View</span>
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                  
                  {sortedStocks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        No stocks found matching "{search}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}