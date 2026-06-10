export const transfromSymbolNeedUSDT = (symbol: string) => {
    if(!symbol) return symbol;
    return symbol.includes('USDT') ? symbol : `${symbol.toLocaleUpperCase()}USDT`
}

export const transfromSymbolNoNeedUSDT = (symbol: string) => {
    if(!symbol) return symbol;
    return symbol.includes('USDT') ? symbol.split('USDT')[0] : symbol
}