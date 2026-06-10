type Price = string | number;
const formatPrice = (price: Price) => {
    if (price === '') return '';
    const str = String(price).trim();
    const num = parseFloat(str);
    if (isNaN(num)) return str;

    // 判断是否为整数（误差容忍 1e-12）
    const isInteger = Math.abs(num - Math.round(num)) < 1e-12;
    if (isInteger) {
        return num.toFixed(2);  // 12.000 → "12.00"
    }

    // 非整数：先去尾部零，同时避免科学计数法
    // 直接用原始字符串去掉尾部零（更安全）
    const trimmed = str.replace(/\.?0+$/, '');
    if (trimmed.includes('.')) {
        return trimmed;
    }
    // 如果去掉尾部零后变成了整数（理论上不会进入这里，但留作保护）
    return num.toFixed(2);
};
const isGrowth = (rate: string) => {
    if (!rate) return false
    return rate.includes('-')
}
const formatVolume = (value: number | string, decimals: number = 0): string => {
    if (value === null || value === undefined || value === '') return '0';
    let num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '0';

    const absNum = Math.abs(num);
    let divisor = 1;
    let unit = '';

    if (absNum >= 1_000_000_000) {
        divisor = 1_000_000_000;
        unit = 'B';
    } else if (absNum >= 1_000_000) {
        divisor = 1_000_000;
        unit = 'M';
    } else if (absNum >= 1_000) {
        divisor = 1_000;
        unit = 'K';
    } else {
        return Math.floor(num).toString(); // 小于1000，取整
    }

    const converted = num / divisor;
    const integerPart = Math.floor(converted); // 直接取整，不保留小数
    return `${integerPart}${unit}`;
};

/**
 * 将小数转换为百分比字符串（四舍五入取整，无小数）
 * @param value - 小数，例如 0.1595
 * @returns 百分比字符串，例如 "16%"
 */
const toPercent = (value: number | string): string => {
    // 转换为数字
    let num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '0%';
    
    // 乘以100，四舍五入取整
    const percent = Math.round(num * 100);
    return `${percent}%`;
};
export {
    formatPrice,
    isGrowth,
    formatVolume,
    toPercent
}