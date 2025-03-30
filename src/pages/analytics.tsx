// src/pages/analytics.tsx
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart, LineChart, DonutChart } from "@tremor/react";
import { ChevronDown, Share2 } from "lucide-react";

export default function AnalyticsPage() {
  // Sample data for charts
  const performanceData = [
    { date: "Jan", Return: 2.5, Benchmark: 1.8 },
    { date: "Feb", Return: 1.1, Benchmark: 0.7 },
    { date: "Mar", Return: -1.4, Benchmark: -2.1 },
    { date: "Apr", Return: 3.2, Benchmark: 2.3 },
    { date: "May", Return: 1.9, Benchmark: 0.8 },
    { date: "Jun", Return: -0.6, Benchmark: -0.3 },
    { date: "Jul", Return: 4.2, Benchmark: 3.1 },
    { date: "Aug", Return: 2.8, Benchmark: 2.5 },
    { date: "Sep", Return: -2.1, Benchmark: -1.7 },
    { date: "Oct", Return: 1.8, Benchmark: 1.1 },
    { date: "Nov", Return: 5.3, Benchmark: 4.2 },
    { date: "Dec", Return: 3.7, Benchmark: 2.9 },
  ];
  
  const riskData = [
    { category: "Low Risk", value: 30 },
    { category: "Medium Risk", value: 45 },
    { category: "High Risk", value: 25 },
  ];

  const sectorPerformanceData = [
    { sector: "Technology", performance: 18.4 },
    { sector: "Healthcare", performance: 12.8 },
    { sector: "Finance", performance: 7.3 },
    { sector: "Consumer", performance: -4.2 },
    { sector: "Energy", performance: -8.7 },
  ];

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <Tabs defaultValue="performance" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:flex bg-gray-100 dark:bg-gray-800 p-1">
                <TabsTrigger value="performance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Performance</TabsTrigger>
                <TabsTrigger value="risk" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Risk</TabsTrigger>
                <TabsTrigger value="sectors" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Sectors</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  This Year
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="performance" className="mt-6 space-y-6">
              <Card className="shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
                  <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-72">
                    <LineChart
                      data={performanceData}
                      index="date"
                      categories={["Return", "Benchmark"]}
                      colors={["#3b82f6", "#64748b"]}
                      valueFormatter={(value) => `${value.toFixed(1)}%`}
                      showLegend={true}
                      showGridLines={true}
                      curveType="monotone"
                      className="h-72"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
                    <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">Annual Returns</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-64">
                      <BarChart
                        data={performanceData}
                        index="date"
                        categories={["Return"]}
                        colors={["#3b82f6"]}
                        valueFormatter={(value) => `${value.toFixed(1)}%`}
                        showLegend={false}
                        className="h-64"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
                    <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">Return Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-64">
                      <DonutChart
                        data={[
                          { range: "< 0%", value: 20 },
                          { range: "0-5%", value: 45 },
                          { range: "> 5%", value: 35 },
                        ]}
                        index="range"
                        category="value"
                        valueFormatter={(value) => `${value}%`}
                        colors={["#ef4444", "#f59e0b", "#10b981"]}
                        className="h-64"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="risk" className="mt-6 space-y-6">
              <Card className="shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
                  <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-72">
                    <DonutChart
                      data={riskData}
                      index="category"
                      category="value"
                      valueFormatter={(value) => `${value}%`}
                      colors={["#10b981", "#f59e0b", "#ef4444"]}
                      className="h-72"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sectors" className="mt-6 space-y-6">
              <Card className="shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
                  <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">Sector Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-72">
                    <BarChart
                      data={sectorPerformanceData}
                      index="sector"
                      categories={["performance"]}
                      colors={["#3b82f6"]}
                      valueFormatter={(value) => `${value.toFixed(1)}%`}
                      showLegend={false}
                      className="h-72"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}