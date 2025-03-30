import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Ensure this runs only on the client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Determine if dark mode is active
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setIsDark(currentTheme === 'dark');
  }, [theme, systemTheme]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Get color scheme based on current theme
  const getColorForTheme = (lightColor: string, darkColor: string) => {
    if (!mounted) return lightColor;
    return isDark ? darkColor : lightColor;
  };

  return {
    theme,
    setTheme,
    isDark,
    mounted,
    toggleTheme,
    getColorForTheme
  };
}