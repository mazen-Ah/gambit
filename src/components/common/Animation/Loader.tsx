"use client"

import { useContext, useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';
import { SplitText } from "gsap/SplitText";
import { isMobileContext } from "@/src/contexts/isMobileContext";
import { usePathname } from "next/navigation";
import { loadingContext } from "@/src/contexts/LoadingContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Loader() {
  const { isMobile } = useContext(isMobileContext);
  const { isPageFetched, setIsPageFetched } = useContext(loadingContext);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const loaderRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasTimelineRef = useRef<GSAPTimeline>(null);
  const colorRef = useRef('#CF0F69');

  const pathname = usePathname();

  const handleScrollRestoration = () => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleResize = () => {
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    // Set loader color based on division page
    const divisionColors: Record<string, string> = {
      '/fwd': '#0066ba',
      '/atelier': '#ffa38c',
      '/pulse': '#ba0d2e',
      '/sage': '#6b7866',
    };
    
    colorRef.current = divisionColors[pathname] || '#CF0F69';
    setTimeout(() => setIsPageFetched("fetched"), 100);
  }, [pathname]);

  useEffect(()=>{
    handleScrollRestoration();

    const handlePopState = () => {
      gsap.set(loaderRef.current, { autoAlpha: 0 });
      setIsPageFetched("loading");
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("popstate", handlePopState, { capture: true, passive: true });

    document.fonts.ready.then(() => setIsFontLoaded(true));

    return () => {
      window.removeEventListener("popstate", handlePopState, { capture: true })
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if(isPageFetched === "loading") {
      window.scrollSmoother?.paused(true);

      canvasTimelineRef.current?.progress(0);
      canvasTimelineRef.current?.pause();

      gsap.set(loaderRef.current, { autoAlpha: 0 });
      gsap.to(loaderRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        onComplete: () => {
          if(isMobile) {
            gsap.set("#smooth-container", {scrollTo: { y: 0 }});
          } else {
            window.scrollSmoother?.scrollTo(0);
          }
        }
      });

      return;
    };

    const COLOR = colorRef.current;
  
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
  
    canvasTimelineRef.current?.kill();

    const tl = gsap.timeline();
    canvasTimelineRef.current = tl;

    const state = {
      angle: 0,
      tRadius: 0,
      startAngle: -Math.PI / 2,
      cx: 0,
      cy: 0,
      r0: 0,
      rMax: 0
    };

    function fit() {
      const dpr = 2;
      const w = Math.max(1, Math.round(window.innerWidth));
      const h = Math.max(1, Math.round(window.innerHeight));

      if(canvas) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.cx = w / 2;
      state.cy = h / 2;
      const minSide = Math.min(w, h);
      state.r0 = (window.innerWidth > 600 ? 0.15 : 0.3) * minSide;
      state.rMax = Math.hypot(w, h) / 2 + 2;
      draw();
    }

    function draw() {
      const { cx, cy, startAngle } = state;
      const r = state.r0 + (state.rMax - state.r0) * state.tRadius;
      if(!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas?.width, canvas?.height);
      
      if (state.tRadius === 0) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, state.r0, startAngle, startAngle + state.angle, false);
        ctx.closePath();
        ctx.fillStyle = COLOR;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = COLOR;
        ctx.fill();
      }
    }

    if(!isFontLoaded) return;
    
    let splitHeading: SplitText | null = null;
    let splitParagraph: SplitText | null = null;
    let hideElements: NodeListOf<Element> | null = null;

    hideElements = document.querySelectorAll("._hide");
    splitHeading = new SplitText('.hero__heading', { type: 'words', wordsClass: 'word' });
    splitParagraph = new SplitText('.hero__paragraph', { type: 'lines', linesClass: 'line' });

    gsap.set(splitHeading.words, { y: '50%', rotationX: '-90deg', autoAlpha: 0 });
    gsap.set(splitParagraph.lines, { autoAlpha: 0, yPercent: 100 });

    const svgPaths = svgRef.current?.querySelectorAll?.('path') || [];

    tl
    .fromTo(state, 
      { angle: 0 }, 
      {
        angle: Math.PI * 2,
        duration: 1,
        onUpdate: draw,
        ease: 'power3.inOut'
      }, 
      0
    )
    .set(svgRef.current, { autoAlpha: 1 }, 0.5)
    .fromTo(svgPaths, 
      { autoAlpha: 0 }, 
      { autoAlpha: 1, stagger: 0.1, ease: 'power3.out', duration: 1 }, 
      0.5
    )
    .fromTo(svgPaths, 
      { y: '-50%' }, 
      { y: 0, stagger: 0.1, ease: "elastic.out(4,1)", duration: 1 }, 
      0.5
    )
    .to(state, {
      onStart: () => { 
        state.angle = Math.PI * 2; 
        state.tRadius = 0; 
      },
      tRadius: 1,
      duration: 0.8,
      ease: 'power3.in',
      onUpdate: draw
    }, 2)
    .to(svgPaths, 
      { y: '-30%', stagger: 0.05, autoAlpha: 0, ease: 'power3.in', duration: 0.8 }, 
      2
    )
    .set(loaderRef.current, { autoAlpha: 0 })
    .fromTo(hideElements, { 
      y: '50%', 
      autoAlpha: 0 
    }, { 
      duration: 0.8, 
      stagger: 0.1, 
      y: 0, 
      autoAlpha: 1, 
      ease: 'power3.out', 
      onStart: function() {
        gsap.to(splitHeading.words, {
          rotationX: '0', 
          y: 0, 
          autoAlpha: 1, 
          ease: 'power3.out', 
          stagger: 0.05,
          duration: 0.5
        });
        gsap.to(splitParagraph.lines, {
          delay: 0.25,
          yPercent: 0, 
          autoAlpha: 1, 
          ease: 'power3.out', 
          stagger: 0.025,
          duration: 0.5
        });

        window.scrollSmoother?.paused(false);
    }});
   
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('orientationchange', fit);

    tl.play();

    return () => {
      splitHeading?.revert();
      splitParagraph?.revert();
      
      window.removeEventListener('resize', fit);
      window.removeEventListener('orientationchange', fit);
      
      tl.kill();
    };
  }, [isMobile, isPageFetched, isFontLoaded]);

  //  bg-[#ede3ee]
  return (
    <div 
      ref={loaderRef}
      className="fixed w-screen h-screen z-999 flex items-center justify-center bg-[#ede3ee] pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full"
        aria-hidden="true"
      />
      <svg 
        ref={svgRef}
        width="340" 
        height="342" 
        viewBox="0 0 340 342" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-[15em] invisible"
      >
        <path d="M41.1197 171.153C41.1197 164.142 35.3797 158.723 28.0475 158.723C20.7154 158.723 14.9822 164.251 14.9822 171.153C14.9822 178.054 20.8247 183.692 28.0475 183.692C35.2704 183.692 41.1197 178.273 41.1197 171.153ZM56.0984 145.972V194.42C56.0984 210.253 43.1355 219.601 27.412 219.601C18.802 219.601 8.49737 216.519 3.3997 211.312L10.7319 200.898C15.4059 204.513 21.2484 206.214 27.412 206.214C33.5757 206.214 41.1197 201.54 41.1197 194.42V189.322C37.5049 194.632 31.8742 197.611 24.542 197.611C11.0462 197.611 0.317871 185.714 0.317871 171.153C0.317871 156.591 11.0462 144.803 24.542 144.803C31.8742 144.803 37.5049 147.776 41.1197 153.092V145.972H56.0984Z" fill="white"/>
        <path d="M101.001 172.007C101.001 164.784 95.2606 159.153 87.9352 159.153C80.6099 159.153 74.8699 164.893 74.8699 172.007C74.8699 179.12 80.7124 184.86 87.9352 184.86C95.1581 184.86 101.001 179.332 101.001 172.007ZM115.986 145.972V198.144H101.007V190.703C97.3926 196.122 91.7619 199.203 84.4366 199.203C70.9407 199.203 60.2124 186.985 60.2124 172C60.2124 157.014 70.9407 144.906 84.4366 144.906C91.7687 144.906 97.3994 147.988 101.007 153.406V145.965H115.986V145.972Z" fill="white"/>
        <path d="M201.403 198.144H186.424V160.212H169.211V198.144H154.226V160.212H137.122V198.144H122.143V145.972H201.403V198.144Z" fill="white"/>
        <path d="M248.668 172.007C248.668 164.887 242.826 159.153 235.603 159.153C228.38 159.153 222.538 164.784 222.538 172.007C222.538 179.23 228.278 184.861 235.603 184.861C242.928 184.861 248.668 179.23 248.668 172.007ZM263.223 172.007C263.223 186.986 252.495 199.204 238.999 199.204C231.776 199.204 226.146 196.231 222.531 190.812V198.145H207.552V123.771H222.531V153.311C226.146 147.892 231.776 144.92 238.999 144.92C252.495 144.92 263.223 157.035 263.223 172.014" fill="white"/>
        <path d="M282.323 145.972H267.344V198.144H282.323V145.972Z" fill="white"/>
        <path d="M283.97 130.679C283.97 135.674 279.829 139.815 274.834 139.815C269.839 139.815 265.698 135.674 265.698 130.679C265.698 125.684 269.839 121.645 274.834 121.645C279.829 121.645 283.97 125.786 283.97 130.679Z" fill="white"/>
        <path d="M288.48 131.738H303.459V145.978H316.312V160.219H303.459V177.22C303.459 182.106 307.176 185.188 311.536 185.188C313.025 185.188 315.041 184.867 316.21 184.443L316.954 197.72C315.041 198.677 312.069 199.21 309.301 199.21C297.083 199.21 288.48 191.454 288.48 177.958V131.738Z" fill="white"/>
        <path d="M339.696 190.067C339.696 195.063 335.555 199.204 330.56 199.204C325.564 199.204 321.423 195.063 321.423 190.067C321.423 185.072 325.564 181.034 330.56 181.034C335.555 181.034 339.696 185.175 339.696 190.067Z" fill="white"/>
      </svg>
    </div>
  );
}

export default Loader;