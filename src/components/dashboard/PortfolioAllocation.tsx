"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { calculateSectorAllocation } from "@/lib/stockData";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { DonutChart } from "@tremor/react";
import { TrendingUp, PieChart, AlertCircle } from "lucide-react";

export function PortfolioAllocation() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
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
    "#3b82f6", // blue
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#f59e0b", // amber
    "#10b981", // emerald
    "#0ea5e9", // sky
    "#6366f1", // indigo
  ];

  // Helper function to get the recommendation
  const getRecommendation = () => {
    const technologyPercentage = sectorAllocation.find(item => item.sector === "Technology")?.percentage || 0;
    
    if (technologyPercentage > 40) {
      return {
        text: "Technology exposure is high",
        action: "Consider diversifying into other sectors",
        icon: AlertCircle,
        color: "text-amber-600",
        bgColor: "bg-amber-50"
      };
    }
    
    const highestAllocation = [...sectorAllocation].sort((a, b) => b.percentage - a.percentage)[0];
    
    if (highestAllocation.percentage > 35) {
      return {
        text: `${highestAllocation.sector} allocation is high (${highestAllocation.percentage.toFixed(1)}%)`,
        action: "Consider rebalancing for better diversification",
        icon: AlertCircle,
        color: "text-amber-600",
        bgColor: "bg-amber-50"
      };
    }
    
    return {
      text: "Allocation is well balanced",
      action: "Portfolio diversification looks good",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    };
  };
  
  const recommendation = getRecommendation();

  return (
    <Card className="flex flex-col overflow-hidden bg-white border-gray-200 shadow-sm h-full">
      <CardHeader className="flex-shrink-0 p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
              <PieChart className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-800">Portfolio Allocation</CardTitle>
          </div>
          
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className={`p-4 rounded-xl ${recommendation.bgColor} mb-6 flex items-start gap-3`}>
            <recommendation.icon className={`h-5 w-5 mt-0.5 ${recommendation.color}`} />
            <div>
              <p className="font-medium text-gray-800">{recommendation.text}</p>
              <p className="text-sm text-gray-600">{recommendation.action}</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <DonutChart
              data={chartData}
              category="value"
              index="name"
              valueFormatter={valueFormatter}
              colors={customColors}
              className="h-64 mt-4 w-full max-w-[400px]"
              showLabel={false}
              showAnimation={true}
              onValueChange={(v) => setSelectedSector(v?.name || null)}
            />
          </div>
        </motion.div>
        
        <div className="mt-6 space-y-2 max-h-[350px] overflow-auto">
          <h3 className="text-base font-medium text-gray-700 mb-3">Allocation Details</h3>
          {sectorAllocation.map((sector, i) => (
            <motion.div
              key={sector.sector}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ x: 3 }}
              className={`flex items-center justify-between py-3 px-3 rounded-lg transition-colors ${selectedSector === sector.sector ? 'bg-blue-50 border border-blue-100' : 'border border-transparent hover:bg-gray-50'}`}
              onClick={() => setSelectedSector(selectedSector === sector.sector ? null : sector.sector)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="h-3 w-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: customColors[i % customColors.length] }}
                />
                <span className="text-base font-medium text-gray-700 truncate">{sector.sector}</span>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-sm text-gray-500 w-24 text-right truncate">{formatCurrency(sector.value)}</span>
                <div className="relative w-16 hidden lg:block">
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <motion.div 
                      className="absolute top-0 left-0 h-2 rounded-full" 
                      style={{ backgroundColor: customColors[i % customColors.length] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${sector.percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.3 + (i * 0.05) }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold min-w-16 text-right bg-gray-100 px-2 py-1 rounded-lg">{formatPercentage(sector.percentage)}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {selectedSector && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 p-4 border border-blue-100 rounded-xl bg-blue-50"
          >
            <h4 className="font-medium text-gray-800 truncate">{selectedSector} Allocation</h4>
            <p className="text-sm text-gray-600 mt-1">
              {selectedSector} makes up {
                formatPercentage(sectorAllocation.find(s => s.sector === selectedSector)?.percentage || 0)
              } of your portfolio with a total value of {
                formatCurrency(sectorAllocation.find(s => s.sector === selectedSector)?.value || 0)
              }.
            </p>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-100">
                View Details
              </button>
              <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-blue-600 bg-blue-600 text-white hover:bg-blue-700">
                Adjust Allocation
              </button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}