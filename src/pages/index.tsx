// src/pages/index.tsx
import { useState, useEffect } from "react";
import { Wallet, TrendingUp, BarChart3, PieChart, BellRing, Calendar, ArrowUpRight, BarChart } from "lucide-react";
import { stocks } from "@/lib/stockData";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { StockChart } from "@/components/dashboard/StockChart";
import { PortfolioAllocation } from "@/components/dashboard/PortfolioAllocation";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { TopStocks } from "@/components/dashboard/TopStocks";
import { PortfolioOverview } from "@/components/dashboard/PortfolioOverview";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("John");
  const router = useRouter()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get a featured stock for the main chart
  const featuredStock = stocks.find(stock => stock.symbol === 'NVDA') || stocks[0];
  
  // Get current date in formatted string
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full bg-blue-100"></div>
            <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-wrap justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userName}</h1>
            <p className="mt-1 text-gray-500">{currentDate}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm hover:bg-gray-50 cursor-pointer">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
           
            <Button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <span>Add Funds</span>
            </Button>
          </motion.div>
        </div>
      
        {/* Portfolio Summary */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Portfolio Summary</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/portfolio')}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
            >
              <span>View Portfolio</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <StatCard 
                title="Portfolio Value" 
                value="$18,218.51" 
                change={15.53} 
                changeText="from initial" 
                icon={Wallet} 
                iconColor="text-blue-600"
                iconBgColor="bg-blue-50"
                animationDelay={0}
              />
            </div>
            
            <div className="col-span-1">
              <StatCard 
                title="Total Gain/Loss" 
                value="$2,448.51" 
                change={15.53} 
                changeText="all time" 
                icon={TrendingUp} 
                iconColor="text-green-600"
                iconBgColor="bg-green-50"
                animationDelay={0.1}
              />
            </div>
            
            <div className="col-span-1">
              <StatCard 
                title="Monthly Return" 
                value="$428.33" 
                change={2.4} 
                changeText="this month" 
                icon={BarChart3} 
                iconColor="text-indigo-600"
                iconBgColor="bg-indigo-50"
                animationDelay={0.2}
              />
            </div>
            
            <div className="col-span-1">
              <StatCard 
                title="Total Assets" 
                value="5 Stocks" 
                changeText="Across 3 sectors" 
                icon={PieChart} 
                iconColor="text-amber-600"
                iconBgColor="bg-amber-50"
                animationDelay={0.3}
              />
            </div>
          </div>
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-12 gap-6">
          {/* Featured Stock Chart */}
          <div className="col-span-7">
            <StockChart 
              data={featuredStock.historicalData}
              symbol={featuredStock.logo}
              name={featuredStock.name}
              price={featuredStock.price}
              change={featuredStock.change}
              changePercent={featuredStock.changePercent}
              color={featuredStock.color}
              type="area"
              height={420}
            />
          </div>
          
          {/* Portfolio Allocation */}
          <div className="col-span-5">
            <PortfolioAllocation />
          </div>
        </div>
        
        {/* Recent Activity and Top Performers */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <Card className="overflow-hidden border-gray-200 shadow-sm bg-white h-full">
              <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-2 text-white">
                      <BarChart className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">Market Activity</CardTitle>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    <span>View Market</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </CardHeader>
              <CardContent className="p-6 overflow-auto max-h-[600px]">
                <div className="space-y-4">
                  <TopStocks limit={5} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-6">
            <RecentTransactions limit={4} />
          </div>
        </div>
        
        {/* Financial News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-gray-200 shadow-sm bg-white">
            <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-800">Financial News</CardTitle>
                
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    title: "Federal Reserve Holds Interest Rates Steady",
                    source: "Wall Street Journal",
                    time: "2 hours ago",
                    tag: "Economy",
                    imgSrc: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmVkZXJhbCUyMHJlc2VydmV8ZW58MHx8MHx8fDA%3D",
                  },
                  {
                    title: "Tech Stocks Rally After Strong Earnings Reports",
                    source: "Bloomberg",
                    time: "4 hours ago",
                    tag: "Markets",
                    imgSrc: "https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
                  },
                  {
                    title: "Oil Prices Drop Amid Global Economic Concerns",
                    source: "Reuters",
                    time: "6 hours ago",
                    tag: "Commodities",
                    imgSrc: "https://plus.unsplash.com/premium_photo-1682310149425-1dc9966c3ad6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2lsJTIwcHJpY2V8ZW58MHx8MHx8fDA%3D",
                  }
                ].map((news, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <img 
                        src={news.imgSrc} 
                        alt={news.title} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-700">
                        {news.tag}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </h3>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600">{news.source}</span>
                        <span className="text-xs text-gray-500">{news.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}