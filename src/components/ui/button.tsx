import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800",
        outline:
          "border border-gray-200 bg-white shadow-sm hover:bg-gray-50 active:bg-gray-100 text-gray-700",
        secondary:
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 active:bg-gray-300",
        ghost:
          "hover:bg-gray-100 hover:text-gray-900 text-gray-700",
        link: 
          "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
        primary:
          "bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800",
        success:
          "bg-green-600 text-white shadow-sm hover:bg-green-700 active:bg-green-800",
        warning:
          "bg-amber-500 text-white shadow-sm hover:bg-amber-600 active:bg-amber-700",
        info:
          "bg-sky-500 text-white shadow-sm hover:bg-sky-600 active:bg-sky-700",
        gradient:
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800",
        soft: 
          "bg-blue-50 text-blue-600 hover:bg-blue-100 active:bg-blue-200",
        "soft-success": 
          "bg-green-50 text-green-600 hover:bg-green-100 active:bg-green-200",
        "soft-warning": 
          "bg-amber-50 text-amber-600 hover:bg-amber-100 active:bg-amber-200",
        "soft-destructive": 
          "bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200",
        "soft-secondary": 
          "bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
        xs: "h-8 rounded-md px-2.5 text-xs",
        xl: "h-12 rounded-md px-8 text-base",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg",
        xl: "rounded-xl",
        none: "rounded-none",
      },
      animation: {
        none: "",
        bounce: "transform transition-transform active:scale-95",
        scale: "transform transition-transform hover:scale-105 active:scale-95",
        pulse: "transform transition-all hover:shadow-md",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      animation: "bounce",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded,
    animation,
    asChild = false, 
    icon,
    iconPosition = "left",
    loading = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Spinner animation for loading state
    const loadingSpinner = (
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    )
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, animation, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && loadingSpinner}
        {icon && iconPosition === "left" && !loading && <span className="mr-1">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-1">{icon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

// Animated motion button wrapper
export const MotionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button ref={ref} {...props} animation="none" />
      </motion.div>
    )
  }
)
MotionButton.displayName = "MotionButton"

export { Button, buttonVariants }