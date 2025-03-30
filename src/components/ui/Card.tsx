import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  animate?: boolean;
}

export function Card({ 
  children, 
  className, 
  hoverEffect = true,
  animate = true
}: CardProps) {
  const CardComponent = animate ? motion.div : "div";
  
  return (
    <CardComponent
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={animate ? { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1.0], 
        delay: Math.random() * 0.2 
      } : undefined}
      className={cn(
        "rounded-xl border bg-white text-gray-900 shadow-sm overflow-hidden",
        "dark:bg-gray-950 dark:text-gray-50 dark:border-gray-800",
        hoverEffect && "transition-all duration-200 hover:shadow-md hover:border-blue-500/20",
        className
      )}
    >
      {children}
    </CardComponent>
  );
}

export function CardHeader({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <h3 className={cn("text-lg font-semibold", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  );
}

export function CardContent({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)}>
      {children}
    </div>
  );
}