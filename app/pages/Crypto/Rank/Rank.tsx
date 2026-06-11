import { memo, useId } from "react"
import TickerCard from "~/pages/Home/Conditions/TickerCard"
const resSymbols = ["BTCUSDT", "ETHUSDT", "PEPEUSDT", "BNBUSDT", "DOGEUSDT", "XRPUSDT", "SOLUSDT", "SUIUSDT", "ADAUSDT"]
const Rank = () => {
    const id = useId()
    return <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4">
    <TickerCard key={`${id}-hot`} symbols={resSymbols} title="hot" moreShow={false} />
    <TickerCard key={`${id}-gainers`} symbols={resSymbols} title="gainers" moreShow={false} />
    <TickerCard key={`${id}-losers`} symbols={resSymbols} title="losers" moreShow={false} />
  </div>
}
export default memo(Rank)