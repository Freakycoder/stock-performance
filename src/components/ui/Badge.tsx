// src/components/ui/Badge.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-md text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white hover:bg-blue-700",
        secondary:
          "bg-gray-100 text-gray-800 hover:bg-gray-200",
        outline:
          "text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900",
        destructive:
          "bg-red-100 text-red-700 hover:bg-red-200",
        success:
          "bg-green-100 text-green-700 hover:bg-green-200",
        warning:
          "bg-amber-100 text-amber-700 hover:bg-amber-200",
        info:
          "bg-blue-100 text-blue-700 hover:bg-blue-200",
        premium:
          "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-sm",
        purple:
          "bg-purple-100 text-purple-700 hover:bg-purple-200",
        cyan:
          "bg-cyan-100 text-cyan-700 hover:bg-cyan-200",
        pink:
          "bg-pink-100 text-pink-700 hover:bg-pink-200",
      },
      size: {
        default: "h-6 px-2.5 py-0.5 text-xs",
        sm: "h-5 px-2 py-0 text-xs",
        lg: "h-7 px-3 py-0.5 text-sm",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    icon?: React.ReactNode;
    removable?: boolean;
    onRemove?: () => void;
}

function Badge({ 
  className, 
  variant, 
  size, 
  rounded,
  icon,
  removable = false,
  onRemove,
  children, 
  ...props 
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, rounded }), className)} {...props}>
      {icon && <span className="mr-0.5">{icon}</span>}
      {children}
      {removable && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-1 -mr-1 h-3.5 w-3.5 rounded-full flex items-center justify-center hover:bg-black/10"
          aria-label="Remove"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="h-2.5 w-2.5"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export { Badge, badgeVariants }