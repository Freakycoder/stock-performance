// src/pages/index.tsx
import { useState, useEffect } from "react";
import { Wallet, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { stocks } from "@/lib/stockData";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { StockChart } from "@/components/dashboard/StockChart";
import { PortfolioAllocation } from "@/components/dashboard/PortfolioAllocation";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { TopStocks } from "@/components/dashboard/TopStocks";

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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Portfolio Value" 
            value="$18,218.51" 
            change={15.53} 
            changeText="from initial" 
            icon={Wallet} 
            iconColor="bg-primary"
            animationDelay={0}
          />
          
          <StatCard 
            title="Total Gain/Loss" 
            value="$2,448.51" 
            change={15.53} 
            changeText="all time" 
            icon={TrendingUp} 
            iconColor="bg-green-500"
            animationDelay={0.1}
          />
          
          <StatCard 
            title="Monthly Return" 
            value="$428.33" 
            change={2.4} 
            changeText="this month" 
            icon={BarChart3} 
            iconColor="bg-purple-500"
            animationDelay={0.2}
          />
          
          <StatCard 
            title="Total Assets" 
            value="5 Stocks" 
            changeText="Across 3 sectors" 
            icon={PieChart} 
            iconColor="bg-amber-500"
            animationDelay={0.3}
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Featured Stock Chart */}
          <div className="lg:col-span-4">
            <StockChart 
              data={featuredStock.historicalData}
              symbol={featuredStock.symbol}
              name={featuredStock.name}
              price={featuredStock.price}
              change={featuredStock.change}
              changePercent={featuredStock.changePercent}
              color={featuredStock.color}
              type="area"
              height={350}
            />
          </div>
          
          {/* Portfolio Allocation */}
          <div className="lg:col-span-3">
            <PortfolioAllocation />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}