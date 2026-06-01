import { Drawer } from "antd";
import { memo, useState } from "react";
interface MiniBarProps {
    open: boolean;
    navs?: React.ReactNode;
    setOpen?: (val: boolean) => void;
}
const MiniBar = ({
    open = false,
    navs = [],
    setOpen = (val: boolean) => {}
} : MiniBarProps) => {
    return(
        <Drawer
            rootClassName="md:hidden"
            styles={{
                body: {padding: 0, background: 'var(--primary-color)'},
                header: {padding: '10px', background: 'var(--primary-color)'},
                title: {display: 'flex', justifyContent: 'flex-end'}
            }}
            placement='right'
            onClose={() => setOpen(false)}
            open={open}
            key='right'
        >
            {navs}
        </Drawer>
    );
}
export default memo(MiniBar);