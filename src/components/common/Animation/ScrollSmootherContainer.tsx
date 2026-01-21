"use client"

import { useContext, useEffect, useRef, useCallback, useLayoutEffect } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { SplitText } from "gsap/SplitText"
import { Draggable } from "gsap/Draggable"

import { isMobileContext } from "@/src/contexts/isMobileContext";
import CustomEase from "gsap/CustomEase"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import MorphSVGPlugin from "gsap/MorphSVGPlugin"
import GambitLogoContainer from "../../GambitLogoContainer"

declare global {
  interface Window {
    scrollSmoother?: ScrollSmoother | null;
  }
}

gsap.config({ nullTargetWarn: false })
gsap.registerPlugin(
  ScrollTrigger, 
  ScrollSmoother, 
  ScrollToPlugin, 
  SplitText, 
  Draggable, 
  CustomEase, 
  MorphSVGPlugin,
); // , useGSAP

CustomEase.create("gentle", "M0,0 C0,0.7 0.3,1 1,1");

const ScrollSmootherContainer = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useContext(isMobileContext)
  
  const containerRef = useRef(null)
  const smootherRef = useRef<ScrollSmoother>(null)

  const onScroll = () => {
    if(window.pageYOffset >= 10) {
      document.body.classList.add('scrolled')
    } else {
      document.body.classList.remove('scrolled')
    }
  };
  
  useEffect(() => {
    if(!isMobile) window.addEventListener("scroll", onScroll);
    else {
      const scrollContainer = document.querySelector("#smooth-container");
      if(scrollContainer) scrollContainer.addEventListener("scroll", onScroll);
    };
    
    return () => {
      if(!isMobile) window.removeEventListener("scroll", onScroll);
      else {
        const scrollContainer = document.querySelector("#smooth-container");
        if(scrollContainer) scrollContainer.removeEventListener("scroll", onScroll);
      }
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      ScrollTrigger.defaults({ scroller: containerRef.current });
      ScrollTrigger.config({ ignoreMobileResize: true });

      return;
    }

    if (!smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.25,
        effects: true,
        smoothTouch: false,
      });

      smootherRef.current.paused(true);
      window.scrollSmoother  = smootherRef.current;
    }

    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
      window.scrollSmoother  = smootherRef.current;
    }
  }, [isMobile])

  return (
    <div id="smooth-container" ref={containerRef}>
      {isMobile ? (
        <div id="smooth-wrapper">
          <GambitLogoContainer />
          {children}
        </div>
      ) : (
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <GambitLogoContainer />
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default ScrollSmootherContainer