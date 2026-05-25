import { memo, type MouseEvent } from "react";
import DirectionalText from "../directionalText/DirectionalText";


const Navbar = () => {
    const navs = [
        { title: "Local-X", link: "/" },
        { title: "crypto", link: "/crypto" },
        { title: "polymarket", link: "/polymarket" },
        { title: "swap", link: "/swap" },
        { title: "wallet", link: "/wallet" },
    ];
    return (
        <div className="flex justify-end p-1 bg-[var(--home-main-color)]">
            {navs.map((item) => (
                <DirectionalText
                    key={item.link}
                    path={item.link}
                    fillColor="#60a5fa"
                    defaultColor="#e5e7eb"
                    className="font-bold p-2"
                >
                    {item.title}
                </DirectionalText>
            ))}
        </div>
    );
};
export default memo(Navbar);
