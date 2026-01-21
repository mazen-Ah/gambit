"use client"

import usePopupStore from "@/src/app/hooks/usePopupStore"
import { isMobileContext } from "@/src/contexts/isMobileContext";
import gsap from "gsap";
import { useContext, useEffect, useRef } from "react"

function Popup({ 
  children,
  type,
  id
}: { 
  children: React.ReactNode,
  type: "center",
  id: string
}) {
  const { isMobile } = useContext(isMobileContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>(null);
  const memberState = usePopupStore((state: any) => state[id]);
  // isOpen is true if memberState is truthy (boolean true or TeamMember object)
  const isOpen = Boolean(memberState);

  useEffect(() => {
    if(isOpen) {
      if(isMobile) {
        gsap.set("#smooth-container", { overflow: "hidden" });
      } else {
        window.scrollSmoother?.paused(true);
      }
      
      if(!tl.current) {
        const container = containerRef.current;
        const query = gsap.utils.selector(container);
        tl.current = gsap.timeline();

        tl.current.to(container, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        })
        .fromTo(query('._ele'), { 
          autoAlpha: 0,
          rotateX: '-7deg', 
          y: window.innerHeight * 0.2 
        }, { 
          autoAlpha: 1,
          rotateX: '0', 
          y: '0%', 
          ease: 'power3.out', 
          stagger: 0.1 
        })
      } else {
        tl.current.play();
      }
    } else if(tl.current) {
      tl.current.reverse();
      if(isMobile) {
        gsap.set("#smooth-container", { overflow: "auto" });
      } else {
        window.scrollSmoother?.paused(false);
      }
    }
  }, [isOpen])

  return (
    <section 
      ref={containerRef}
      className={`popup-${id} | fixed top-0 left-0 w-screen h-screen flex lg:items-center justify-center bg-[#ede3eed2] z-999 opacity-0 ${isOpen ? "pointer-events-auto" : "pointer-events-none"} overflow-y-scroll`}
    >
      {children}
    </section>
  )
}

export default Popup