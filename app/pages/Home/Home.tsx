import { useEffect } from "react";
import type { Route } from "./+types/Home";
import { getListMarkets } from "~/services/polymarket/polymarket";
import useLanguageStore from "~/store/useLanguageStore";
import usePredictStore from "~/store/usePredictStore";
import Predict from "./Predict/Predict";
import Conditions from "./Conditions/Conditions";
import Swap from "./Swap/Swap";
import { useTranslation } from "react-i18next";
import DirectionalText from "~/conponents/DirectionalText";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Local-X" },
    { name: "description", content: "Welcome to Local-X!" },
  ];
}
const DescriptionDom = ({ title }: { title: string }) => {
  const { t } = useTranslation()
  return <div className="mb-10 text-left ">
    <DirectionalText className="text-4xl">{t(`desc.${title}`)}</DirectionalText>
  </div>
}
export default function Home() {
  // 优化
  // const { language } = useLanguageStore()
  // const { setPredctList } = usePredictStore()
  const language = useLanguageStore(s => s.language)
  const setPredctList = usePredictStore(s => s.setPredctList)
  const getDatas = () => {
    Promise.all([
      getListMarkets({ limit: 4, locale: language, tag_slug: 'sports' }),
      getListMarkets({ limit: 4, locale: language, tag_slug: 'geopolitics' }),
      getListMarkets({ limit: 4, locale: language, tag_slug: 'tech' }),
      getListMarkets({ limit: 4, locale: language, tag_slug: 'economy' })
    ]).then(res => {
      setPredctList(res.flat())
    })
  }
  useEffect(() => {
    getDatas()
  }, [])
  return <div className="w-full pb-40">
    <div className="my-10">
      <DescriptionDom title="ConditionsDescription" />
      <Conditions />
    </div>
    <div className="my-20">
      <DescriptionDom title="PredictDescription" />
      <Predict />
    </div>
    <div>
      <DescriptionDom title="SwapDescription" />
      <Swap />
    </div>
  </div>;
}
