// src/components/dashboard/StatCard.tsx
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string;
    change?: number | string;
    changeText?: string;
    icon: LucideIcon;
    iconColor?: string;
    iconBgColor?: string;
    animationDelay?: number;
}

export function StatCard({
    title,
    value,
    change,
    changeText,
    icon: Icon,
    iconColor = "text-blue-600",
    iconBgColor = "bg-blue-100",
    animationDelay = 0
}: StatCardProps) {
    const isPositiveChange = typeof change === 'number' ? change >= 0 : change && !change.startsWith('-');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: animationDelay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full transition-all duration-200 hover:shadow-md">
                {/* Gradient background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-80"></div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 opacity-[0.07] rounded-full bg-blue-600 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 h-24 w-24 translate-y-6 -translate-x-6 opacity-[0.03] rounded-full bg-blue-600 blur-xl"></div>

                <div className="relative flex items-center gap-4">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-4 mb-2">
                            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", iconBgColor)}>
                                <Icon className={cn("h-6 w-6", iconColor)} />
                            </div>
                            <p className="text-sm font-medium text-gray-500">{title}</p>
                        </div>
                            <p className="mt-1 truncate text-xl font-bold text-gray-800">{value}</p>
                        {change && (
                            <div className="flex items-center mt-1.5">
                                <span
                                    className={cn(
                                        "flex items-center text-xs font-medium gap-0.5 rounded-full px-2 py-0.5",
                                        isPositiveChange
                                            ? "text-green-700 bg-green-50"
                                            : "text-red-700 bg-red-50"
                                    )}
                                >
                                    {isPositiveChange ? (
                                        <ArrowUpRight className="h-3 w-3" />
                                    ) : (
                                        <ArrowDownRight className="h-3 w-3" />
                                    )}
                                    {typeof change === 'string' ? change : `${Math.abs(change).toFixed(2)}%`}
                                </span>
                                {changeText && (
                                    <span className="text-xs text-gray-500 ml-1.5 truncate">{changeText}</span>
                                )}
                            </div>
                        )}
                        {!change && changeText && (
                            <p className="text-xs text-gray-500 mt-1 truncate">{changeText}</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}