import { memo } from "react"
const Item = ({ title, sTitle } : { title: string, sTitle: string }) => {
    return <div className="rounded-4xl p-4 bg-[#27262c] cursor-pointer hover:transform-[translateY(-6px)] transition">
        <div className="flex justify-between">
            <div className="text-white">
                <p className="text-3xl font-bold">{ title }</p>
                <p className="mt-2">{ sTitle }</p>
            </div>
            <div>

            </div>
        </div>
    </div>
}
export const Swap = () => {
    return <div className="grid h-auto gap-3 grid-cols-1 lg:grid-cols-2 mt-10 shadow-[rgba(0, 0, 0, 0.05) 0px 4px 12px]">
        <Item title='以最优价格兑换' sTitle='手续费低至 0.01%'/>
        <Item title='赚取交易手续费' sTitle='通过提供流动性'/>
    </div>
  }
  export default memo(Swap)