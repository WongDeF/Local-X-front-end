import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    }
  },
  // 关键：告诉 Cloudflare 这是纯前端项目
  build: {
    rollupOptions: {
      external: ['@cloudflare/vite-plugin'],
    }
  }
});