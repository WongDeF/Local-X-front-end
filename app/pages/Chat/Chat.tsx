import { Button, Input } from "antd"
import { memo, useState } from "react"
import { ArrowUpOutlined, CloseOutlined} from '@ant-design/icons'
interface ListItem {
    title: string
    id: number
    type: string
}
const Chat = () => {
    const hisList= [
        {
            title: '今天成都的天气如何？',
            id: 233
        },
        {
            title: '今天成都的天气如何？',
            id: 2331
        },
        {
            title: '今天成都的天气如何？',
            id: 2332
        },
        {
            title: '今天成都的天气如何？',
            id: 2333
        },
        {
            title: '今天成都的天气如何？',
            id: 2334
        },
        {
            title: '今天成都的天气如何？',
            id: 2335
        },
        {
            title: '今天成都的天气如何？',
            id: 2336
        },
        {
            title: '今天成都的天气如何？',
            id: 2337
        },
        {
            title: '今天成都的天气如何？',
            id: 2338
        },
        {
            title: '今天成都的天气如何？',
            id: 2339
        }
    ]
    const [question, setQuestion] = useState('')
    const [isReply, setIsReply] = useState(false)
    const [sendQuetionsList, setSendQuetionsList] = useState<ListItem[]>([])
    const sendMessage = () => {
        setIsReply(isReply ? false : true)
        setSendQuetionsList([...sendQuetionsList, {title: question, id: 996, type: 'user'}])
        setQuestion('')
    }
    return <div className="flex-1 w-full flex mt-20 rounded-4xl overflow-hidden bg-gray-600/50">
        <div className="w-full h-[666px] flex gap-4 m-4 rounded-4xl overflow-hidden bg-gray-500/50">
            <div className="h-full w-[200px] bg-white py-4 overflow-hidden">
                {
                    hisList.map(x => {
                        return <div key={x.id} className="mr-4 px-4 py-2 hover:bg-gray-400 cursor-pointer truncate rounded-br-full rounded-tr-full transition" title={x.title}>
                            {x.title}
                        </div>
                    })
                }
            </div>
            <div className={`flex-1 bg-white py-4 flex flex-col ${isReply ? 'justify-between' : 'justify-center'}`}>
                {
                    isReply && <div>
                        思考中...
                    </div>
                }
                <div className="mx-4 bg-gray-300 rounded-2xl overflow-hidden">
                    <Input.TextArea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="pleace input you question!" autoSize={{ minRows: 2, maxRows: 6 }} style={{ backgroundColor: 'transparent', padding: '10px 20px' }}                    />
                    <div className="flex justify-end">
                        <Button className="bg-transparent mr-2 mb-1" disabled={!question && !isReply} onClick={() => sendMessage()} type="primary" shape="circle" icon={ isReply ? <CloseOutlined/> : <ArrowUpOutlined />} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default memo(Chat)