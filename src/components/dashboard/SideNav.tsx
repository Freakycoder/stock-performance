"use client";

import { 
  BarChart3, 
  CreditCard, 
  DollarSign, 
  HomeIcon, 
  PieChart, 
  Settings, 
  TrendingUp, 
  User2
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Portfolio",
    href: "/dashboard/portfolio",
    icon: PieChart,
  },
  {
    title: "Market",
    href: "/dashboard/market",
    icon: TrendingUp,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideNav({ isOpen, onClose }: SideNavProps) {
  const pathname = usePathname();
  
  // Sidebar variant for mobile
  const mobileSidebar = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-40 w-64 border-r bg-white p-6 shadow-lg lg:hidden dark:bg-gray-950 dark:border-gray-800"
          >
            <div className="mb-8 flex items-center">
              <DollarSign className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-500" />
              <span className="text-xl font-bold">Finance</span>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                <User2 className="mr-3 h-5 w-5" />
                Profile
              </div>
              <div className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Desktop sidebar - always visible
  const desktopSidebar = (
    <div className="hidden h-screen w-64 flex-col border-r bg-white px-4 py-6 lg:flex dark:bg-gray-950 dark:border-gray-800">
      <div className="mb-8 flex items-center px-2">
        <DollarSign className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-500" />
        <span className="text-xl font-bold">Finance</span>
      </div>
      <nav className="space-y-1">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.4,
              delay: index * 0.1
            }}
          >
            <Link
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          </motion.div>
        ))}
      </nav>
      <div className="mt-auto space-y-1">
        <Link
          href="/dashboard/profile"
          className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        >
          <User2 className="mr-3 h-5 w-5" />
          Profile
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {mobileSidebar}
      {desktopSidebar}
    </>
  );
}