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
    HelpCircle,
    Sparkles,
    Plus,
    Bell,
    Wallet,
    LifeBuoy
  } from "lucide-react";
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import { cn } from "@/lib/utils";
  import { motion, AnimatePresence } from "framer-motion";
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";
  import { Badge } from "@/components/ui/Badge";
  
  interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    variant?: "default" | "new" | "hot";
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
      badge: "New",
      variant: "new"
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
      badge: "Beta",
      variant: "hot"
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
              className="fixed inset-y-0 left-0 z-40 w-72 border-r border-gray-200 bg-white p-6 shadow-lg md:hidden"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Finance<span className="ml-1 text-gray-400">Pro</span></h1>
                  <p className="text-xs font-medium text-gray-500">Finance Dashboard</p>
                </div>
              </div>
              
              <nav className="space-y-1 mt-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn(
                        "h-5 w-5",
                        pathname === item.href
                          ? "text-blue-600"
                          : "text-gray-400 group-hover:text-gray-500"
                      )} />
                      {item.title}
                    </div>
                    
                    {item.badge && (
                      <Badge 
                        variant={item.variant === "new" ? "info" : item.variant === "hot" ? "premium" : "default"}
                        size="sm"
                        rounded="full"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    
                    {pathname === item.href && (
                      <div className="absolute right-0 h-8 w-1 rounded-l-full bg-blue-600"></div>
                    )}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-10 space-y-2">
                <Button variant="outline" className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 rounded-xl border-gray-200 hover:bg-gray-50">
                  <Wallet className="h-5 w-5 text-gray-400" />
                  <span>Add Funds</span>
                  <Badge variant="success" className="ml-auto">New</Badge>
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 rounded-xl border-gray-200 hover:bg-gray-50">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <span>Alerts</span>
                </Button>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Upgrade to Pro</p>
                      <p className="text-xs text-gray-500">Get more features and benefits</p>
                    </div>
                  </div>
                  <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                    Upgrade Now
                  </button>
                </div>
                
                <Link href="/profile" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <User className="h-5 w-5 text-gray-400" />
                  Profile
                </Link>
                <Link href="/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <Settings className="h-5 w-5 text-gray-400" />
                  Settings
                </Link>
                <Link href="/help" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                  Help Center
                </Link>
                <Separator className="my-3 bg-gray-200" />
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <LogOut className="h-5 w-5 text-gray-400" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  
    // Desktop sidebar - always visible
    const desktopSidebar = (
      <div className="hidden h-screen w-72 flex-col border-r border-gray-200 bg-white px-4 py-6 lg:flex">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Finance<span className="ml-1 text-gray-400">Pro</span></h1>
            <p className="text-xs font-medium text-gray-500">Finance Dashboard</p>
          </div>
        </div>
        
        <div className="mb-6 px-3">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Main Menu</p>
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
                    "relative flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group",
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "h-5 w-5",
                      pathname === item.href
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    )} />
                    {item.title}
                  </div>
                  
                  {item.badge && (
                    <Badge 
                      variant={item.variant === "new" ? "info" : item.variant === "hot" ? "premium" : "default"}
                      size="sm"
                      rounded="full"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  
                  {pathname === item.href && (
                    <div className="absolute right-0 h-8 w-1 rounded-l-full bg-blue-600"></div>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        
        <div className="px-3 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Quick Actions</p>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
              <Plus className="h-3.5 w-3.5 text-gray-400" />
            </Button>
          </div>
          <nav className="space-y-1">
            <Button variant="outline" className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 rounded-xl border-gray-200 hover:bg-gray-50">
              <Wallet className="h-5 w-5 text-gray-400" />
              <span>Add Funds</span>
              <Badge variant="success" className="ml-auto text-[10px] px-1.5">New</Badge>
            </Button>
            
            <Button variant="outline" className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 rounded-xl border-gray-200 hover:bg-gray-50">
              <Bell className="h-5 w-5 text-gray-400" />
              <span>Alerts</span>
            </Button>
          </nav>
        </div>
        
        <div className="mt-auto px-3">
          <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Upgrade to Pro</p>
                <p className="text-xs text-gray-500">Get more features</p>
              </div>
            </div>
            <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-medium text-white hover:opacity-90">
              Upgrade Now
            </button>
          </div>
          
          <div className="rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <LifeBuoy className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Need Help?</p>
                <p className="text-xs text-gray-500">Contact support</p>
              </div>
            </div>
            <button className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Get Support
            </button>
          </div>
        </div>
        
        <div className="px-3 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="relative">
              <img
                src="https://source.unsplash.com/random/?profile"
                alt="User"
                className="h-10 w-10 rounded-full object-cover border border-gray-200"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
            </div>
            <div>
              <p className="font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">john.doe@example.com</p>
            </div>
          </div>
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