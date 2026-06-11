import { memo, useId } from "react"
const formatSymbol = (symbol: string): string => {
  return symbol.split('USDT')[0].toLocaleLowerCase()
}
const SymbolDom = memo(({ symbol }: { symbol: string }) => {
  return <span className="p-2 font-bold flex-1 text-xl">{formatSymbol(symbol)} <span className="text-xs">usdt</span></span>
})
export default SymbolDom;