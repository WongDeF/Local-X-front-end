import { type RouteConfig, index, route, prefix} from "@react-router/dev/routes";

export default [
    index("pages/Home/Home.tsx"),
    ...prefix("Crypto", [
        index("pages/Crypto/Crypto.tsx"),
        route(":id", "pages/Crypto/Exchange/Exchange.tsx"),
    ]),
    route("polymarket", "pages/Polymarket/Polymarket.tsx"),
    route("swap", "pages/Swap/Swap.tsx"),
    route("wallet", "pages/Wallet/Wallet.tsx"),
    route("chat", "pages/Chat/Chat.tsx")
] satisfies RouteConfig;
