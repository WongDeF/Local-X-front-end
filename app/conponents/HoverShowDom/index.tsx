import { memo, useState } from "react"

const HoverShowDom = ({ children } : { children: React.ReactNode}) => {
    const [ isHover, setIsHover ] = useState(false)
    return <div className={`${isHover ? 'opacity-100' : 'opacity-0'} transition`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        { children }
    </div>
}

export default memo(HoverShowDom)