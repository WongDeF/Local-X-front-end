export default {
    tips: {
        welcome: "欢迎使用 React",
        description: "这是一个多语言应用。"
    },
    desc: {
        ConditionsDescription: '加密货币行情概览，基于 Binance REST API 与 WebSocket。首次批量拉取 24h 行情，随后通过 WebSocket 实时推送，Zustand 配合 requestAnimationFrame 批量更新 UI。',
        PredictDescription: 'Polymarket Gamma API 预测市场，涵盖体育、地缘政治、科技、经济等分类。页面加载时请求数据并存入 Zustand，需刷新页面重新获取。',
        SwapDescription: '兑换与流动性预览。代币价格复用上方 Binance 行情（同一 WebSocket 数据源）；APR/收益率数据为静态演示，仅作 UI 展示。'
    }
}