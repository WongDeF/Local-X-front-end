import { useEffect } from "react";
import { useLocation } from "react-router";
import { getRouteKey } from "~/constant";

export function RouteThemeProvider({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation();

    useEffect(() => {
        document.documentElement.dataset.route = getRouteKey(pathname);
    }, [pathname]);

    return children;
}
