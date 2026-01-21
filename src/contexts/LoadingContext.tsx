"use client"

import React, { createContext, useState } from "react"

export const loadingContext = createContext<{
  isPageFetched: string
  setIsPageFetched: React.Dispatch<React.SetStateAction<string>>
}>({
  isPageFetched: "fetched",
  setIsPageFetched: () => {},
})

export default function LoadingContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isPageFetched, setIsPageFetched] = useState<string>("fetched");

  return (
    <loadingContext.Provider value={{ isPageFetched, setIsPageFetched }}>
      {children}
    </loadingContext.Provider>
  )
}
