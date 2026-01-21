import { isMobileContext } from "@/src/contexts/isMobileContext";
import { gsap } from "gsap";
import { useCallback, useContext, useEffect, useRef } from "react";

const SVGComponent = ({ children, index }: { children: React.ReactNode, index: number }) => {
  const { isMobile } = useContext(isMobileContext);
  const containerRef = useRef<any>(null);

  const handleResize = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const parent = container.parentElement as HTMLElement;
    if (!parent) return;

    const children = [...parent.children];

    let tallest = 0;
    children.forEach((child: any)=> {
      const innerChild = child.firstChild;
      tallest = innerChild.offsetHeight / (isMobile ? 1.5 : 2);
    });

    const length = children.length;
    const angle = (Math.PI * 2) / length;
    
    const centerX = parent.offsetWidth / 2;
    const centerY = parent.offsetHeight / 2;

    const radius = tallest;
    
    const adjustedIndex = (index + 3) % length;
    const x = centerX + (centerX - radius) * Math.cos(angle * adjustedIndex);
    const y = centerY + (centerY - radius) * Math.sin(angle * adjustedIndex);

    gsap.set(container, { 
      rotate: `${(360 * index) / length}deg`,
      top: y,
      left: x 
    });
  }, [index, isMobile]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div ref={containerRef} className='absolute w-0 h-0'>
      <div className='absolute left-1/2 -translate-x-1/2 w-[3.788125rem] min-[600px]:w-30 lg:w-[5.788125rem]'>
        {children}
      </div>
    </div>
  );
};

export default SVGComponent;
