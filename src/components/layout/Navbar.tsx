// src/components/layout/Navbar.tsx
import { Bell, Menu, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { marketIndexes } from "@/lib/stockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onToggleSidebar: () => void;
  title?: string;
}

export function Navbar({ onToggleSidebar, title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-14 border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </Button>
          
          {title && (
            <h1 className="text-lg font-medium hidden md:block">{title}</h1>
          )}
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {marketIndexes.map((index) => (
            <motion.div
              key={index.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden lg:flex items-center gap-1.5"
            >
              <span className="text-sm font-medium">{index.name}</span>
              <span className="text-sm font-semibold">
                {index.value.toLocaleString()}
              </span>
              <span className={cn(
                "text-xs font-medium px-1.5 py-0.5 rounded-sm",
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
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" strokeWidth={1.5} />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid gap-2 p-2">
                <div className="rounded-md bg-muted p-3 text-sm hover:bg-muted/80 transition-colors cursor-pointer">
                  <p className="font-medium">Portfolio Alert</p>
                  <p className="text-muted-foreground text-xs mt-1">NVDA up 3.15% today</p>
                </div>
                <div className="rounded-md bg-muted p-3 text-sm hover:bg-muted/80 transition-colors cursor-pointer">
                  <p className="font-medium">Market Update</p>
                  <p className="text-muted-foreground text-xs mt-1">S&P 500 reached new all-time high</p>
                </div>
                <div className="rounded-md bg-muted p-3 text-sm hover:bg-muted/80 transition-colors cursor-pointer">
                  <p className="font-medium">Account Notice</p>
                  <p className="text-muted-foreground text-xs mt-1">Quarterly statement is now available</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 pr-2 pl-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://source.unsplash.com/random/?profile" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}