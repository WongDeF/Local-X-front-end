export default {
    tips: {
        welcome: "Welcome to React",
        description: "This is a multi-language app."
    },
    desc: {
        ConditionsDescription: 'Crypto market overview powered by Binance REST API and WebSocket. Initial 24h ticker data is fetched in batch, then prices update in real time via WebSocket with Zustand + requestAnimationFrame batching.',
        PredictDescription: 'Prediction markets from Polymarket Gamma API, grouped by sports, geopolitics, tech, and economy. Data is fetched on page load and stored in Zustand; refresh by reloading the page.',
        SwapDescription: 'Swap & liquidity preview. Token prices come from the shared Binance ticker store (same WebSocket feed as above); APR/yield data is static demo data for UI showcase.'
    }
}