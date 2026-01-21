"use client"

import gsap from 'gsap';
import { useEffect, useRef } from 'react'

function CanvasButton({
  keyClass,
  wrapperClassName,
  canvasColor,
  startFilled,
  addTimeline,
  onMouseEnter,
  onMouseLeave,
  children
}: {
  keyClass?: string,
  wrapperClassName?: string,
  canvasColor?: string,
  startFilled?: boolean,
  addTimeline?: (wrapperRef: any, tl: gsap.core.Timeline)=> void,
  onMouseEnter?: (wrapperRef: any, keyClass?: string)=> void,
  onMouseLeave?: (wrapperRef: any, keyClass?: string)=> void,
  children?: React.ReactNode
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timelineRef = useRef<GSAPTimeline>(null);

  useEffect(()=> {
    const COLOR = canvasColor || '#CF0F69';
    const canvas = canvasRef.current as HTMLCanvasElement;
    if(!canvas) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const tl = gsap.timeline({ paused: true });
    timelineRef.current = tl;

    const state = {
      angle: startFilled ? Math.PI * 2 : 0,
      startAngle: -Math.PI / 2,
      r: 0,
      cx: 0,
      cy: 0,
      dpr: 1
    };

    function fit() {
      const wrapper = wrapperRef.current as HTMLDivElement;
      if(!wrapper) return;
      const rect = wrapper.getBoundingClientRect() as DOMRect;

      state.dpr = 2;
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      
      canvas.width = Math.round(w * state.dpr);
      canvas.height = Math.round(h * state.dpr);

      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      
      state.cx = w / 2;
      state.cy = h / 2;
      const minSide = Math.min(w, h);
      
      state.r  = Math.max(0, Math.min(state.cx, state.cy));
      
      draw();
    }

    function draw() {
      const { cx, cy, r, startAngle, angle } = state;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + angle, false);
      ctx.closePath();
      
      ctx.fillStyle = COLOR;
      ctx.fill();
    }

    tl.fromTo(state, 
      { angle: startFilled ? Math.PI * 2 : 0 },
      {
        // delay: 0.25,
        angle: startFilled ? 0 : Math.PI * 2,
        duration: 0.6,
        onUpdate: draw,
        ease: 'power3.inOut'
      }, 
    )

    if(addTimeline) addTimeline(wrapperRef, tl);
   
    fit();
    draw();

    window.addEventListener('resize', fit);
    window.addEventListener('orientationchange', fit);

    return () => {
      window.removeEventListener('resize', fit);
      window.removeEventListener('orientationchange', fit);
      tl.kill();
    };
  })

  return (
    <div
      ref={wrapperRef}
      className={`canvas-button relative ${wrapperClassName}`}
      onMouseEnter={()=> {
        timelineRef.current?.play()
        onMouseEnter?.(wrapperRef, keyClass);
      }}
      onMouseLeave={()=> {
        timelineRef.current?.reverse()
        onMouseLeave?.(wrapperRef, keyClass);
      }}
    >
      <canvas 
        ref={canvasRef}
        className="absolute size-full -z-1"
        aria-hidden="true"
      />
      {children && children}
    </div>
  )
}

export default CanvasButton