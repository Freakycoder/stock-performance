// src/components/layout/Sidebar.tsx
import {
    BarChart3,
    CreditCard,
    Home,
    PieChart,
    Settings,
    TrendingUp,
    User,
    DollarSign
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/",
        icon: Home,
    },
    {
        title: "Portfolio",
        href: "/portfolio",
        icon: PieChart,
    },
    {
        title: "Market",
        href: "/market",
        icon: TrendingUp,
    },
    {
        title: "Transactions",
        href: "/transactions",
        icon: CreditCard,
    },
    {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
    },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    // Mobile sidebar
    const mobileSidebar = (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-y-0 left-0 z-40 w-72 border-r bg-background p-6 shadow-lg md:hidden"
                    >
                        <div className="flex items-center gap-2 mb-8 font-bold text-xl text-primary">
                            <DollarSign className="h-6 w-6" />
                            <span>Finance</span>
                        </div>
                        <nav className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        pathname === item.href
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                        <div className="absolute bottom-6 left-6 right-6 space-y-1">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <User className="h-4 w-4" />
                                Profile
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Settings className="h-4 w-4" />
                                Settings
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    // Desktop sidebar
    const desktopSidebar = (
        <div className="hidden w-64 flex-col border-r bg-background md:flex">
            <div className="flex h-16 items-center gap-2 px-6 border-b font-bold text-xl text-primary">
                <DollarSign className="h-6 w-6" />
                <span>Finance</span>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.title}
                    </Link>
                ))}
            </nav>
        // src/components/layout/Sidebar.tsx (continued)
            <div className="border-t p-4 space-y-1">
                <Button variant="outline" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    Profile
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {mobileSidebar}
            {desktopSidebar}
        </>
    );
}