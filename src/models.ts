export interface OrderbookParams {
  trading_pair: string,
  limit: 10 | 50 | 100
}

export interface SellBuyDetails {
  ra: string ,
  ca: string,
  sa: string,
  pa: string,
  co: number
}

export interface ResponseDetails {
  sell?: SellBuyDetails[],
  buy?: SellBuyDetails[],
  status?: "Ok" | "Fail",
  timestamp?: string,
  seqNo?: string
}