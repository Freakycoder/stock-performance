// src/pages/transactions.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/Header";
import { SideNav } from "@/components/dashboard/SideNav";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TransactionsPage() {
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
              Transactions
            </motion.h1>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Full Transactions List */}
              <div className="lg:col-span-12">
                <RecentTransactions />
              </div>
              
              {/* Transaction History Graph */}
              <Card className="lg:col-span-12">
                <CardHeader className="bg-blue-50 px-6 py-5 dark:bg-blue-950/20">
                  <CardTitle className="text-lg font-semibold">
                    Transaction History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-500 dark:text-gray-400 text-center py-16">
                    Transaction frequency chart will be displayed here
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}