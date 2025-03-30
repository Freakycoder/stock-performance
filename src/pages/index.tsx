import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/Header";
import { SideNav } from "@/components/dashboard/SideNav";
import { PortfolioOverview } from "@/components/dashboard/PortfolioOverview";
import { PortfolioAllocation } from "@/components/dashboard/PortfolioAllocation";
import { TopStocks } from "@/components/dashboard/TopStocks";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { StockPerformanceCard } from "@/components/dashboard/StockPerformanceCard";
import { StockChart } from "@/components/dashboard/StockChart";
import { stocks } from "@/lib/stockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get a featured stock for the main chart (e.g., NVDA)
  const featuredStock = stocks.find(stock => stock.symbol === 'NVDA') || stocks[0];

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <SideNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold tracking-tight mb-6"
            >
              Dashboard
            </motion.h1>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Featured Stock Chart */}
              <Card className="lg:col-span-8">
                <CardHeader className="bg-blue-50 px-6 py-5 dark:bg-blue-950/20">
                  <CardTitle className="text-lg font-semibold">
                    {featuredStock.name} ({featuredStock.symbol})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <StockChart
                    data={featuredStock.historicalData}
                    color={featuredStock.color}
                    type="area"
                    height={400}
                  />
                </CardContent>
              </Card>
              
              {/* Portfolio Overview */}
              <div className="lg:col-span-4">
                <PortfolioOverview />
              </div>
              
              {/* Portfolio Allocation */}
              <div className="lg:col-span-4">
                <PortfolioAllocation />
              </div>
              
              {/* Recent Transactions */}
              <div className="lg:col-span-4">
                <RecentTransactions />
              </div>
              
              {/* Top Stocks */}
              <div className="lg:col-span-4">
                <TopStocks />
              </div>
              
              {/* Stock Cards */}
              <div className="lg:col-span-12">
                <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {stocks.slice(0, 4).map((stock, i) => (
                    <StockPerformanceCard 
                      key={stock.id} 
                      stock={stock} 
                      animationDelay={i * 0.1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}