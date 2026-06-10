import { memo, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
const TimeBtn = memo(({ timerNum, handleOk, tf }: { timerNum: number, handleOk: () => void, tf: TFunction<"translation", undefined> }) => {
    const [countdown, setCountdown] = useState(timerNum);
    useEffect(() => {
        setCountdown(timerNum);
        const timer = setInterval(() => {
            setCountdown(c => {
                if (c <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return <div className="flex justify-end">
        <Button type="text" disabled={countdown > 0} onClick={handleOk}>
            <span className="text-white">{countdown > 0 ? `${tf('btn.done')} (${countdown})` : tf('btn.done')}</span>
        </Button>
    </div>
})
const Disclaimer = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    return <>
        <Modal
            title={
                <p className="text-3xl font-bold text-red-600">{t('tips.disclaimer')}</p>
            }
            width='80%'
            closable={false}
            keyboard={false}
            open={isModalOpen}
            footer={
                <TimeBtn timerNum={6} handleOk={handleOk} tf={t} />
            }
            classNames={{
                container: '!bg-[var(--primary-color)] text-red-600'
            }}
        >
            <p className="mt-10 text-2xl font-bold">{t('tips.disclaimerInfo')}</p>
        </Modal>
    </>
}

export default memo(Disclaimer)