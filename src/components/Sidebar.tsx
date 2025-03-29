'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Home,
    PieChart,
    LineChart,
    CreditCard,
    Clock,
    Bell,
    Settings,
    HelpCircle,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useStockContext } from '@/lib/context';

export const Sidebar: React.FC = () => {
    const { sidebarCollapsed, toggleSidebar } = useStockContext();
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    
    const menuItems = [
        { icon: <Home size={18} />, text: 'Dashboard', path: '/' },
        { icon: <PieChart size={18} />, text: 'Portfolio', path: '/portfolio' },
        { icon: <LineChart size={18} />, text: 'Market', path: '/market' },
        { icon: <CreditCard size={18} />, text: 'Transactions', path: '/transactions' },
        { icon: <Clock size={18} />, text: 'History', path: '/history' },
    ];

    const bottomMenuItems = [
        { icon: <Bell size={18} />, text: 'Notifications', path: '/notifications' },
        { icon: <Settings size={18} />, text: 'Settings', path: '/settings' },
        { icon: <HelpCircle size={18} />, text: 'Help', path: '/help' },
    ];

    const handleItemClick = (text: string) => {
        setActiveItem(text);
    };

    const sidebarVariants = {
        open: { width: 240, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] } },
        collapsed: { width: 72, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] } },
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={sidebarCollapsed ? "collapsed" : "open"}
                animate={sidebarCollapsed ? "collapsed" : "open"}
                variants={sidebarVariants}
                className={`h-screen fixed top-0 left-0 z-40 bg-card/80 dark:bg-card/60 backdrop-blur-xl border-r border-border/30 flex flex-col shadow-sm hidden md:flex transition-all duration-300`}
            >
                <div className="p-4 flex items-center justify-between">
                    <AnimatePresence>
                        {!sidebarCollapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="font-semibold text-lg flex items-center"
                            >
                                <span className="text-primary">Stock</span>
                                <span>Dash</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.button
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleSidebar}
                        className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <motion.div
                            animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronRight size={18} />
                        </motion.div>
                    </motion.button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-4 scrollbar-thin">
                    <ul className="space-y-1.5">
                        {menuItems.map((item, index) => (
                            <motion.li
                                key={index}
                                onHoverStart={() => setHoveredItem(item.text)}
                                onHoverEnd={() => setHoveredItem(null)}
                                className="relative"
                            >
                                <Link href={item.path}
                                    onClick={() => handleItemClick(item.text)}
                                    className={`flex items-center px-3 py-2.5 rounded-lg transition-all ${
                                        activeItem === item.text
                                            ? 'bg-primary/10 dark:bg-primary/15 text-primary'
                                            : 'hover:bg-secondary/60 dark:hover:bg-secondary/30 text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <span className="flex-shrink-0">{item.icon}</span>
                                    <AnimatePresence>
                                        {!sidebarCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="ml-3 text-sm font-medium"
                                            >
                                                {item.text}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                                {sidebarCollapsed && hoveredItem === item.text && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="absolute left-full top-0 ml-2 px-2 py-1 bg-card dark:bg-card shadow-md text-xs rounded border border-border/30 whitespace-nowrap z-50"
                                    >
                                        {item.text}
                                    </motion.div>
                                )}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto px-2 py-4">
                    <ul className="space-y-1.5">
                        {bottomMenuItems.map((item, index) => (
                            <motion.li
                                key={index}
                                onHoverStart={() => setHoveredItem(item.text)}
                                onHoverEnd={() => setHoveredItem(null)}
                                className="relative"
                            >
                                <Link href={item.path}
                                    onClick={() => handleItemClick(item.text)}
                                    className={`flex items-center px-3 py-2.5 rounded-lg transition-all ${
                                        activeItem === item.text
                                            ? 'bg-primary/10 dark:bg-primary/15 text-primary'
                                            : 'hover:bg-secondary/60 dark:hover:bg-secondary/30 text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <span className="flex-shrink-0">{item.icon}</span>
                                    <AnimatePresence>
                                        {!sidebarCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="ml-3 text-sm font-medium"
                                            >
                                                {item.text}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                                {sidebarCollapsed && hoveredItem === item.text && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="absolute left-full top-0 ml-2 px-2 py-1 bg-card dark:bg-card shadow-md text-xs rounded border border-border/30 whitespace-nowrap z-50"
                                    >
                                        {item.text}
                                    </motion.div>
                                )}
                            </motion.li>
                        ))}
                    </ul>

                    <div className="mt-6 px-3">
                        <ThemeToggle />
                        
                        <motion.button 
                            whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-destructive text-sm transition-colors`}
                        >
                            <LogOut size={16} />
                            <AnimatePresence>
                                {!sidebarCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="font-medium"
                                    >
                                        Log out
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};