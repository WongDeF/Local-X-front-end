import { memo } from "react";
import SymbolImg from "~/conponents/Cryptocurrency/SymbolImg";
import SymbolDom from "~/conponents/Cryptocurrency/SymbolDom";
import { useTranslation } from "react-i18next";
import SymbolPrice from "~/conponents/Cryptocurrency/SymbolPrice";
const Title = memo(({ title, moreShow }: { title: string, moreShow?: boolean}) => {
  const { t } = useTranslation();
  return <div className="flex items-center justify-between border-b border-gray-700 px-4 py-2 text-white text-base hover:text-white">
    <p className="">{t(`home.${title}`)}</p>
    {
      moreShow  ? <span className="cursor-pointer text-xs!">{t('public.more')} <span className="text-gray-600">{`>`}</span></span> : 
      <span></span>
    }
  </div>
})

const Item = memo(({ symbol }: { symbol: string }) => {
  return <div className="flex justify-between items-center text-gray-200 cursor-pointer">
    <SymbolImg symbol={symbol}/>
    <SymbolDom symbol={symbol}/>
    {/* <span className="flex-1 text-sm max-sm:hidden">${formatPrice(ticker?.lastPrice || 0)}</span> */}
    <SymbolPrice symbol={symbol}/>
  </div>
})

export const TickerCard = ({ symbols, title, moreShow = true }: { symbols: Array<string>, title: string, moreShow?: boolean }) => {
  return <div className="border border-gray-700 rounded-2xl">
    <Title title={title} moreShow={moreShow}/>
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