// src/components/layout/Sidebar.tsx
import {
    BarChart3,
    CreditCard,
    Home,
    PieChart,
    Settings,
    TrendingUp,
    User,
    DollarSign,
    LogOut
  } from "lucide-react";
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import { cn } from "@/lib/utils";
  import { motion, AnimatePresence } from "framer-motion";
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";
  
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
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-40 w-64 border-r bg-background p-5 shadow-lg md:hidden"
            >
              <div className="flex items-center gap-2 mb-8 font-bold text-xl text-primary">
                <DollarSign className="h-6 w-6" />
                <span>Finance</span>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <Separator className="my-4" />
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                  <LogOut className="h-4 w-4" />
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
      <div className="hidden md:flex md:w-60 flex-col h-full border-r bg-background">
        <div className="flex h-14 items-center gap-2 px-5 border-b font-bold text-xl text-primary">
          <DollarSign className="h-5 w-5" />
          <span>Finance</span>
        </div>
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              whileHover={{ x: 2 }}
              className="rounded-md overflow-hidden"
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="border-t p-3 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
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