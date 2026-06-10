import { memo } from "react";
import { useTickerStore } from "~/store/useTickerStore";
import { formatPrice, isGrowth } from '~/utils/formatPrice';
import { transfromSymbolNeedUSDT } from "~/utils/transfrom";
const SymbolPrice = ({symbol, needRate = true, className = ''} : { symbol: string, needRate?: boolean, className?: string }) => {
    const safeSymbol = transfromSymbolNeedUSDT(symbol)
    const ticker = useTickerStore((state) => state.tickers[safeSymbol]);
    return <>
        <span className="flex-1 text-sm max-sm:hidden">${formatPrice(ticker?.lastPrice || 0)}</span>
        {
            needRate ? <span className={
                `${isGrowth(ticker?.priceChangePercent) ? 'text-red-600' : 'text-green-600'} flex-1 text-right`
                }>{ticker?.priceChangePercent || 0}%</span> : ''
        }
    </>
}

export default memo(SymbolPrice);