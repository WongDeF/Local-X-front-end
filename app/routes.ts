import { type RouteConfig, index, route, prefix} from "@react-router/dev/routes";

export default [
    index("page/home/home.tsx"),
    route("crypto", "page/crypto/crypto.tsx"),
    ...prefix("crypto", [
        index("page/crypto/crypto.tsx"),
        route(":id", "./page/crypto/exchange/exchange.tsx"),
    ]),
    route("polymarket", "page/polymarket/polymarket.tsx"),
    route("swap", "page/swap/swap.tsx"),
    route("wallet", "page/wallet/wallet.tsx")
] satisfies RouteConfig;
