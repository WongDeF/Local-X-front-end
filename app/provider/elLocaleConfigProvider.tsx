import { ConfigProvider } from "antd";
import { locales } from "~/locale";
import useLanguageStore from '~/store/useLanguageStore'
export function ElLocaleConfigProvider({ children }: { children: React.ReactNode }) {
    const { language } = useLanguageStore()
    return <ConfigProvider locale={locales[language]}>{children}</ConfigProvider>;
}