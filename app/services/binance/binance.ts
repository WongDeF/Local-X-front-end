// app/services/binance/binance.ts

// 根据环境自动切换 Base URL
const BASE_URL = import.meta.env.DEV
  ? '/api'                    // 本地开发：走 Vite proxy
  : 'https://api.binance.com'; // 生产环境：直接调用币安

/**
 * 通用请求封装
 */
const request = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Binance API 请求失败: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// ==================== 你项目中实际使用的方法 ====================

export const getTicker = async (symbol: string) => {
  return request(`/api/v3/ticker/price?symbol=${symbol}`);
};

export const getKlines = async (
  symbol: string, 
  interval: string = '1m', 
  limit: number = 100
) => {
  return request(`/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
};

export const get24hrTicker = async (symbol?: string) => {
  const path = symbol 
    ? `/api/v3/ticker/24hr?symbol=${symbol}` 
    : '/api/v3/ticker/24hr';
  return request(path);
};

export const getExchangeInfo = async () => {
  return request('/api/v3/exchangeInfo');
};

// 如果你还有其他接口，继续在这里添加...

// 默认导出（方便统一导入）
export default {
  getTicker,
  getKlines,
  get24hrTicker,
  getExchangeInfo,
};