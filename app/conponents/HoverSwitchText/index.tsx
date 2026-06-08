// components/HoverSwitchText/index.tsx
import React, { useState } from 'react';

export interface HoverSwitchTextProps {
  /** 默认显示的内容（React 节点） */
  normal: React.ReactNode;
  /** hover 时显示的内容（React 节点） */
  hover: React.ReactNode;
  /** 自定义类名（会保留基础样式类） */
  className?: string;
  /** 可选：是否禁用 hover 切换，默认 false */
  disabled?: boolean;
  /** 可选：点击回调 */
  onClick?: () => void;
  /** 可选：鼠标进入回调 */
  onMouseEnter?: () => void;
  /** 可选：鼠标离开回调 */
  onMouseLeave?: () => void;
}
export const HoverSwitchText: React.FC<HoverSwitchTextProps> = ({
  normal,
  hover,
  className = '',
  disabled = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
    onMouseLeave?.();
  };

  return (
    <span
      className={`inline-block cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {isHovered ? hover : normal}
    </span>
  );
};