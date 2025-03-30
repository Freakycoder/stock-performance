import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function getChangeColor(change: number): string {
  return change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
}

export function getChangeColorBg(change: number): string {
  return change >= 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 
    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
}

export function getChangeIcon(change: number): string {
  return change >= 0 ? 'trending-up' : 'trending-down';
}

export function truncateText(text: string, length: number = 18): string {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function getRandomColor(opacity: number = 1) {
  const colors = [
    `rgba(59, 130, 246, ${opacity})`,  // blue
    `rgba(139, 92, 246, ${opacity})`,  // purple
    `rgba(236, 72, 153, ${opacity})`,  // pink
    `rgba(249, 115, 22, ${opacity})`,  // orange
    `rgba(234, 179, 8, ${opacity})`,   // yellow
    `rgba(34, 197, 94, ${opacity})`,   // green
    `rgba(20, 184, 166, ${opacity})`,  // teal
    `rgba(6, 182, 212, ${opacity})`,   // cyan
    `rgba(99, 102, 241, ${opacity})`,  // indigo
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}