"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { HistoricalDataPoint } from "@/lib/stockData";
import { Button } from "../ui/Button";
import { formatCurrency } from "@/lib/utils";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface StockChartProps {
  data: HistoricalDataPoint[];
  color?: string;
  type?: 'area' | 'candlestick';
  showVolume?: boolean;
  height?: number;
}

type TimeRange = "1W" | "1M" | "3M" | "1Y" | "All";

export function StockChart({ 
  data, 
  color = "#3b82f6",
  type = 'area',
  showVolume = true,
  height = 400 
}: StockChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Filter data based on selected time range
  const filteredData = () => {
    if (timeRange === "1W") return data.slice(-7);
    if (timeRange === "1M") return data.slice(-30);
    if (timeRange === "3M") return data.slice(-90);
    if (timeRange === "1Y") return data.slice(-365);
    return data;
  };
  
  const chartData = filteredData();
  
  // Prepare data for chart
  const seriesData = type === 'area' 
    ? chartData.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.price
      }))
    : chartData.map(item => ({
        x: new Date(item.date).getTime(),
        y: [item.open, item.high, item.low, item.close]
      }));
      
  const volumeData = chartData.map(item => ({
    x: new Date(item.date).getTime(),
    y: item.volume
  }));
  
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
      mode: 'light', // Will respect system theme with CSS variables
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
    } : undefined,
  };
  
  // Volume chart options
  const volumeOptions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      type: 'bar',
      height: 100,
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
  
  const timeRangeButtons: TimeRange[] = ["1W", "1M", "3M", "1Y", "All"];

  if (!mounted) return <div style={{ height }} />;

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-1">
        {timeRangeButtons.map((range) => (
          <motion.div 
            key={range}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            <Button
              variant={timeRange === range ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="h-7 px-2 text-xs"
            >
              {range}
            </Button>
          </motion.div>
        ))}
      </div>
      
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
          className="mt-4"
        >
          <ReactApexChart
            options={volumeOptions as any}
            series={[{
              name: 'Volume',
              data: volumeData
            }]}
            type="bar"
            height={100}
          />
        </motion.div>
      )}
    </div>
  );
}