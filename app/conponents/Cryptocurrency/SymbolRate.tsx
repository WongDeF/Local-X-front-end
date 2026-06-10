import { memo } from "react";
import { useTickerStore } from "~/store/useTickerStore";
import { isGrowth } from '~/utils/formatPrice';
import { transfromSymbolNeedUSDT } from "~/utils/transfrom";
const SymbolRate = ({symbol, className = ''} : { symbol: string, className?: string }) => {
    const safeSymbol = transfromSymbolNeedUSDT(symbol)
    const ticker = useTickerStore((state) => state.tickers[safeSymbol]);
    return <>
        <span className={
        `${isGrowth(ticker?.priceChangePercent) ? 'text-red-600' : 'text-green-600'} flex-1 text-right`
        }>{ticker?.priceChangePercent || 0}%</span> 
    </>
}

export default memo(SymbolRate);