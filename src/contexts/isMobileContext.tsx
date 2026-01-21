"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createContext, useEffect, useState } from "react";

export interface IsMobileContextType {
  isMobile: boolean | null;
  setMobile: React.Dispatch<React.SetStateAction<boolean | null>>;
  setTablet: React.Dispatch<React.SetStateAction<boolean | null>>;
  isTablet: boolean | null;
  screenOrientation: string;
  isIOS: boolean | null;
}
export const isMobileContext = createContext<IsMobileContextType>({
  isMobile: false,
  setMobile: () => {},
  setTablet: () => {},
  isTablet: false,
  screenOrientation: "",
  isIOS: false,
});

function IsMobileProvider(props: { children: React.ReactNode }) {
  const [isMobile, setMobile] = useState<boolean | null>(null);
  const [isTablet, setTablet] = useState<boolean | null>(null);
  const [screenOrientation, setScreenOrientation] = useState<string>("");
  const [isIOS, setIsIOS] = useState<boolean | null>(null);

  const isMobileHandler = (e: MediaQueryListEvent) => {
    setMobile(e.matches);
    setTablet(e.matches);
  };

  useEffect(() => {
    function getSizes() {
      ScrollTrigger.refresh();
      try {
        // Chrome & Firefox
        window
          .matchMedia(`(max-width : 1024px)`)
          .addEventListener("change", isMobileHandler);
        setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
        setTablet(
          window.matchMedia(`(max-width : 1024px) and (min-width : 640px)`)
            .matches
        );
        setScreenOrientation(window?.screen?.orientation?.type);
        const isIOSDevice =
          /iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
        setIsIOS(isIOSDevice);
      } catch {
        try {
          // Safari
          window
            .matchMedia(`(max-width : 1024px)`)
            .addListener((e) => isMobileHandler(e));
          setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
          setTablet(
            window.matchMedia(`(max-width : 1024px) and (min-width : 640px)`)
              .matches
          );
          setScreenOrientation(window?.screen?.orientation?.type);
          const isIOSDevice =
            /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
          setIsIOS(isIOSDevice);
        } catch {}
      }
    }

    const updateOrientation = () => {
      setScreenOrientation(window?.screen?.orientation?.type);
    };

    getSizes();
    window.addEventListener("resize", getSizes);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", getSizes);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.documentElement.classList.add("is-mobile");
    } else {
      document.documentElement.classList.remove("is-mobile");
    }
  }, [isMobile]);

  return (
    <>
      <isMobileContext.Provider
        value={{
          isMobile,
          setMobile,
          isTablet,
          setTablet,
          screenOrientation,
          isIOS,
        }}
      >
        {isMobile != null ? props.children : null}
      </isMobileContext.Provider>
    </>
  );
}

export default IsMobileProvider;
