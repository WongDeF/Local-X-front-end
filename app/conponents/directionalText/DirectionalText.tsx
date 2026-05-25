'use client';

import React, { useState } from 'react';
import { NavLink } from "react-router";
import './DirectionalText.css';

interface DirectionalTextProps {
  children: React.ReactNode;
  className?: string;
  fillColor?: string;
  defaultColor?: string;
  duration?: number;
  path: string
}

export default function DirectionalText({
  children,
  className = '',
  fillColor = '#3b82f6',
  defaultColor = '#ffffff',
  duration = 0.6,
  path = '/'
}: DirectionalTextProps) {
  const [direction, setDirection] = useState<'top' | 'right' | 'bottom' | 'left' | ''>('');

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    const top = y;
    const bottom = h - y;
    const left = x;
    const right = w - x;
    const min = Math.min(top, bottom, left, right);
    if (min === top) setDirection('bottom');
    else if (min === bottom) setDirection('top');
    else if (min === left) setDirection('right');
    else setDirection('left');
  };

  const handleMouseLeave = () => {
    setDirection('');
  };

  return (
    <div
      className={`directional-wrapper ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        <NavLink to={path}>
          <span 
            className={`directional-text ${direction}`}
            style={{
              '--fill-color': fillColor,
              '--default-color': defaultColor,
              '--duration': `${duration}s`,
            } as React.CSSProperties}
          >
            {children}
          </span>
      </NavLink>
    </div>
  );
}