export interface TransactionResData {
  id: string;
  isBestMatch: boolean;
  isBuyerMaker: boolean;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
}

export interface OptionParams {
  prices: string[];
  volumes: string[];
  timestamps: string[];
}
