// src/pages/index.tsx
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, ArrowUpRight } from "lucide-react";
import { stocks } from "@/lib/stockData";
import { StockChart } from "@/components/dashboard/StockChart";
import { TopStocks } from "@/components/dashboard/TopStocks";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { DonutChart } from "@tremor/react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get a featured stock for the main chart (e.g., NVDA)
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
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,218.51</div>
            <div className="flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>15.53% from initial</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in [animation-delay:150ms]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,448.51</div>
            <div className="flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>15.53% from initial</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in [animation-delay:300ms]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$428.33</div>
            <div className="flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>2.4% this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in [animation-delay:450ms]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Stocks</div>
            <div className="text-xs text-muted-foreground">
              Across 3 sectors
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Featured Stock Chart */}
        <Card className="col-span-4 animate-fade-in [animation-delay:600ms]">
          <CardHeader>
            <CardTitle>{featuredStock.name} ({featuredStock.symbol})</CardTitle>
            <CardDescription>
              Current Price: ${featuredStock.price.toLocaleString()} | 
              {featuredStock.changePercent >= 0 ? 
                <span className="text-success"> +{featuredStock.changePercent.toFixed(2)}%</span> : 
                <span className="text-destructive"> {featuredStock.changePercent.toFixed(2)}%</span>
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="1M">
              <div className="flex justify-end p-2">
                <TabsList>
                  <TabsTrigger value="1W">1W</TabsTrigger>
                  <TabsTrigger value="1M">1M</TabsTrigger>
                  <TabsTrigger value="3M">3M</TabsTrigger>
                  <TabsTrigger value="1Y">1Y</TabsTrigger>
                  <TabsTrigger value="All">All</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="1W" className="px-2">
                <StockChart
                  data={featuredStock.historicalData.slice(-7)}
                  color={featuredStock.color}
                  type="area"
                  height={350}
                />
              </TabsContent>
              <TabsContent value="1M" className="px-2">
                <StockChart
                  data={featuredStock.historicalData.slice(-30)}
                  color={featuredStock.color}
                  type="area"
                  height={350}
                />
              </TabsContent>
              <TabsContent value="3M" className="px-2">
                <StockChart
                  data={featuredStock.historicalData.slice(-90)}
                  color={featuredStock.color}
                  type="area"
                  height={350}
                />
              </TabsContent>
              <TabsContent value="1Y" className="px-2">
                <StockChart
                  data={featuredStock.historicalData}
                  color={featuredStock.color}
                  type="area"
                  height={350}
                />
              </TabsContent>
              <TabsContent value="All" className="px-2">
                <StockChart
                  data={featuredStock.historicalData}
                  color={featuredStock.color}
                  type="area"
                  height={350}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Portfolio Overview */}
        <Card className="col-span-3 animate-fade-in [animation-delay:750ms]">
          <CardHeader>
            <CardTitle>Portfolio Breakdown</CardTitle>
            <CardDescription>
              Asset allocation across sectors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={portfolioData}
              category="value"
              index="name"
              valueFormatter={(value) => `${value}%`}
              colors={["blue", "violet", "indigo", "rose", "cyan"]}
              className="h-64"
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Transactions */}
        <Card className="col-span-3 animate-fade-in [animation-delay:900ms]">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest trading activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTransactions limit={5} />
          </CardContent>
        </Card>

        {/* Top Stocks */}
        <Card className="col-span-4 animate-fade-in [animation-delay:1050ms]">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>
              Best performing stocks in your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TopStocks limit={5} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}