// src/components/dashboard/Header.tsx
"use client";

import { Bell, Menu, Search, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleSidebar: () => void;
  title?: string; // Optional title property
}

export function Header({ onToggleSidebar, title }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center px-6">
        <button 
          onClick={onToggleSidebar}
          className="mr-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="mr-6">
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">StockMate</span>
              
            </motion.div>
          </Link>
        </div>

       
        
        
        
        <div className="ml-auto flex items-center gap-5">
          {/* Market indices section has been removed */}
          
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-full p-2 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-blue-600 ring-2 ring-white"></span>
            </motion.button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg z-50"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                    <h3 className="font-medium">Notifications</h3>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">3 New</span>
                  </div>
                  <div className="max-h-[320px] overflow-auto">
                    <div className="space-y-1 p-2">
                      <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50 cursor-pointer">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 truncate">Portfolio Alert</p>
                          <p className="text-sm text-gray-500 truncate">NVDA up 3.15% today</p>
                          <p className="mt-1 text-xs text-gray-400">2 minutes ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50 cursor-pointer">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 truncate">Market Update</p>
                          <p className="text-sm text-gray-500 truncate">S&P 500 reached new all-time high</p>
                          <p className="mt-1 text-xs text-gray-400">1 hour ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50 cursor-pointer">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 truncate">Account Notice</p>
                          <p className="text-sm text-gray-500 truncate">Quarterly statement is now available</p>
                          <p className="mt-1 text-xs text-gray-400">3 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 p-2">
                    <button className="block w-full rounded-lg p-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="relative">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 rounded-full pl-1 pr-3 hover:bg-gray-100"
            >
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage src="https://source.unsplash.com/random/?profile" alt="User" />
                <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">John Doe</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}