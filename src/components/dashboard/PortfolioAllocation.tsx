"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { calculateSectorAllocation } from "@/lib/stockData";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { DonutChart, Legend } from "@tremor/react";

export function PortfolioAllocation() {
  const sectorAllocation = calculateSectorAllocation();
  
  // Prepare data for Tremor donut chart
  const chartData = sectorAllocation.map(item => ({
    name: item.sector,
    value: item.percentage,
  }));

  // The valueFormatter function changes how values are displayed in the chart
  const valueFormatter = (value: number) => formatPercentage(value);

  // Define sector colors
  const customColors = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#14b8a6", // teal
  ];

  return (
    <Card>
      <CardHeader className="bg-blue-50 px-6 py-5 dark:bg-blue-900/20">
        <CardTitle className="text-lg font-semibold">Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <DonutChart
            data={chartData}
            category="value"
            index="name"
            valueFormatter={valueFormatter}
            colors={customColors}
            className="h-64 mt-4"
          />
        </motion.div>
        
        <div className="mb-4">
          <Legend
            categories={chartData.map(item => item.name)}
            colors={customColors}
            className="mt-6"
          />
        </div>
        
        <div className="mt-6 space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Allocation Details</p>
          {sectorAllocation.map((sector, i) => (
            <motion.div
              key={sector.sector}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2"
            >
              <div className="flex items-center">
                <div 
                  className="h-3 w-3 rounded-full mr-2" 
                  style={{ backgroundColor: customColors[i % customColors.length] }}
                />
                <span className="text-sm font-medium">{sector.sector}</span>
              </div>
              <div className="flex gap-6">
                <span className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(sector.value)}</span>
                <span className="text-sm font-medium w-16 text-right">{formatPercentage(sector.percentage)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}