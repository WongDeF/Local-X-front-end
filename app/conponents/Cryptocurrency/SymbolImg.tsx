import { memo } from "react";
const SymbolImg = memo(({symbol, w=24, h=24} : { symbol: string, w?: number, h?: number}) => {
    return <img className="rounded-full" referrerPolicy="no-referrer" width={w} height={h} src={`https://bin.bnbstatic.com/static/assets/logos/${symbol.split('USDT')[0]}.png`} alt="" />
});
export default SymbolImg;