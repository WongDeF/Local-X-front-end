// 单个深度档位：价格和数量都是字符串（保留精度）
type DepthEntry = [price: string, quantity: string];
// 深度响应结构
interface DepthResponse {
  lastUpdateId: number;
  bids: DepthEntry[];   // 买单，按价格降序
  asks: DepthEntry[];   // 卖单，按价格升序
}
// 近期成交
interface Trade {
  id: number;              // 交易ID
  price: string;           // 成交价格（字符串保留精度）
  qty: string;             // 成交数量（基础资产数量）
  quoteQty: string;        // 成交金额（报价资产数量）
  time: number;            // 成交时间戳（毫秒）
  isBuyerMaker: boolean;   // 买方是否是挂单方
  isBestMatch: boolean;    // 是否为最优匹配成交
}
// 24hr 统计接口（你提供的 Trades 其实对应 Binance 的 24hr ticker）
interface Ticker24hr {
  symbol: string;                  // 交易对符号
  priceChange: string;             // 绝对价格变动
  priceChangePercent: string;      // 相对价格变动百分比
  weightedAvgPrice: string;        // 加权平均价格
  openPrice: string;               // 开盘价
  highPrice: string;               // 最高价
  lowPrice: string;                // 最低价
  lastPrice: string;               // 最新价
  volume: string;                  // 基础资产成交量
  quoteVolume: string;             // 报价资产成交量
  openTime: number;                // 开盘时间戳（毫秒）
  closeTime: number;               // 收盘时间戳（毫秒）
  firstId: number;                 // 区间内第一个交易ID
  lastId: number;                  // 区间内最后一个交易ID
  count: number;                   // 区间内交易数量
}

// WebSocket 推送的消息格式（单个 symbol 的 24hr ticker 更新）
interface WsTickerMessage {
  e: string;        // 事件类型 "24hrTicker"
  E: number;        // 事件时间
  s: string;        // 交易对
  p: string;        // 价格变动
  P: string;        // 价格变动百分比
  w: string;        // 加权平均价
  c: string;        // 最新价
  Q: string;        // 最新交易成交量
  o: string;        // 开盘价
  h: string;        // 最高价
  l: string;        // 最低价
  v: string;        // 基础资产成交量
  q: string;        // 报价资产成交量
  O: number;        // 统计开始时间
  C: number;        // 统计结束时间
  F: number;        // 第一个交易 ID
  L: number;        // 最后一个交易 ID
  n: number;        // 交易数量
}

interface WsTickerMessageMini {
  e: string;        // 事件类型 "24hrTicker"
  E: number;        // 事件时间
  s: string;        // 交易对
  c: string;        // 最新价
  Q: string;        // 最新交易成交量
  o: string;        // 开盘价
  h: string;        // 最高价
  l: string;        // 最低价
  v: string;        // 基础资产成交量
  q: string;        // 报价资产成交量
}