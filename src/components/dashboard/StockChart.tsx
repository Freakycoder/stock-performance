// src/components/dashboard/StockChart.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { HistoricalDataPoint } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/Badge";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Sparkles } from "lucide-react";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => (
    <div className="flex h-[350px] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary"></div>
    </div>
  )
});

interface StockChartProps {
  data: HistoricalDataPoint[];
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  color?: string;
  type?: 'area' | 'candlestick';
  showVolume?: boolean;
  height?: number;
}

export function StockChart({ 
  data, 
  symbol,
  name,
  price,
  change,
  changePercent,
  color = "#4f46e5",
  type = 'area',
  showVolume = true,
  height = 350 
}: StockChartProps) {
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<'1W' | '1M' | '3M' | '1Y'>('1M');
  
  // Set mounted state to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Check if we have valid data to display
  const hasValidData = data && data.length > 0;
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    if (!hasValidData) return [];
    
    const today = new Date();
    let daysToInclude = 30; // Default to 1M
    
    switch (timeRange) {
      case '1W':
        daysToInclude = 7;
        break;
      case '1M':
        daysToInclude = 30;
        break;
      case '3M':
        daysToInclude = 90;
        break;
      case '1Y':
        daysToInclude = 365;
        break;
    }
    
    return data.slice(-daysToInclude);
  };
  
  const filteredData = getFilteredData();
  
  // Prepare data for chart
  const seriesData = hasValidData ? (type === 'area' 
    ? filteredData.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.price
      }))
    : filteredData.map(item => ({
        x: new Date(item.date).getTime(),
        y: [item.open, item.high, item.low, item.close]
      }))) : [];
      
  const volumeData = hasValidData ? filteredData.map(item => ({
    x: new Date(item.date).getTime(),
    y: item.volume
  })) : [];
  
  // Determine chart color based on change direction
  const chartColor = changePercent >= 0 ? (color || "#10b981") : "#ef4444";
  
  // ApexCharts options
  const chartOptions = {
    chart: {
      type: type,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      background: 'transparent',
      fontFamily: 'inherit',
    },
    theme: {
      mode: 'dark',
    },
    colors: [chartColor],
    grid: {
      borderColor: 'rgba(107, 114, 128, 0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    stroke: {
      curve: 'smooth',
      width: type === 'area' ? 3 : 1,
      lineCap: 'round',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        style: {
          fontSize: '12px',
          fontFamily: 'inherit',
          colors: 'rgba(107, 114, 128, 0.8)',
        },
        format: timeRange === '1W' ? 'dd MMM' : timeRange === '1M' ? 'dd MMM' : 'MMM yyyy',
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        stroke: {
          color: chartColor,
          width: 1,
          dashArray: 3,
        }
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      labels: {
        formatter: function(value: number) {
          return formatCurrency(value).split('.')[0];
        },
        style: {
          fontSize: '12px',
          fontFamily: 'inherit',
          colors: 'rgba(107, 114, 128, 0.8)',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: function(value: number) {
          return formatCurrency(value);
        }
      },
      style: {
        fontSize: '12px',
        fontFamily: 'inherit',
      },
      marker: {
        show: false,
      },
    },
    plotOptions: type === 'candlestick' ? {
      candlestick: {
        colors: {
          upward: '#10b981',
          downward: '#ef4444'
        },
        wick: {
          useFillColor: true,
        }
      }
    } : {},
  };
  
  // Volume chart options
  const volumeOptions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      type: 'bar',
      height: 80,
    },
    tooltip: {
      ...chartOptions.tooltip,
      y: {
        formatter: function(value: number) {
          return new Intl.NumberFormat().format(value);
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
      }
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      labels: {
        show: false,
      }
    },
  };

  // Don't render the chart until we're mounted and have valid data
  if (!mounted) return (
    <Card className="overflow-hidden bg-card border-border shadow-sm">
      <CardHeader className="p-6 border-b border-border bg-muted/20">
        <div className="flex justify-center items-center h-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex items-center justify-center h-80">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </CardContent>
    </Card>
  );
  
  if (!hasValidData) return (
    <Card className="overflow-hidden bg-card border-border shadow-sm">
      <CardHeader className="p-6 border-b border-border bg-muted/20">
        <CardTitle className="text-xl font-bold">No Data Available</CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex items-center justify-center h-80">
        <p className="text-muted-foreground">No stock data available to display.</p>
      </CardContent>
    </Card>
  );

  return (
    <Card className="overflow-hidden bg-card border-border shadow-sm">
      <CardHeader className="p-6 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <span className="text-base font-bold" style={{ color }}>
                {symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl font-bold">{name}</CardTitle>
                <span className="text-xs text-muted-foreground font-medium px-2 py-1 bg-muted rounded">{symbol}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">{formatCurrency(price)}</span>
                <Badge variant={changePercent >= 0 ? 'success' : 'destructive'}>
                  {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <TabsList className="h-9 p-1 bg-muted">
                <TabsTrigger value="1W" className="rounded-md px-3 py-1.5 text-xs">1W</TabsTrigger>
                <TabsTrigger value="1M" className="rounded-md px-3 py-1.5 text-xs">1M</TabsTrigger>
                <TabsTrigger value="3M" className="rounded-md px-3 py-1.5 text-xs">3M</TabsTrigger>
                <TabsTrigger value="1Y" className="rounded-md px-3 py-1.5 text-xs">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={timeRange} // Re-animate when time range changes
        >
          <ReactApexChart
            options={chartOptions as any}
            series={[{
              name: 'Price',
              data: seriesData
            }]}
            type={type}
            height={height}
          />
        </motion.div>
        
        {showVolume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2"
          >
            <ReactApexChart
              options={volumeOptions as any}
              series={[{
                name: 'Volume',
                data: volumeData
              }]}
              type="bar"
              height={80}
            />
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}