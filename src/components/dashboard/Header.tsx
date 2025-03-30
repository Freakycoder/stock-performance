"use client";

import { Bell, Menu } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { marketIndexes } from "@/lib/stockData";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/95 backdrop-blur dark:bg-gray-950/95 dark:border-gray-800">
      <div className="flex h-16 items-center px-4 md:px-6">
        <button 
          onClick={onToggleSidebar}
          className="mr-4 rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="mr-4 hidden md:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-tight"
          >
            <span className="text-blue-600 dark:text-blue-500">Finance</span>
            <span className="text-blue-500/70 dark:text-blue-400/70">Dashboard</span>
          </motion.div>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex md:items-center md:gap-6">
            {marketIndexes.map((index, i) => (
              <motion.div
                key={index.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.1 * i
                }}
                className="hidden items-center gap-1.5 lg:flex"
              >
                <span className="text-sm font-medium">{index.name}</span>
                <span className="text-sm font-semibold">
                  {index.value.toLocaleString()}
                </span>
                <span className={cn(
                  "text-xs font-medium",
                  index.changePercent >= 0 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                )}>
                  {index.changePercent >= 0 ? "+" : ""}
                  {index.changePercent.toFixed(2)}%
                </span>
              </motion.div>
            ))}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 rounded-md border bg-white shadow-md dark:bg-gray-950 dark:border-gray-800"
                >
                  <h3 className="mb-2 p-4 font-medium">Notifications</h3>
                  <div className="space-y-2 p-4 pt-0">
                    <div className="rounded-md bg-gray-50 p-2 text-sm dark:bg-gray-900">
                      <p className="font-medium">Portfolio Alert</p>
                      <p className="text-gray-500 dark:text-gray-400">NVDA up 3.15% today</p>
                    </div>
                    <div className="rounded-md bg-gray-50 p-2 text-sm dark:bg-gray-900">
                      <p className="font-medium">Market Update</p>
                      <p className="text-gray-500 dark:text-gray-400">S&P 500 reached new all-time high</p>
                    </div>
                    <div className="rounded-md bg-gray-50 p-2 text-sm dark:bg-gray-900">
                      <p className="font-medium">Account Notice</p>
                      <p className="text-gray-500 dark:text-gray-400">Quarterly statement is now available</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <ThemeToggle />
          
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="h-8 w-8 overflow-hidden rounded-full bg-blue-600/10"
            >
              <img
                src="https://source.unsplash.com/random/?profile"
                alt="User"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}