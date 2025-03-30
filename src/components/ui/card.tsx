import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-white text-gray-950 shadow-sm",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        primary: "border border-blue-100 bg-blue-50",
        success: "border border-green-100 bg-green-50",
        warning: "border border-amber-100 bg-amber-50",
        destructive: "border border-red-100 bg-red-50",
        info: "border border-sky-100 bg-sky-50",
        flat: "shadow-none border-gray-200",
        subtle: "shadow-none border-gray-100 bg-gray-50",
        elevated: "shadow-md border-gray-200",
        gradient: "border-gray-200 bg-gradient-to-br from-white to-gray-50",
        none: "border-0 shadow-none",
      },
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
        none: "p-0",
      },
      rounded: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-[2rem]",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      rounded: "default",
    },
  }
)

const cardHeaderVariants = cva(
  "flex flex-col gap-1.5 border-b",
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-white",
        primary: "border-blue-200 bg-blue-50",
        success: "border-green-200 bg-green-50",
        warning: "border-amber-200 bg-amber-50",
        destructive: "border-red-200 bg-red-50",
        info: "border-sky-200 bg-sky-50",
        flat: "border-gray-200 bg-white",
        subtle: "border-gray-100 bg-gray-50",
        elevated: "border-gray-200 bg-white",
        gradient: "border-gray-200 bg-gradient-to-br from-gray-50 to-white",
        none: "border-0",
      },
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
        none: "p-0",
      },
      align: {
        default: "items-start",
        center: "items-center",
        end: "items-end",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      align: "default",
    },
  }
)

const cardFooterVariants = cva(
  "flex items-center border-t",
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-white",
        primary: "border-blue-200 bg-blue-50",
        success: "border-green-200 bg-green-50",
        warning: "border-amber-200 bg-amber-50",
        destructive: "border-red-200 bg-red-50",
        info: "border-sky-200 bg-sky-50",
        flat: "border-gray-200 bg-white",
        subtle: "border-gray-100 bg-gray-50",
        elevated: "border-gray-200 bg-white",
        gradient: "border-gray-200 bg-gradient-to-br from-gray-50 to-white",
        none: "border-0",
      },
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
        none: "p-0",
      },
      align: {
        default: "justify-between",
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      align: "default",
    },
  }
)

interface CardProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  clickable?: boolean;
  hover?: boolean;
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, variant, padding, rounded, clickable, hover, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      cardVariants({ variant, padding, rounded }),
      clickable && "cursor-pointer",
      hover && "transition-all duration-200 hover:shadow-md", 
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardHeaderVariants> {
  subtitle?: string;
}

const CardHeader = React.forwardRef<
  HTMLDivElement,
  CardHeaderProps
>(({ className, variant, padding, align, subtitle, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardHeaderVariants({ variant, padding, align }), className)}
    {...props}
  >
    {props.children}
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
  </div>
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-gray-900", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    padding?: "default" | "sm" | "lg" | "xl" | "none"
  }
>(({ className, padding = "default", ...props }, ref) => {
  const paddingClass = {
    default: "p-6",
    sm: "p-4",
    lg: "p-8",
    xl: "p-10",
    none: "p-0",
  }[padding];
  
  return (
    <div
      ref={ref}
      className={cn(paddingClass, className)}
      {...props}
    />
  )
})
CardContent.displayName = "CardContent"

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardFooterVariants> {
}

const CardFooter = React.forwardRef<
  HTMLDivElement,
  CardFooterProps
>(({ className, variant, padding, align, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardFooterVariants({ variant, padding, align }), className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }