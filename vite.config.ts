import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: '0.0.0.0',   // 监听所有网络接口
    port: 5173,         // 可选，默认就是 5173
    // 如果端口被占用，Vite 会自动尝试下一个可用端口
    proxy: {
      '/api': {
        target: 'https://testnet.binance.vision',
        changeOrigin: true,
      }
    }
  }
});
