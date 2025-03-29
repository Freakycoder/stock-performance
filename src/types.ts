export interface MarketIndexData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  changePercentage: number;
  data: { date: string; value: number }[];
  region: string;
  value: number;
  open: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  description: string;
  components: string[];
} 