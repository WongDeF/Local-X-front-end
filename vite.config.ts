import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/binance': {
        target: 'https://testnet.binance.vision',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/binance/, ''),
      },
    }
  }
});
