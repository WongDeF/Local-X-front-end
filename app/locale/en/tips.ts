export default {
    tips: {
        welcome: "Welcome to Local-X",
        description: "This is a multi-language app.",
        done: 'Done',
        disclaimer: 'Authors note !',
        disclaimerInfo: 'This project is solely for personal learning and development purposes. This project is purely front-end. This project has no commercial value. Static interaction in this project. There is no official USDT transaction for this project. This project will develop test chain transactions in the future. Please stay tuned for other features of this project.'
    },
    desc: {
        ConditionsDescription: 'Crypto market overview powered by Binance REST API and WebSocket. Initial 24h ticker data is fetched in batch, then prices update in real time via WebSocket with Zustand + requestAnimationFrame batching.',
        PredictDescription: 'Prediction markets from Polymarket Gamma API, grouped by sports, geopolitics, tech, and economy. Data is fetched on page load and stored in Zustand; refresh by reloading the page.',
        SwapDescription: 'Swap & liquidity preview. Token prices come from the shared Binance ticker store (same WebSocket feed as above); APR/yield data is static demo data for UI showcase.'
    }
}