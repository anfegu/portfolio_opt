export interface CryptoInfo {
  id: string;
  name: string;
  symbol: string;
  category: string;
  description: string;
  website: string;
  technology: string[];
  team: string[];
  partnerships: string[];
}

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}
