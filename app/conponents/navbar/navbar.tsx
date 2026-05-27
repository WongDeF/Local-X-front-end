import { memo, type MouseEvent } from "react";
import { useLocation } from "react-router";
import { routerColor, navs } from "~/constant";
import useLanguageStore from '~/store/LanguageStore'
import { useTranslation } from 'react-i18next';
import DirectionalText from "../directionalText/DirectionalText";
const Navbar = () => {
    const location = useLocation()
    const colors = routerColor[location.pathname]
    const { language, setLanguage } = useLanguageStore()
    const { t, i18n } = useTranslation();
    const changeLanguage = () => {
        const lgg = language === 'zh' ? 'en':'zh'
        setLanguage(lgg)
        i18n.changeLanguage(lgg);
    }
    return (
        <div className={`flex justify-end p-1`} style={{ backgroundColor: colors.primary }}>
            {navs.map((item) => (
                <DirectionalText
                    key={item.link}
                    path={item.link}
                    fillColor={colors.main}
                    defaultColor={colors.text}
                    className="font-bold p-2"
                >
                    {t(`nav.${item.title}`)}
                </DirectionalText>
            ))}
            <DirectionalText
                fillColor={colors.main}
                defaultColor={colors.text}
                className="font-bold p-2"
            >
                <span onClick={() => changeLanguage()}>{language === 'zh' ? 'en' : 'zh'}</span>
            </DirectionalText>
        </div>
    );
};
export default memo(Navbar);
