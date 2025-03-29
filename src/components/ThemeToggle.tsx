'use client';

import { useTheme } from 'next-themes';
import { SunMedium, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const cycleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else if (theme === 'light') {
            setTheme('system');
        } else {
            setTheme('dark');
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground ml-1">Theme</p>
            <div className="flex items-center gap-2 bg-secondary/50 dark:bg-secondary/30 rounded-lg p-1.5">
                <motion.button
                    whileHover={{ backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setTheme('light')}
                    className={`flex-1 flex items-center justify-center p-1.5 rounded-md text-xs font-medium transition-all ${
                        theme === 'light' 
                            ? 'bg-card text-foreground shadow-sm' 
                            : 'text-muted-foreground'
                    }`}
                >
                    <SunMedium size={14} className={theme === 'light' ? 'text-amber-500' : ''} />
                </motion.button>
                
                <motion.button
                    whileHover={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setTheme('dark')}
                    className={`flex-1 flex items-center justify-center p-1.5 rounded-md text-xs font-medium transition-all ${
                        theme === 'dark' 
                            ? 'bg-card text-foreground shadow-sm' 
                            : 'text-muted-foreground'
                    }`}
                >
                    <Moon size={14} className={theme === 'dark' ? 'text-indigo-400' : ''} />
                </motion.button>
                
                <motion.button
                    whileHover={{ backgroundColor: theme === 'system' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setTheme('system')}
                    className={`flex-1 flex items-center justify-center p-1.5 rounded-md text-xs font-medium transition-all ${
                        theme === 'system' 
                            ? 'bg-card text-foreground shadow-sm' 
                            : 'text-muted-foreground'
                    }`}
                >
                    <Monitor size={14} />
                </motion.button>
            </div>
        </div>
    );
};