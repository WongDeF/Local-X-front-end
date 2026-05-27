import type { Locale } from 'antd/lib/locale';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
export const locales: Record<string, Locale> = {
    en: enUS,
    zh: zhCN,
}

export type LocaleKey = keyof typeof locales;