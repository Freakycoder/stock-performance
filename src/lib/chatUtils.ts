import { formatCurrency } from './utils';
import { HistoricalDataPoint } from './types';

/**
 * Formats historical data points for various chart libraries
 */
export function formatHistoricalDataForApexCharts(
  data: HistoricalDataPoint[],
  type: 'area' | 'candlestick' = 'area'
) {
  if (type === 'area') {
    return data.map(item => ({
      x: new Date(item.date).getTime(),
      y: item.price,
    }));
  } else {
    return data.map(item => ({
      x: new Date(item.date).getTime(),
      y: [item.open, item.high, item.low, item.close],
    }));
  }
}

/**
 * Formats volume data for charts
 */
export function formatVolumeDataForCharts(data: HistoricalDataPoint[]) {
  return data.map(item => ({
    x: new Date(item.date).getTime(),
    y: item.volume,
  }));
}

/**
 * Formats data for Tremor charts
 */
export function formatDataForTremorCharts(data: HistoricalDataPoint[]) {
  return data.map(point => ({
    date: point.date,
    Price: point.price,
    Volume: point.volume,
  }));
}

/**
 * Get basic chart options for ApexCharts
 */
export function getBasicChartOptions(color: string = '#3b82f6') {
  return {
    chart: {
      type: 'area',
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
    colors: [color],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
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
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: function(value: number) {
          return formatCurrency(value);
        },
      },
    },
    grid: {
      borderColor: 'rgba(107, 114, 128, 0.1)',
      strokeDashArray: 3,
    },
  };
}