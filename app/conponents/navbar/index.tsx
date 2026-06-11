import { memo, useCallback, useState } from "react";
import { navs } from "~/constant";
import useLanguageStore from '~/store/useLanguageStore'
import { useTranslation } from 'react-i18next';
import DirectionalText from "../DirectionalText";
import MiniBar from "./miniBar"
import { MenuOutlined } from '@ant-design/icons';
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const language = useLanguageStore(s => s.language)
    const setLanguage = useLanguageStore(s => s.setLanguage)
    const { t, i18n } = useTranslation();
    const changeLanguage = () => {
        const lgg = language === 'zh' ? 'en':'zh'
        setLanguage(lgg)
        i18n.changeLanguage(lgg);
        window.location.reload()
    }
    const getNavs = useCallback(() => {
        return navs.map((item) => (
            <DirectionalText
                key={item.link}
                path={item.link}
            >
                {t(`nav.${item.title}`)}
            </DirectionalText>
        ))
    }, [language])
    return (
        <div className={`flex justify-end p-1 bg-[var(--primary-color)]`}>
            <div className="flex justify-end flex-2 max-md:hidden">
                {getNavs()}
            </div>
            <DirectionalText>
                <span onClick={() => changeLanguage()}>{language === 'zh' ? 'en' : 'zh'}</span>
            </DirectionalText>
            <span className="md:hidden cursor-pointer flex items-center">
                <MenuOutlined onClick={() => setOpen(!open)} className="hover:rotate-270 transition" style={{ color: 'var(--text-color)' }}/>
            </span>
            <MiniBar open={open} setOpen={setOpen} navs={getNavs()}/>
        </div>
    );
};
export default memo(Navbar);
