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
    { title: "Local-X", link: "/" },
    { title: "crypto", link: "/crypto" },
    { title: "polymarket", link: "/polymarket" },
    { title: "swap", link: "/swap" },
    { title: "wallet", link: "/wallet" },
];