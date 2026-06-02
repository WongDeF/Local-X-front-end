import { memo } from "react";
import { Col } from 'antd';
import { useTickerStore } from '~/store/UseTickerStore';
const Item = memo(({symbol}: {symbol: string}) => {
  const ticker = useTickerStore((state) => state.tickers[symbol]);
  return <div className="flex justify-between text-white">
    <span>{symbol}</span>
    <span>{ticker?.lastPrice}</span>
  </div>
})
export const TickerCard = ({ symbols }: { symbols: Array<string> }) => {
    return  <Col xs={24} lg={8}>
        <div className="mt-2 p-4 bg-[var(--main-color)] rounded-2xl">
          {
            symbols.map(x=>{
              return <Item symbol={x} key={x}/>
            })
          }
        </div>
    </Col>
}
export default memo(TickerCard)