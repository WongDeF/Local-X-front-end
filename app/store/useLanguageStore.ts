import { create } from 'zustand'
import { persist } from 'zustand/middleware';
interface LanguageState {
    language: string;
    setLanguage: (lang: string) => void;
  }
  
  // --- 2. 创建 Zustand Store ---
const useLanguageStore = create<LanguageState>()(
    persist(
      (set: any) => ({
        language: 'zh', // 默认语言
        setLanguage: (lang: string) => set({ language: lang }),
      }),
      {
        name: 'language-storage', // localStorage 中存储的 key
      }
    )
);
export default useLanguageStore;