import type { RefObject } from "react";
import { useEffect, useState, useCallback } from "react";

export default function useIsInViewPort(
  sectionRef: RefObject<HTMLElement | null>,
  start?: string
) {
  const [enteredViewPort, setEnteredViewPort] = useState(false);

  // Parse start position (default: "top center" = 50% of viewport)
  const getStartThreshold = useCallback(() => {
    if (!start) return 0.5;
    if (start.includes("center")) return 0.5;
    if (start.includes("top")) return 0.8;
    if (start.includes("bottom")) return 0.2;
    return 0.5;
  }, [start]);

  useEffect(() => {
    if (!sectionRef?.current) return;

    const element = sectionRef.current;
    const threshold = getStartThreshold();

    // Throttling to prevent excessive calls
    let throttleTimer: number | null = null;
    let lastSectionState: boolean | null = null;

    const handleScroll = () => {
      if (throttleTimer) return;

      throttleTimer = window.setTimeout(() => {
        throttleTimer = null;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate if element is in viewport based on threshold
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const triggerPoint = windowHeight * threshold;
        const isInViewport = elementTop <= triggerPoint && elementBottom >= 0;

        // Only update state if it changed
        if (isInViewport !== lastSectionState) {
          lastSectionState = isInViewport;
          setEnteredViewPort(isInViewport);
        }
      }, 16); // Reduced to 16ms (60fps) for faster response
    };

    // Use ScrollSmoother's scroll position when available (with type guard)
    const getScrollTop = () => {
      const w = window as typeof window & {
        scrollSmoother?: { scrollTop: () => number };
      };
      if (
        w.scrollSmoother &&
        typeof w.scrollSmoother.scrollTop === "function"
      ) {
        return w.scrollSmoother.scrollTop();
      }
      return window.pageYOffset || document.documentElement.scrollTop;
    };

    // Initial check
    handleScroll();

    // Use passive scroll listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [getStartThreshold, sectionRef]);

  return {
    enteredViewPort,
  };
}
