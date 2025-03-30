"use client";

import { createContext, useContext, ReactNode } from "react";

// Define theme CSS variables directly as Tailwind classes
export const themeClasses = {
  // Light theme defaults (these will be overridden for dark mode via Tailwind's dark: variant)
  background: "bg-white dark:bg-gray-950",
  foreground: "text-gray-900 dark:text-gray-50",
  card: "bg-white dark:bg-gray-950",
  cardForeground: "text-gray-900 dark:text-gray-50",
  popover: "bg-white dark:bg-gray-950",
  popoverForeground: "text-gray-900 dark:text-gray-50",
  primary: "bg-blue-600 dark:bg-blue-500",
  primaryForeground: "text-white dark:text-gray-900",
  secondary: "bg-gray-100 dark:bg-gray-800",
  secondaryForeground: "text-gray-900 dark:text-gray-50",
  muted: "bg-gray-100 dark:bg-gray-800",
  mutedForeground: "text-gray-500 dark:text-gray-400",
  accent: "bg-gray-100 dark:bg-gray-800",
  accentForeground: "text-gray-900 dark:text-gray-50",
  destructive: "bg-red-500 dark:bg-red-700",
  destructiveForeground: "text-white",
  border: "border-gray-200 dark:border-gray-800",
  input: "bg-transparent border border-gray-200 dark:border-gray-800",
  ring: "ring-blue-500",
  radius: "rounded-lg",
  
  // Additional theme colors
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  info: "text-blue-600 dark:text-blue-400",
  
  // Financial specific colors
  profit: {
    text: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
    border: "border-green-200 dark:border-green-800",
  },
  loss: {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
    border: "border-red-200 dark:border-red-800",
  },
};

// Context to share theme classes
const ThemeContext = createContext(themeClasses);

export function useThemeClasses() {
  return useContext(ThemeContext);
}

// Provider component if needed for more complex scenarios
export function ThemeStylesProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={themeClasses}>
      {children}
    </ThemeContext.Provider>
  );
}