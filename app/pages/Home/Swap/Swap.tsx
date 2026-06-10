import { memo } from "react"
import { useTranslation } from "react-i18next"
import { ArrowRightOutlined } from '@ant-design/icons'
import HoverShowDom from "~/conponents/HoverShowDom"
import SymbolRate from "~/conponents/Cryptocurrency/SymbolRate"
import SymbolPrice from "~/conponents/Cryptocurrency/SymbolPrice"
import SymbolImg from "~/conponents/Cryptocurrency/SymbolImg"
interface AprDataType {
    symbol: string
    name: string
    apr: string
    chain: string
}
type ExcDataType = string[]
type DataType = ExcDataType | AprDataType[]
const ExcItems = ({ data }: { data: ExcDataType }) => {
    return <>
        {
            data.map(i => {
                return <div className="flex justify-between items-center h-20 py-2 border-b border-gray-500 hover:scale-102 transition text-[#f4eeff]" key={i}>
                    <SymbolImg symbol={i} h={40} w={40} />
                    <span className="text-2xl ml-2 mr-4">{i}</span>
                    <SymbolPrice symbol={i} />
                </div>
            })
        }
    </>
}
const AprItems = ({ data }: { data: AprDataType[] }) => {
    return <>
        {
            data.map(i => {
                return <div className="flex justify-between items-center h-20 py-2 border-b border-gray-500 hover:scale-102 transition">
                    <div className="flex items-center">
                        <SymbolImg symbol={i.symbol} h={40} w={40} />
                        <div className="text-[#f4eeff] flex flex-col ml-2">
                            <span className="text-2xl">{i.name}</span>
                            <span className="text-xs">{i.chain}</span>
                        </div>
                    </div>
                    <span className="text-green-600">{i.apr}</span>
                </div>
            })
        }
    </>
}
const Item = ({ title, sTitle, comp }: { title: string, sTitle: string, comp: React.ReactNode }) => {
    return <div className="rounded-4xl p-4 bg-[#27262c] cursor-pointer hover:transform-[translateY(-6px)] transition">
        <div className="flex justify-between items-center">
            <div className="text-white">
                <p className="text-3xl font-bold">{title}</p>
                <p className="mt-2">{sTitle}</p>
            </div>
            <HoverShowDom>
                <div className={`px-8 py-2 bg-[#1FC7D4] rounded-3xl`}>
                    <ArrowRightOutlined style={{ color: '#fff' }} />
                </div>
            </HoverShowDom>
        </div>
        {
            comp
        }
    </div>
}
export const Swap = () => {
    const { t } = useTranslation()
    const excData: DataType = ['BTC', 'ETH', 'SOL']
    const aprData: DataType = [{
        symbol: 'SOL',
        name: 'USDT/SOL',
        apr: '32.22%',
        chain: 'BNB Chain'
    }, {
        symbol: 'BNB',
        name: 'USDT/BNB',
        apr: '47.67%',
        chain: 'Base'
    }, {
        symbol: 'PEPE',
        name: 'USDT/PEPE',
        apr: '38.84%',
        chain: 'Base'
    }]
    return <div className="grid h-auto gap-3 grid-cols-1 lg:grid-cols-2 shadow-[rgba(0, 0, 0, 0.05) 0px 4px 12px]">
        <Item title={t('swap.homeTitle')} sTitle={t('swap.homeSubTitle')} comp={<ExcItems data={excData} />} />
        <Item title={t('swap.homeTitleFee')} sTitle={t('swap.homeSubTitleFee')} comp={<AprItems data={aprData} />} />
    </div>
}
export default memo(Swap)