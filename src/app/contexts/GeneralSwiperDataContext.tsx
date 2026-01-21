"use client";

import Loader from "@/src/components/common/Animation/Loader";
import { createContext, useCallback, useState } from "react";

export interface GeneralSwiperDataContextType {
  handleChangeSwiperPagination: (
    swiperKey: string,
    exceedsScreenWidth: boolean
  ) => void;
  swiperPaginationStates: Record<string, boolean>;
}

export const generalSwiperDataContext =
  createContext<GeneralSwiperDataContextType>({
    handleChangeSwiperPagination: () => {},
    swiperPaginationStates: {},
  });

function GeneralSwiperDataProvider(props: { children: React.ReactNode }) {
  const [swiperPaginationStates, setSwiperPaginationStates] = useState<
    Record<string, boolean>
  >({});

  const handleChangeSwiperPagination = useCallback(
    (swiperKey: string, exceedsScreenWidth: boolean) => {
      setSwiperPaginationStates((prev) => ({
        ...prev,
        [swiperKey]: exceedsScreenWidth,
      }));
    },
    []
  );

  return (
    <generalSwiperDataContext.Provider
      value={{
        handleChangeSwiperPagination,
        swiperPaginationStates,
      }}
    >
      <Loader />
      {props.children}
    </generalSwiperDataContext.Provider>
  );
}

export default GeneralSwiperDataProvider;
