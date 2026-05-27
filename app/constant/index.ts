interface RouterColor {
    [key: string]: {
        main: string;
        primary: string;
        text: string;
    };
}
export const routerColor: RouterColor = {
    '/': {
        main: 'var(--home-main-color)',
        primary: 'var(--home-primary-color)',
        text: 'var(--home-text-color)',
    },
    '/crypto': {
        main: 'var(--crypto-main-color)',
        primary: 'var(--crypto-primary-color)',
        text: 'var(--crypto-text-color)',
    },
    '/polymarket': {
        main: 'var(--polymarket-main-color)',
        primary: 'var(--polymarket-primary-color)',
        text: 'var(--polymarket-text-color)',
    },
    '/swap': {
        main: 'var(--swap-main-color)',
        primary: 'var(--swap-primary-color)',
        text: 'var(--swap-text-color)',
    },
    '/wallet': {
        main: 'var(--wallet-main-color)',
        primary: 'var(--wallet-primary-color)',
        text: 'var(--wallet-text-color)',
    },
    '/other': {
        main: 'var(--other-main-color)',
        primary: 'var(--other-primary-color)',
        text: 'var(--other-text-color)',
    }
}
export const navs: { title: string; link: string }[] = [
    { title: "Local-X", link: "/" },
    { title: "crypto", link: "/crypto" },
    { title: "polymarket", link: "/polymarket" },
    { title: "swap", link: "/swap" },
    { title: "wallet", link: "/wallet" },
];