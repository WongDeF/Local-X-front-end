import { useEffect } from "react";
import type { Route } from "./+types/Home";
import { getListMarkets } from "~/services/polymarket/polymarket";
import useLanguageStore from "~/store/useLanguageStore";
import usePredictStore from "~/store/usePredictStore";
import Predict from "./Predict/Predict";
import Conditions from "./Conditions/Conditions";
import Swap from "./Swap/Swap";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Local-X" },
    { name: "description", content: "Welcome to Local-X!" },
  ];
}

export default function Home() {
  const { language } = useLanguageStore()
  const { setPredctList } = usePredictStore()
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
  return <div className="w-full">
    <Conditions />
    <Predict />
    <Swap />
  </div>;
}
