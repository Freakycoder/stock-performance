// src/pages/index.tsx
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, ChevronUp, BarChart3, PieChart, ArrowUpRight } from "lucide-react";
import { stocks } from "@/lib/stockData";
import { StockChart } from "@/components/dashboard/StockChart";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { DonutChart } from "@tremor/react";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get a featured stock for the main chart
  const featuredStock = stocks.find(stock => stock.symbol === 'NVDA') || stocks[0];

  // Portfolio allocation chart data
  const portfolioData = [
    { name: "Technology", value: 45 },
    { name: "Finance", value: 25 },
    { name: "Healthcare", value: 15 },
    { name: "Consumer", value: 10 },
    { name: "Energy", value: 5 },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Portfolio Value Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Portfolio Value</p>
                    <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">$18,218.51</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                        <ArrowUpRight className="h-3 w-3" />
                        15.53%
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">from initial</span>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 p-2 rounded-xl text-blue-600 dark:text-blue-400">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Total Gain/Loss Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Gain/Loss</p>
                    <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">$2,448.51</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                        <ArrowUpRight className="h-3 w-3" />
                        15.53%
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">all time</span>
                    </div>
                  </div>
                  <div className="bg-green-500/10 p-2 rounded-xl text-green-600 dark:text-green-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Monthly Return Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Return</p>
                    <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">$428.33</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                        <ArrowUpRight className="h-3 w-3" />
                        2.4%
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">this month</span>
                    </div>
                  </div>
                  <div className="bg-purple-500/10 p-2 rounded-xl text-purple-600 dark:text-purple-400">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Assets Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Assets</p>
                    <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">5 Stocks</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Across 3 sectors</span>
                    </div>
                  </div>
                  <div className="bg-amber-500/10 p-2 rounded-xl text-amber-600 dark:text-amber-400">
                    <PieChart className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-7">
          {/* Featured Stock Chart */}
          <Card className="lg:col-span-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
            <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
              <CardTitle className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                {featuredStock.name} ({featuredStock.symbol})
                <span className={cn(
                  "text-sm ml-2 px-2 py-0.5 rounded-full",
                  featuredStock.changePercent >= 0 
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" 
                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                )}>
                  {featuredStock.changePercent >= 0 ? "+" : ""}
                  {formatPercentage(featuredStock.changePercent)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(featuredStock.price)}</span>
                <Tabs defaultValue="1M" className="w-auto">
                  <TabsList className="h-8 bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger value="1W" className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">1W</TabsTrigger>
                    <TabsTrigger value="1M" className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">1M</TabsTrigger>
                    <TabsTrigger value="3M" className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">3M</TabsTrigger>
                    <TabsTrigger value="1Y" className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">1Y</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="px-4 pt-4 pb-6">
                <StockChart
                  data={featuredStock.historicalData.slice(-30)}
                  color={featuredStock.color}
                  type="area"
                  height={300}
                  showVolume={false}
                />
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Breakdown */}
          <Card className="lg:col-span-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
            <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
              <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">Portfolio Allocation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-5 px-6">
              <DonutChart
                data={portfolioData}
                category="value"
                index="name"
                valueFormatter={(value) => `${value}%`}
                colors={["#3b82f6", "#8b5cf6", "#14b8a6", "#f43f5e", "#0ea5e9"]}
                className="h-64"
              />
              
              <div className="mt-6 space-y-2 divide-y divide-gray-200 dark:divide-gray-800">
                {portfolioData.map((sector, i) => (
                  <div key={sector.name} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <div 
                        className="h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: ["#3b82f6", "#8b5cf6", "#14b8a6", "#f43f5e", "#0ea5e9"][i % 5] }}
                      />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{sector.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{sector.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}