// src/components/layout/Navbar.tsx
import { Bell, Menu } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="mr-2 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        
        <div className="mr-4 font-bold text-xl text-primary">
          FinanceDashboard
        </div>
        
        <div className="hidden md:flex md:items-center md:gap-6 ml-6">
          {marketIndexes.map((index) => (
            <motion.div
              key={index.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:flex items-center gap-1.5"
            >
              <span className="text-sm font-medium">{index.name}</span>
              <span className="text-sm font-semibold">
                {index.value.toLocaleString()}
              </span>
              <span className={cn(
                "text-xs font-medium px-1.5 py-0.5 rounded-sm",
                index.changePercent >= 0 
                  ? "text-success bg-success/10" 
                  : "text-destructive bg-destructive/10"
              )}>
                {index.changePercent >= 0 ? "+" : ""}
                {index.changePercent.toFixed(2)}%
              </span>
            </motion.div>
          ))}
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid gap-2 p-2">
                <div className="rounded-md bg-muted p-2 text-sm">
                  <p className="font-medium">Portfolio Alert</p>
                  <p className="text-muted-foreground">NVDA up 3.15% today</p>
                </div>
                <div className="rounded-md bg-muted p-2 text-sm">
                  <p className="font-medium">Market Update</p>
                  <p className="text-muted-foreground">S&P 500 reached new all-time high</p>
                </div>
                <div className="rounded-md bg-muted p-2 text-sm">
                  <p className="font-medium">Account Notice</p>
                  <p className="text-muted-foreground">Quarterly statement is now available</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://source.unsplash.com/random/?profile" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
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