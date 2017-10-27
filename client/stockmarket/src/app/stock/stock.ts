export interface IStock {
  code: string;
  _id?: string;

  // Output from API:
  Status?: 'SUCCESS' | string;
  Name: string;
  Symbol: string;
  LastPrice?: number;
  Change?: number;
  ChangePercent?: number;
  Timestamp?: string;
  MSDate?: number;
  MarketCap?: number;
  Volume?: number;
  ChangeYTD?: number;
  ChangePercentYTD?: number;
  High?: number;
  Low?: number;
  Open?: number;
}
