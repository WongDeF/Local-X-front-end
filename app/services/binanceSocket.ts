
type TickerCallback = (data: WsTickerMessage) => void;

class BinanceWebSocket {
  private ws: WebSocket | null = null;
  private subscribers: Map<string, Set<TickerCallback>> = new Map(); // symbol -> callbacks
  private reconnectTimer: NodeJS.Timeout | null = null;
  private url: string;

  constructor(baseUrl = 'wss://stream.binance.com:9443/stream') {
    this.url = baseUrl;
  }

  // 订阅一个或多个 symbol 的 ticker 流
  subscribe(symbols: string[], callback: TickerCallback) {
    // 为每个 symbol 存储回调
    symbols.forEach(sym => {
      const lowerSym = sym.toLowerCase();
      if (!this.subscribers.has(lowerSym)) {
        this.subscribers.set(lowerSym, new Set());
      }
      this.subscribers.get(lowerSym)!.add(callback);
    });
    this.connectIfNeeded();
  }

  // 取消订阅
  unsubscribe(symbols: string[], callback: TickerCallback) {
    symbols.forEach(sym => {
      const lowerSym = sym.toLowerCase();
      const callbacks = this.subscribers.get(lowerSym);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.subscribers.delete(lowerSym);
        }
      }
    });
    if (this.subscribers.size === 0) {
      this.disconnect();
    }
  }

  private connectIfNeeded() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return;
    if (this.ws && this.ws.readyState === WebSocket.CONNECTING) return;
    this.connect();
  }

  private connect() {
    const streams = Array.from(this.subscribers.keys())
      .map(sym => `${sym}@ticker`)
      .join('/');
    const wsUrl = `${this.url}?streams=${streams}`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    };

    this.ws.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data);
        const tickerMsg = raw.data as WsTickerMessage;
        const symbol = tickerMsg.s.toLowerCase();
        const callbacks = this.subscribers.get(symbol);
        if (callbacks) {
          callbacks.forEach(cb => cb(tickerMsg));
        }
      } catch (err) {
        console.error('WS parse error', err);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected, reconnecting in 3s...');
      this.reconnectTimer = setTimeout(() => this.connect(), 3000);
    };
  }

  private disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}

// 导出单例（或者也可以不导出单例，让调用方自行管理）
export const binanceSocket = new BinanceWebSocket();