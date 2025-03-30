import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        error: "border-red-500 focus-visible:ring-red-500 text-red-700 placeholder:text-red-400",
        success: "border-green-500 focus-visible:ring-green-500 text-green-700 placeholder:text-green-400",
        flat: "border-transparent bg-gray-100 focus-visible:border-gray-200 focus-visible:bg-white",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2.5 py-1.5 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg",
        xl: "rounded-xl",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label?: string;
  helperText?: string;
  errorText?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    variant, 
    size,
    rounded,
    prefix,
    suffix,
    label,
    helperText,
    errorText,
    containerClassName,
    ...props 
  }, ref) => {
    // If has error text, force error variant
    const hasError = !!errorText;
    const inputVariant = hasError ? "error" : variant;
    
    // Adjust padding based on prefix/suffix
    const inputClassNames = cn(
      inputVariants({ variant: inputVariant, size, rounded }),
      prefix && "pl-9",
      suffix && "pr-9",
      className
    );
    
    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {prefix && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {typeof prefix === 'string' ? (
                <span className="text-gray-500 sm:text-sm">{prefix}</span>
              ) : (
                prefix
              )}
            </div>
          )}
          
          <input
            type={type}
            className={inputClassNames}
            ref={ref}
            {...props}
          />
          
          {suffix && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {typeof suffix === 'string' ? (
                <span className="text-gray-500 sm:text-sm">{suffix}</span>
              ) : (
                suffix
              )}
            </div>
          )}
        </div>
        
        {(helperText || errorText) && (
          <p className={cn(
            "text-xs", 
            hasError ? "text-red-600" : "text-gray-500"
          )}>
            {errorText || helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }