// src/components/layout/Navbar.tsx
import { 
    Bell, 
    Menu, 
    Search,
    ChevronDown,
  } from "lucide-react";
  import { motion } from "framer-motion";
  import { cn } from "@/lib/utils";
  import { marketIndexes } from "@/lib/stockData";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  import { ThemeToggle } from "@/components/ui/ThemeToggle";
  import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger 
  } from "@/components/ui/dropdown-menu";
  import { Input } from "@/components/ui/input";
  
  interface NavbarProps {
    onToggleSidebar: () => void;
    title?: string;
  }
  
  export function Navbar({ onToggleSidebar, title = "Dashboard" }: NavbarProps) {
    return (
      <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur-md">
        <div className="h-full flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="md:hidden rounded-xl"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </Button>
            
            {title && (
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-bold hidden md:block text-foreground"
              >
                {title}
              </motion.h1>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {marketIndexes.map((index, i) => (
              <motion.div
                key={index.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="hidden lg:flex items-center gap-2"
              >
                <span className="text-sm font-medium text-muted-foreground">{index.name}</span>
                <span className="text-sm font-semibold">
                  {index.value.toLocaleString()}
                </span>
                <span className={cn(
                  "text-xs font-medium px-1.5 py-0.5 rounded",
                  index.changePercent >= 0 
                    ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20" 
                    : "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                )}>
                  {index.changePercent >= 0 ? "+" : ""}
                  {index.changePercent.toFixed(2)}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </header>
    );
  }