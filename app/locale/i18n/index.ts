import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enUS from "~/locale/en"
import zhCN from "~/locale/zh"
// 翻译资源文件
const resources = {
  en: enUS,
  zh: zhCN,
};

i18n
  // 自动检测用户语言
  .use(LanguageDetector)
  // 将i18n实例传递给react-i18next
  .use(initReactI18next)
  // 初始化i18next
  .init({
    resources, // 我们手动定义的翻译资源
    fallbackLng: 'zh', // 当当前语言的翻译缺失时，回退使用的语言
    interpolation: {
      escapeValue: false, // React已经安全地处理了XSS，不需要再转义
    }
  });

export default i18n;