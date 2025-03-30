// src/components/dashboard/StatCard.tsx
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: number | string;
  changeText?: string;
  icon: LucideIcon;
  iconColor?: string;
  animationDelay?: number;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeText,
  icon: Icon,
  iconColor = "bg-primary",
  animationDelay = 0 
}: StatCardProps) {
  const isPositiveChange = typeof change === 'number' ? change >= 0 : change && !change.startsWith('-');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: animationDelay }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm border border-border h-full">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 opacity-10">
          <div className={`h-full w-full rounded-full ${iconColor}`}></div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconColor} text-white`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 truncate text-2xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center mt-1">
                <span 
                  className={cn(
                    "flex items-center text-xs font-medium gap-0.5",
                    isPositiveChange 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {isPositiveChange ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {typeof change === 'string' ? change : `${Math.abs(change).toFixed(2)}%`}
                </span>
                {changeText && (
                  <span className="text-xs text-muted-foreground ml-1">{changeText}</span>
                )}
              </div>
            )}
            {!change && changeText && (
              <p className="text-xs text-muted-foreground mt-1">{changeText}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}