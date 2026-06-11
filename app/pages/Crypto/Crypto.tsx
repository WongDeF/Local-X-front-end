import { useId, useState, memo } from "react";
import type { Route } from "./+types/Crypto";
import Rank from "./Rank/Rank";
import Overview from "./Overview/Overview";
import { useTranslation } from "react-i18next";
import HoverShowLine from "~/conponents/HoverShowLine/HoverShowLine";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Local-X-crypto" },
    { name: "description", content: "Welcome to Local-X-crypto!" },
  ];
}
const Tabs = memo((props: {tabIndex: number, setTabIndex: any, pId: string}) => {
  const { t } = useTranslation()
  const tabs = [{
    idx: 1,
    name: t('crypto.overview'),
  },{
    idx: 2,
    name: t('crypto.rank')
  }]
  return <div className="py-4 text-gray-400 flex items-center gap-4 ">
    {
      tabs.map(x=>{
        return <HoverShowLine direction='ltor'>
          <span className={` ${props.tabIndex === x.idx ? 'text-(--main-color)' : ''}`} onClick={() => props.setTabIndex(x.idx)} key={`${props.pId}-tabs-${x}`}>{x.name}</span>
        </HoverShowLine>
      })
    }
  </div>
})
export default function Crypto() {
  const id = useId()
  const [ tabIndex, setTabIndex ] = useState(1)
  return <div className="w-full pb-40">
      <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} pId={id}/>
      {
        tabIndex === 1 ? <Overview></Overview> : <Rank></Rank>
      }
  </div>;
}
