import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Event } from "~/services/polymarket/polymarket.types";
interface PredictState {
    list: Event[];
    setPredctList: (datas: Event[]) => void;
    filterList: () => Event[]
}
const usePredictStore = create<PredictState>() (
    persist(
        (set, get) => ({
            list: [],
            setPredctList: (datas: Event[]) => set({list: datas}),
            filterList: () => {
                const currentList = get().list;
                return currentList.filter((market) => market.active === true);
            } 
        }),
        {
            name: 'predict-storage'
        }
    )
)
export default usePredictStore;