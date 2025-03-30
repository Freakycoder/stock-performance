import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'positive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  animate?: boolean;
}

export function Button({
  children,
  variant = 'default',
  size = 'default',
  className,
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  animate = true,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ButtonComponent = animate ? motion.button : "button";
  
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
    ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
    link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-500",
    destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800",
    positive: "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 rounded-md text-sm",
    lg: "h-12 px-6 rounded-md text-lg",
    icon: "h-10 w-10",
  };

  return (
    <ButtonComponent
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={animate ? { scale: 0.97 } : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
}