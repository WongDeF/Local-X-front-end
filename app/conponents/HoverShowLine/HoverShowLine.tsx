import React, { memo, useState } from 'react';
import './HoverShowLine.css';

type DirectionKey = 'ltor' | 'rtol' | 'ttob' | 'btot';

interface Direction {
    ltor: string
    rtol: string
    ttob: string
    btot: string
}

const detectDirection = (e: React.MouseEvent<HTMLDivElement>): DirectionKey => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const min = Math.min(y, rect.height - y, x, rect.width - x);
    if (min === y) return 'ttob';
    if (min === rect.height - y) return 'btot';
    if (min === x) return 'ltor';
    return 'rtol';
};

const HoverShowLine = (props: { children: React.ReactNode, direction: Direction | DirectionKey, className?: string }) => {
    const [active, setActive] = useState<DirectionKey | ''>('');
    const isFixed = typeof props.direction === 'string';
    const dir = isFixed ? props.direction : active;
    const lineColor = !isFixed && active ? (props.direction as Direction)[active] : undefined;

    return (
        <div
            className={`cursor-pointer hover:text-(--main-color) hover-show-line ${dir} ${props.className ?? ''}`}
            style={lineColor ? { '--line-color': lineColor } as React.CSSProperties : undefined}
            onMouseEnter={(e) => !isFixed && setActive(detectDirection(e))}
            onMouseLeave={() => !isFixed && setActive('')}
        >
            {props.children}
        </div>
    );
}

export default memo(HoverShowLine);
