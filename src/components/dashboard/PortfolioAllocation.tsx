"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { calculateSectorAllocation } from "@/lib/stockData";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { DonutChart } from "@tremor/react";
import { Sparkles } from "lucide-react";

export function PortfolioAllocation() {
  const sectorAllocation = calculateSectorAllocation();
  
  // Prepare data for Tremor donut chart
  const chartData = sectorAllocation.map(item => ({
    name: item.sector,
    value: item.percentage,
  }));

  // Value formatter function for the chart
  const valueFormatter = (value: number) => `${value.toFixed(1)}%`;

  // Define sector colors - vibrant and visually distinct
  const customColors = [
    "#4f46e5", // indigo-600
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#14b8a6", // teal-500
    "#f59e0b", // amber-500
    "#10b981", // emerald-500
    "#6366f1", // indigo-500
  ];

  return (
    <Card className="overflow-hidden bg-card border-border shadow-sm h-full">
      <CardHeader className="p-6 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Portfolio Allocation</CardTitle>
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <DonutChart
            data={chartData}
            category="value"
            index="name"
            valueFormatter={valueFormatter}
            colors={customColors}
            className="h-64 mt-4"
            showLabel={false}
            showAnimation={true}
          />
        </motion.div>
        
        <div className="mt-8 space-y-2">
          <h3 className="text-base font-medium mb-3">Allocation Details</h3>
          {sectorAllocation.map((sector, i) => (
            <motion.div
              key={sector.sector}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center justify-between py-2 border-b border-border last:border-none"
            >
              <div className="flex items-center">
                <div 
                  className="h-3 w-3 rounded-full mr-3" 
                  style={{ backgroundColor: customColors[i % customColors.length] }}
                />
                <span className="text-base font-medium">{sector.sector}</span>
              </div>
              <div className="flex gap-6">
                <span className="text-sm text-muted-foreground w-24 text-right">{formatCurrency(sector.value)}</span>
                <span className="text-sm font-medium w-16 text-right bg-muted/40 px-2 py-0.5 rounded">{formatPercentage(sector.percentage)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}