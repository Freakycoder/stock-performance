"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type Attribute = 'class' | 'data-theme' | 'data-mode' | string;

export function ThemeProvider({ 
  children, 
  ...props 
}: React.PropsWithChildren<any>) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}