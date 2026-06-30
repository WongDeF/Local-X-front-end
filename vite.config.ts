import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { resolve } from 'path'
export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      '~': resolve(__dirname, './app'),   // 关键修改
      // 或者如果你的源码在 src 目录，就改成：
      // '~': resolve(__dirname, './src'),
    },
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
