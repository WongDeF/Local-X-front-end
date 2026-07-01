import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  // 禁用 Workers 相关功能
  prerender: false,
} satisfies Config;