"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

export interface CanvasCircleHandle {
  draw: (angle: number) => void;
}

interface CanvasCircleProps {
  className?: string;
  color?: string;
  startFilled?: boolean;
}

const CanvasCircle = forwardRef<CanvasCircleHandle, CanvasCircleProps>(
  ({ className, color = "#fff", startFilled = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Internal state for drawing
    const state = useRef({
      cx: 0,
      cy: 0,
      r: 0,
      startAngle: -Math.PI / 2,
      currentAngle: startFilled ? Math.PI * 2 : 0,
      dpr: 1,
    });

    const draw = (angle: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      // Update current angle for redraws
      state.current.currentAngle = angle;

      const { cx, cy, r, startAngle } = state.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + angle, false);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    useImperativeHandle(ref, () => ({
      draw,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const fit = () => {
        const rect = container.getBoundingClientRect();
        const dpr = 2;
        
        state.current.dpr = dpr;
        canvas.width = Math.max(1, Math.round(rect.width * dpr));
        canvas.height = Math.max(1, Math.round(rect.height * dpr));
        
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        
        state.current.cx = rect.width / 2;
        state.current.cy = rect.height / 2;
        state.current.r = Math.max(0, Math.min(state.current.cx, state.current.cy));
        
        draw(state.current.currentAngle);
      };

      const ro = new ResizeObserver(fit);
      ro.observe(container);
      window.addEventListener("orientationchange", fit, { passive: true });
      
      fit();

      return () => {
        ro.disconnect();
        window.removeEventListener("orientationchange", fit);
      };
    }, [startFilled, color]); // Re-run if props change (though startFilled only affects initial)

    return (
      <div ref={containerRef} className={className}>
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    );
  }
);

CanvasCircle.displayName = "CanvasCircle";

export default CanvasCircle;
