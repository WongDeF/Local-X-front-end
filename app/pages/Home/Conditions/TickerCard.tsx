import { memo } from "react";
import { useTickerStore } from '~/store/useTickerStore';
import { formatPrice, isGrowth } from '~/utils/formatPrice';
import SymbolImg from "~/conponents/Cryptocurrency/SymbolImg";
import SymbolDom from "~/conponents/Cryptocurrency/SymbolDom";
import { useTranslation } from "react-i18next";
const Title = memo(({ title }: { title: string }) => {
  const { t } = useTranslation();
  return <div className="flex items-center justify-between border-b border-gray-700 px-4 py-2 text-white text-base hover:text-white">
    <p className="">{t(`home.${title}`)}</p>
    <span className="cursor-pointer text-xs!">{t('public.more')} <span className="text-gray-600">{`>`}</span></span>
  </div>
})

const Item = memo(({ symbol }: { symbol: string }) => {
  const ticker = useTickerStore((state) => state.tickers[symbol]);
  return <div className="flex justify-between items-center text-gray-200 cursor-pointer">
    <SymbolImg symbol={symbol}/>
    <SymbolDom symbol={symbol}/>
    <span className="flex-1 text-sm max-sm:hidden">${formatPrice(ticker?.lastPrice || 0)}</span>
    <span className={
      `${isGrowth(ticker?.priceChangePercent) ? 'text-red-600' : 'text-green-600'} flex-1 text-right`
    }>{ticker?.priceChangePercent || 0}%</span>
  </div>
})

export const TickerCard = ({ symbols, title }: { symbols: Array<string>, title: string }) => {
  return <div className="border border-gray-700 rounded-2xl">
    <Title title={title} />
    <div className="my-2 mx-4">
      {
        symbols.map(x => {
          return <Item symbol={x} key={x} >
          </Item>
        })
      }
    </div>
  </div>
}
export default memo(TickerCard)