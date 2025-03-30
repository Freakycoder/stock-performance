// src/components/layout/Sidebar.tsx
import { 
    BarChart3, 
    CreditCard, 
    Home, 
    PieChart, 
    Settings, 
    TrendingUp, 
    User, 
    LogOut,
    Sparkles
  } from "lucide-react";
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import { cn } from "@/lib/utils";
  import { motion, AnimatePresence } from "framer-motion";
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";
  import { ThemeToggle } from "@/components/ui/ThemeToggle";
  
  interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }
  
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      icon: PieChart,
    },
    {
      title: "Market",
      href: "/market",
      icon: TrendingUp,
    },
    {
      title: "Transactions",
      href: "/transactions",
      icon: CreditCard,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
  ];
  
  interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
  
    // Mobile sidebar with animation
    const mobileSidebar = (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm md:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-40 w-72 border-r bg-white p-6 shadow-lg md:hidden dark:bg-gray-900 dark:border-gray-800"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/90 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Finesse</h1>
                  <p className="text-xs font-medium text-muted-foreground">Finance Dashboard</p>
                </div>
              </div>
              
              <nav className="space-y-1 mt-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                    {pathname === item.href && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-primary"></div>
                    )}
                  </Link>
                ))}
              </nav>
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <Separator className="my-6" />
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Theme</p>
                  <ThemeToggle />
                </div>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground mt-4">
                  <User className="h-5 w-5" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  
    // Desktop sidebar - always visible
    const desktopSidebar = (
      <div className="hidden md:flex md:w-72 flex-col h-full border-r bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="flex h-16 items-center gap-3 px-6 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/90 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Finesse</h1>
            <p className="text-xs font-medium text-muted-foreground">Finance Dashboard</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              whileHover={{ x: 4 }}
              className="rounded-xl overflow-hidden"
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
                {pathname === item.href && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-primary"></div>
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    );
  
    return (
      <>
        {mobileSidebar}
        {desktopSidebar}
      </>
    );
  }