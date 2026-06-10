import { memo, useEffect, useId } from "react";
import { useTickerStore } from '~/store/useTickerStore';
import TickerCard from "./TickerCard";
const resSymbols = ["BTCUSDT", "ETHUSDT", "PEPEUSDT", "BNBUSDT", "DOGEUSDT", "XRPUSDT", "SOLUSDT", "SUIUSDT", "ADAUSDT"]
const Conditions = () => {
    const { tickers, isLoading, error, initTickers, cleanup } = useTickerStore();
    const id = useId()
    useEffect(() => {
        initTickers(resSymbols);   // 批量初始化
        return () => cleanup(); // 清理
    }, []);

    // if (isLoading) return <div>Loading market data...</div>;
    // if (error) return <div>Error: {error}</div>;
    return <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4" >
        <TickerCard key={`${id}-hot`} symbols={resSymbols.slice(0, 3)} title="hot" />
        <TickerCard key={`${id}-new`} symbols={resSymbols.slice(3, 6)} title="new"/>
        <TickerCard key={`${id}-volume`} symbols={resSymbols.slice(6, 9)} title="volume" />
    </div>
}
export default memo(Conditions)