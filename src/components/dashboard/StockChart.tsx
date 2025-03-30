// src/components/dashboard/StockChart.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { HistoricalDataPoint } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => (
    <div className="flex h-[350px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
    </div>
  )
});

interface StockChartProps {
  data: HistoricalDataPoint[];
  color?: string;
  type?: 'area' | 'candlestick';
  showVolume?: boolean;
  height?: number;
}

export function StockChart({ 
  data, 
  color = "#3b82f6",
  type = 'area',
  showVolume = true,
  height = 350 
}: StockChartProps) {
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Check if we have valid data to display
  const hasValidData = data && data.length > 0;
  
  // Prepare data for chart only if we have valid data
  const seriesData = hasValidData ? (type === 'area' 
    ? data.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.price
      }))
    : data.map(item => ({
        x: new Date(item.date).getTime(),
        y: [item.open, item.high, item.low, item.close]
      }))) : [];
      
  const volumeData = hasValidData ? data.map(item => ({
    x: new Date(item.date).getTime(),
    y: item.volume
  })) : [];
  
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
    colors: [color],
    grid: {
      borderColor: 'rgba(107, 114, 128, 0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false
        }
      },
    },
    stroke: {
      curve: 'smooth',
      width: type === 'area' ? 2 : 1,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100]
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
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
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
      theme: 'dark',
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
  if (!mounted) return <div style={{ height }} className="flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div></div>;
  if (!hasValidData) return <div style={{ height }} className="flex items-center justify-center text-muted-foreground">No data available</div>;

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ReactApexChart
          options={chartOptions as any}
          series={[{
            name: type === 'area' ? 'Price' : 'Candle',
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
    </div>
  );
}