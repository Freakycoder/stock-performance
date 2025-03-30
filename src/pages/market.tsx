// src/pages/market.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/Header";
import { SideNav } from "@/components/dashboard/SideNav";
import { TopStocks } from "@/components/dashboard/TopStocks";
import { StockPerformanceCard } from "@/components/dashboard/StockPerformanceCard";
import { stocks } from "@/lib/stockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
              Market
            </motion.h1>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Top Stocks */}
              <div className="lg:col-span-12">
                <TopStocks />
              </div>
              
              {/* Stock Cards */}
              <div className="lg:col-span-12">
                <h2 className="text-xl font-semibold mb-4">All Stocks</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {stocks.map((stock, i) => (
                    <StockPerformanceCard 
                      key={stock.id} 
                      stock={stock} 
                      animationDelay={i * 0.05}
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