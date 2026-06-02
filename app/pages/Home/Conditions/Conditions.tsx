import { memo, useEffect } from "react";
import { Row } from 'antd';
import { useTickerStore } from '~/store/useTickerStore';
import TickerCard from "./TickerCard";
const resSymbols = ["BTCUSDT", "ETHUSDT", "PEPEUSDT", "BNBUSDT", "DOGEUSDT", "XRPUSDT", "SOLUSDT", "SUIUSDT"]
const Conditions = () => {
    const { tickers, isLoading, error, initTickers, cleanup } = useTickerStore();
    useEffect(() => {
        initTickers(resSymbols);   // 批量初始化
        return () => cleanup(); // 清理
    }, []);

    if (isLoading) return <div>Loading market data...</div>;
    if (error) return <div>Error: {error}</div>;
    return <div className="mx-2">
        <Row gutter={20}>
            <TickerCard key='hot' symbols={resSymbols} />
            <TickerCard key='new' symbols={resSymbols} />
            <TickerCard key='vom' symbols={resSymbols} />
        </Row>
    </div>
}
export default memo(Conditions)