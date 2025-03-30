// src/components/layout/DashboardLayout.tsx
import { ReactNode, useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state for better UX
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} title={title} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full items-center justify-center"
              >
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div>
                  <p className="mt-4 text-gray-500 font-medium">Loading content...</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-7xl pb-12"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      
      {/* Quick Actions Floating Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <button 
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={() => {}}
          aria-label="Quick actions"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}