import service from '~/services/request'
import { type AxiosResponse } from 'axios';
// 深度信息
export function getDepth(params: {
  symbol: string,
  limit?: number
}) : Promise<AxiosResponse<DepthResponse>>{
  return service.get('/binance/api/v3/depth', { params })
}

// 近期成交
export function getTrades(params: {
  symbol: string,
  limit?: number
}) : Promise<AxiosResponse<Array<Trade>>>{
  return service.get('/binance/api/v3/trades', { params })
}

// 24hr价格变动情况
export function getTicker24hr(params: {
  symbols?: string
}) : Promise<Array<Ticker24hr>>{
  return service.get('/binance/api/v3/ticker/24hr', { params })
}