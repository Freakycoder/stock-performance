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
import { Sparkles, TrendingUp, TrendingDown, Info, ExternalLink, Clock } from "lucide-react";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => (
    <div className="flex h-[350px] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600"></div>
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
  color = "#3b82f6",
  type = 'area',
  showVolume = true,
  height = 350 
}: StockChartProps) {
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<'1W' | '1M' | '3M' | '1Y'>('1M');
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  
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
  
  // Get min and max prices for annotations
  const prices = filteredData.map(item => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  // Determine chart color based on change direction
  const chartColor = changePercent >= 0 ? (color || "#22c55e") : "#ef4444";
  const chartGradientColor = changePercent >= 0 ? ["rgba(34, 197, 94, 0.3)", "rgba(255, 255, 255, 0)"] : ["rgba(239, 68, 68, 0.3)", "rgba(255, 255, 255, 0)"];
  
  // Format market activity info
  const marketOpen = new Date();
  marketOpen.setHours(9, 30, 0);
  const marketClose = new Date();
  marketClose.setHours(16, 0, 0);
  const now = new Date();
  const isMarketOpen = now >= marketOpen && now <= marketClose;
  
  // Format chart annotations
  const annotations = {
    yaxis: [
      {
        y: minPrice,
        borderColor: '#94a3b8',
        label: {
          text: 'Low: ' + formatCurrency(minPrice),
          position: 'left',
          style: {
            color: '#64748b',
            background: '#f1f5f9',
            fontSize: '11px',
            fontWeight: 500,
            padding: {
              left: 5,
              right: 5,
              top: 0,
              bottom: 0
            },
            borderRadius: 3,
          }
        }
      },
      {
        y: maxPrice,
        borderColor: '#94a3b8',
        label: {
          text: 'High: ' + formatCurrency(maxPrice),
          position: 'left',
          style: {
            color: '#64748b',
            background: '#f1f5f9',
            fontSize: '11px',
            fontWeight: 500,
            padding: {
              left: 5,
              right: 5,
              top: 0,
              bottom: 0
            },
            borderRadius: 3,
          }
        }
      }
    ]
  };
  
  // Format datetime based on time range
  const formatDatetime = (timestamp: number): string => {
    const date = new Date(timestamp);
    if (timeRange === '1W' || timeRange === '1M') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
  };
  
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
      events: {
        mouseMove: function(event: any, chartContext: any, config: any) {
          if (config.dataPointIndex > -1) {
            const value = config.series[0].data[config.dataPointIndex].y;
            const timestamp = config.series[0].data[config.dataPointIndex].x;
            setHoveredValue(typeof value === 'number' ? value : value[3]);
            setHoveredDate(formatDatetime(timestamp));
          }
        },
        mouseLeave: function() {
          setHoveredValue(null);
          setHoveredDate(null);
        }
      }
    },
    theme: {
      mode: 'light',
    },
    colors: [chartColor],
    grid: {
      borderColor: 'rgba(226, 232, 240, 0.8)',
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
      width: type === 'area' ? 2.5 : 1,
      lineCap: 'round',
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: chartColor,
            opacity: 0.3
          },
          {
            offset: 100,
            color: chartColor,
            opacity: 0
          }
        ]
      }
    },
    dataLabels: {
      enabled: false
    },
    annotations: annotations,
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        style: {
          fontSize: '12px',
          fontFamily: 'inherit',
          colors: '#64748b',
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
          colors: '#64748b',
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
      custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
        const value = series[seriesIndex][dataPointIndex];
        const timestamp = w.globals.seriesX[seriesIndex][dataPointIndex];
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
        
        return `
          <div class="px-2 py-1 bg-white rounded-lg border border-gray-200 shadow-md">
            <div class="font-medium text-gray-800">${formatCurrency(value)}</div>
            <div class="text-xs text-gray-500">${formattedDate}</div>
          </div>
        `;
      }
    },
    plotOptions: type === 'candlestick' ? {
      candlestick: {
        colors: {
          upward: '#22c55e',
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
    <Card className="overflow-hidden border-gray-200 shadow-sm bg-white">
      <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
        <div className="flex justify-center items-center h-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex items-center justify-center h-80">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </CardContent>
    </Card>
  );
  
  if (!hasValidData) return (
    <Card className="overflow-hidden border-gray-200 shadow-sm bg-white">
      <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
        <CardTitle className="text-xl font-bold text-gray-800">No Data Available</CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex items-center justify-center h-80">
        <p className="text-gray-500">No stock data available to display.</p>
      </CardContent>
    </Card>
  );

  return (
    <Card className="overflow-hidden border-gray-200 shadow-sm bg-white">
      <CardHeader className="border-b border-gray-200 bg-gray-50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="h-12 w-12 rounded-xl flex items-center justify-center shadow-sm"
              style={{ backgroundColor: `${color}15` }}
            >
              <span className="text-base font-bold" style={{ color }}>
                {symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl font-bold text-gray-800">{name}</CardTitle>
                <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">{symbol}</span>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-2xl font-bold text-gray-800">{formatCurrency(price)}</span>
                <Badge variant={changePercent >= 0 ? 'success' : 'destructive'} className="flex items-center gap-1">
                  {changePercent >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                </Badge>
                <span className="text-sm text-gray-500">
                  {changePercent >= 0 ? '+' : ''}{formatCurrency(change)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${isMarketOpen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              <Clock className="h-3.5 w-3.5" />
              <span>{isMarketOpen ? 'Market Open' : 'Market Closed'}</span>
            </div>
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <TabsList className="h-9 p-1 bg-gray-100 rounded-lg">
                <TabsTrigger value="1W" className="rounded-md px-3 py-1.5 text-xs">1W</TabsTrigger>
                <TabsTrigger value="1M" className="rounded-md px-3 py-1.5 text-xs">1M</TabsTrigger>
                <TabsTrigger value="3M" className="rounded-md px-3 py-1.5 text-xs">3M</TabsTrigger>
                <TabsTrigger value="1Y" className="rounded-md px-3 py-1.5 text-xs">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
            <button className="rounded-full p-2 hover:bg-gray-100 text-blue-600">
              <Sparkles className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          {hoveredValue && hoveredDate && (
            <div className="absolute top-4 left-4 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
              <div className="text-sm font-medium text-gray-800">{formatCurrency(hoveredValue)}</div>
              <div className="text-xs text-gray-500">{hoveredDate}</div>
            </div>
          )}
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
        </div>
        
        {showVolume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium text-gray-500">Volume</h4>
              <div className="text-xs text-gray-500">
                {new Intl.NumberFormat().format(Math.max(...volumeData.map(item => item.y)))} max
              </div>
            </div>
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
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500">Open</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">{filteredData.length > 0 ? formatCurrency(filteredData[filteredData.length - 1].open) : '-'}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500">High</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">{formatCurrency(maxPrice)}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500">Low</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">{formatCurrency(minPrice)}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500">Volume</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">{filteredData.length > 0 ? new Intl.NumberFormat().format(filteredData[filteredData.length - 1].volume) : '-'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}