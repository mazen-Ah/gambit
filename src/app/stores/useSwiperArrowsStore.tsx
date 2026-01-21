import { create } from "zustand";
import type { Swiper as SwiperType } from "swiper";

interface SwiperInstanceData {
  swiperInstance: SwiperType;
  swiperKey: string;
}

interface SwiperState {
  swiperInstances: SwiperInstanceData[];
  swiperExceedsScreenWidth: string[];
  addSwiperExceedsScreenWidth: (value: string) => void;
  removeSwiperExceedsScreenWidth: (value: string) => void;
  addSwiperInstance: (value: SwiperInstanceData) => void;
  replaceSwiperInstance: (value: SwiperInstanceData) => void;
}

const useSwiperArrowsStore = create<SwiperState>((set) => ({
  swiperInstances: [],

  replaceSwiperInstance: (value: SwiperInstanceData) =>
    set((state) => ({
      swiperInstances: state.swiperInstances.map((ele) =>
        ele.swiperKey === value.swiperKey ? value : ele
      ),
    })),

  swiperExceedsScreenWidth: [],

  addSwiperInstance: (value: SwiperInstanceData) =>
    set((state) => ({
      swiperInstances: [...state.swiperInstances, value],
    })),

  addSwiperExceedsScreenWidth: (value: string) =>
    set((state) => {
      if (state.swiperExceedsScreenWidth.includes(value)) return state;
      return {
        swiperExceedsScreenWidth: [...state.swiperExceedsScreenWidth, value],
      };
    }),

  removeSwiperExceedsScreenWidth: (value: string) =>
    set((state) => ({
      swiperExceedsScreenWidth: state.swiperExceedsScreenWidth.filter(
        (ele) => ele !== value
      ),
    })),
}));

export default useSwiperArrowsStore;
