"use client"

import gsap from 'gsap';
import { useCallback, useRef } from 'react'
import CanvasButton from './CanvasButton';

function StrokeCanvasButton({
  wrapperClassName,
  canvasColor,
  children
}: {
  wrapperClassName?: string,
  canvasColor?: string,
  children?: React.ReactNode
}) {
  const tlRef = useRef<gsap.core.Timeline>(null);

  const onMouseEnter = useCallback((wrapperRef: any) => {
    if(!tlRef.current) {
      tlRef.current = gsap.timeline();
      const svg = wrapperRef.current.querySelector('svg');
      tlRef.current
      .to(svg, { duration: 0.25, y: '-50%', autoAlpha: 0, ease: 'power3.in'}, 0)
      .set(svg, { y: '50%' })
      .to(svg, { duration: 0.25, y: '0%', autoAlpha: 1, ease: 'power3.out'}, "<");
    } else if(!tlRef.current.isActive()) {
      tlRef.current.restart();
    }
  }, []);

  return (
    <CanvasButton 
      onMouseEnter={onMouseEnter} 
      wrapperClassName={`stroke-canvas ${wrapperClassName}`} 
      canvasColor={canvasColor}
    >
      {children}
    </CanvasButton>
  )
}

export default StrokeCanvasButton;