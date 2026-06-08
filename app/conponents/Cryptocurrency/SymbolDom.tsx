import { memo } from "react"
import DirectionalText from "../DirectionalText"
const formatSymbol = (symbol: string): string => {
    return symbol.split('USDT')[0].toLocaleLowerCase()
}
const SymbolDom = memo(({symbol} : {symbol: string})=>{
    return <DirectionalText key={symbol + Math.random()}>
    <>
      <span className="flex-1 text-xl">{formatSymbol(symbol)} <span className="text-xs">usdt</span></span>
    </>
  </DirectionalText>
})
export default SymbolDom;