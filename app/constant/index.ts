export const LANGUAGE_STORAGE_KEY = 'language-storage';
export const LANGUAGE_COOKIE_KEY = 'lng';
export const DEFAULT_LANGUAGE = 'zh';

export function parseLanguage(lang?: string | null): string {
    return lang === 'en' || lang === 'zh' ? lang : DEFAULT_LANGUAGE;
}

export function getLanguageFromRequest(request: Request): string {
    const cookie = request.headers.get('Cookie') ?? '';
    const match = cookie.match(new RegExp(`${LANGUAGE_COOKIE_KEY}=([^;]+)`));
    return parseLanguage(match?.[1]);
}

export function setLanguageCookie(lang: string) {
    if (typeof document === 'undefined') return;
    document.cookie = `${LANGUAGE_COOKIE_KEY}=${lang};path=/;max-age=31536000;SameSite=Lax`;
}

export function getStoredLanguage(): string {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
    try {
        const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (!raw) return DEFAULT_LANGUAGE;
        const lang = parseLanguage(JSON.parse(raw)?.state?.language);
        setLanguageCookie(lang);
        return lang;
    } catch {
        return DEFAULT_LANGUAGE;
    }
}

export const themeColors = {
    main: 'var(--main-color)',
    primary: 'var(--primary-color)',
    text: 'var(--text-color)',
} as const;

export function getRouteKey(pathname: string) {
    if (pathname.startsWith('/crypto')) return 'crypto';
    if (pathname.startsWith('/polymarket')) return 'polymarket';
    if (pathname.startsWith('/swap')) return 'swap';
    if (pathname.startsWith('/wallet')) return 'wallet';
    if (pathname.startsWith('/other')) return 'other';
    return 'home';
}
export const navs: { title: string; link: string }[] = [
    { title: "localx", link: "/" },
    { title: "crypto", link: "/crypto" },
    { title: "polymarket", link: "/polymarket" },
    { title: "swap", link: "/swap" },
    { title: "wallet", link: "/wallet" },
    { title: "chat", link: "/chat" },
];