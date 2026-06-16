import { create } from 'zustand';
import BigNumber from 'bignumber.js';
import { getTicker24hr } from '~/services/binance/binance';
import { binanceSocket } from '~/services/socket/binanceSocket';
interface TickerState {
  tickers: Record<string, Ticker24hr>;
  allTickers: Array<WsTickerMessageMini>
  isLoading: boolean;
  error: string | null;
  subscribedSymbols: Set<string>;
  // 内部使用：待处理的更新队列
  _pendingUpdates: Map<string, Ticker24hr>;
  _rafId: number | null;
}

interface TickerActions {
  initTickers: (symbols: string[]) => Promise<void>;
  updateTickerFromWs: (msg: WsTickerMessage) => void;
  updateAllTicker: (msg: any) => void;
  cleanup: () => void;
  _flushUpdates: () => void;
  _scheduleFlush: () => void;
}

export const useTickerStore = create<TickerState & TickerActions>((set, get) => ({
  tickers: {},
  allTickers: [],
  isLoading: false,
  error: null,
  subscribedSymbols: new Set(),
  _pendingUpdates: new Map(),
  _rafId: null,
  updateAllTicker: (miniTickers) => {
    const { tickers, _pendingUpdates, _scheduleFlush } = get();
    // 如果没有初始数据，可能忽略（或者可以动态添加，但一般应已初始化）
    if (Object.keys(tickers).length === 0) return;

    let hasUpdates = false;
    for (const mini of miniTickers) {
      const symbol = mini.s;
      const current = tickers[symbol];
      if (!current) continue;
      // 使用 BigNumber 精确计算涨跌幅
      const currentPrice = new BigNumber(mini.c);
      const openPrice = new BigNumber(mini.o);
      let priceChangePercent = '0.00'; // 默认两位小数
      if (!openPrice.isZero()) {
        priceChangePercent = currentPrice.minus(openPrice).div(openPrice).times(100).toFixed(2);
      }

      // 更新字段（保留原有字段，更新 miniTicker 提供的字段）
      const updated: Ticker24hr = {
        ...current,
        lastPrice: mini.c,
        openPrice: mini.o,
        highPrice: mini.h,
        lowPrice: mini.l,
        volume: mini.v,
        quoteVolume: mini.q,
        priceChangePercent, // 更新计算后的涨跌幅
      };

      _pendingUpdates.set(symbol, updated);
      hasUpdates = true;
    }
    if (hasUpdates) {
      _scheduleFlush();
    }
  },
  // 将 webSocket 消息加入待处理队列，不立即更新状态
  updateTickerFromWs: (msg) => {
    const symbol = msg.s;
    const currentTicker = get().tickers[symbol];
    if (!currentTicker) return; // 未初始化，忽略

    const updated: Ticker24hr = {
      symbol,
      priceChange: msg.p,
      priceChangePercent: msg.P,
      weightedAvgPrice: msg.w,
      openPrice: msg.o,
      highPrice: msg.h,
      lowPrice: msg.l,
      lastPrice: msg.c,
      volume: msg.v,
      quoteVolume: msg.q,
      openTime: msg.O,
      closeTime: msg.C,
      firstId: msg.F,
      lastId: msg.L,
      count: msg.n,
    };

    get()._pendingUpdates.set(symbol, updated);
    get()._scheduleFlush();
  },

  _scheduleFlush: () => {
    const { _rafId } = get();
    if (_rafId !== null) return; // 已经调度了一次
    const id = requestAnimationFrame(() => {
      get()._flushUpdates();
    });
    set({ _rafId: id });
  },

  _flushUpdates: () => {
    const { _pendingUpdates, tickers } = get();
    if (_pendingUpdates.size === 0) {
      set({ _rafId: null });
      return;
    }
    // 合并所有待处理更新
    const newTickers = { ...tickers };
    for (const [symbol, updated] of _pendingUpdates.entries()) {
      newTickers[symbol] = updated;
    }
    set({
      tickers: newTickers,
      _pendingUpdates: new Map(),
      _rafId: null,
    });
  },

  initTickers: async (symbols: string[]) => {
    const currentSet = get().subscribedSymbols;
    const newSet = new Set(symbols);
    const isSame = symbols.length === currentSet.size && symbols.every(s => currentSet.has(s));
    if (isSame && Object.keys(get().tickers).length === symbols.length) return;

    get().cleanup();
    set({ isLoading: true, error: null, _pendingUpdates: new Map(), _rafId: null });
    try {
        // 1. 一次请求获取所有交易对数据
      const res = await getTicker24hr({});
      const allTickers = res;
      // 2. 过滤出需要的 symbols
      const filteredTickers: Record<string, Ticker24hr> = {};
      for (const ticker of allTickers) {
        filteredTickers[ticker.symbol] = ticker;
      }
      set({ tickers: filteredTickers, subscribedSymbols: newSet, isLoading: false });
      binanceSocket.subscribe(symbols, get().updateTickerFromWs);
      binanceSocket.setAllickerCallback(get().updateAllTicker)
    } catch (error) {
      set({ error: 'Failed to load ticker data', isLoading: false });
    }
  },

  cleanup: () => {
    const { subscribedSymbols, updateTickerFromWs, _rafId } = get();
    if (subscribedSymbols.size) {
      binanceSocket.unsubscribe(Array.from(subscribedSymbols), updateTickerFromWs);
    }
    if (_rafId) cancelAnimationFrame(_rafId);
    set({
      tickers: {},
      subscribedSymbols: new Set(),
      error: null,
      _pendingUpdates: new Map(),
      _rafId: null,
    });
  },
}));