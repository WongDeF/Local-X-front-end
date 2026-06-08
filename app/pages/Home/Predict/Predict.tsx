import { memo } from "react"
import type { Event, Market } from "~/services/polymarket/polymarket.types"
import usePredictStore from "~/store/usePredictStore"
import { formatVolume, toPercent } from "~/utils/formatPrice"
import { HoverSwitchText } from "~/conponents/HoverSwitchText"

const RenderHoverSwitchText = ({
  outcomesParse,
  outcomePricesParse,
  clasName
}: { outcomesParse: string, outcomePricesParse: string, clasName: string }) => {
  return <HoverSwitchText
    normal={outcomesParse}
    hover={toPercent(outcomePricesParse)}
    className={`py-1 w-10 rounded-sm inline-block cursor-pointer text-center text-xs transition-all hover:text-white ${clasName}`}
  />
}
const Markets = ({ markets }: { markets: Market[] }) => {
  return <div className="flex-2 flex flex-col justify-center gap-3">
    {
      markets.map((market) => {
        const { outcomes, outcomePrices } = market
        const outcomesParse = JSON.parse(outcomes) as [string, string]
        const outcomePricesParse = JSON.parse(outcomePrices) as [string, string]
        return <div className="flex justify-between">
          <p className="text-white text-sm">{market.groupItemTitle}</p>
          <div className="flex gap-2">
            <RenderHoverSwitchText outcomesParse={outcomesParse[0]} outcomePricesParse={outcomePricesParse[0]} clasName="text-green-700 bg-green-700/15 hover:bg-green-700" />
            {/* 第二个选项 */}
            <RenderHoverSwitchText outcomesParse={outcomesParse[1]} outcomePricesParse={outcomePricesParse[1]} clasName="text-red-700 bg-red-700/15 hover:bg-red-700 " />
          </div>
        </div>
      })
    }
  </div>
}
const Market = ({ market }: { market: Market }) => {
  const { outcomes, outcomePrices } = market
  const outcomesParse = JSON.parse(outcomes) as [string, string]
  const outcomePricesParse = JSON.parse(outcomePrices) as [string, string]
  return <div className="flex gap-2">
    <RenderHoverSwitchText outcomesParse={outcomesParse[0]} outcomePricesParse={outcomePricesParse[0]} clasName="text-green-700 bg-green-700/15 hover:bg-green-700 flex-1" />
    {/* 第二个选项 */}
    <RenderHoverSwitchText outcomesParse={outcomesParse[1]} outcomePricesParse={outcomePricesParse[1]} clasName="text-red-700 bg-red-700/15 hover:bg-red-700 flex-1" />
  </div>
}
const PredictItem = ({ item }: { item: Event }) => {
  const { icon, title, markets, volume } = item
  return <div className="relative flex flex-col justify-between p-2 rounded-xl shadow-md shadow-black/4 min-h-[180px] h-full overflow-hidden pt-3 group/card transition hover:-translate-y-px hover:shadow-black/8 hover:shadow-md bg-[#333c37] hover:bg-[#242b32] border">
    <div className="flex items-center gap-2">
      <div className="overflow-hidden rounded-sm relative w-[38px] min-w-[38px] h-[38px]">
        <img src={`${icon}`} className="rounded-full object-cover absolute w-full h-full inset-0" alt={`${title}`} />
      </div>
      <p className=" text-white cursor-pointer text-base">{title}</p>
    </div>
    {
      markets.length > 1 ? <Markets markets={markets.sort((a, b) => b.lastTradePrice - a.lastTradePrice).slice(0, 2)} /> : <Market market={markets[0]} />
    }
    <div>
      <p className="text-xs text-gray-400">$<span>{formatVolume(volume)}</span>交易量</p>
    </div>
  </div>
}

export const Predict = () => {
  const { list } = usePredictStore()
  return <div className="grid h-auto gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {
      list.map(x => {
        return <PredictItem item={x}></PredictItem>
      })
    }
  </div>
}
export default memo(Predict)