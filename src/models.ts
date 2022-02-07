export interface OrderbookParams {
  trading_pair: string,
  limit: 10 | 50 | 100
}

export interface SellBuyDetails {
  ra: number ,
  ca: number,
  sa: number,
  pa: number,
  co: number,
  val: number
}

export interface ResponseDetails {
  sell?: SellBuyDetails[],
  buy?: SellBuyDetails[],
  spread?: number
  status?: "Ok" | "Fail",
  timestamp?: string,
  seqNo?: string
}