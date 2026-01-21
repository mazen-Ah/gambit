import { useEffect, useRef } from "react";

const LogoCanvas = ({ state, drawRef }: { state: any; drawRef: any }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const COLOR = "#FFFFFF";
    const canvas = canvasRef.current as HTMLCanvasElement;

    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    function fit() {
      const wrapper = wrapperRef.current as HTMLDivElement;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect() as DOMRect;

      // eslint-disable-next-line react-hooks/immutability
      const s = state.current;
      s.dpr = 2;

      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));

      canvas.width = Math.round(w * state.current.dpr);
      canvas.height = Math.round(h * state.current.dpr);

      ctx.setTransform(state.current.dpr, 0, 0, state.current.dpr, 0, 0);

      state.current.cx = w / 2;
      state.current.cy = h / 2;
      const minSide = Math.min(w, h);

      state.current.r = Math.max(
        0,
        Math.min(state.current.cx, state.current.cy)
      );

      draw();
    }

    function draw() {
      const { cx, cy, r, startAngle, angle } = state.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + angle, false);
      ctx.closePath();

      ctx.fillStyle = COLOR;
      ctx.fill();
    }

    fit();
    draw();

    drawRef.current = draw;

    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);

    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  });

  return (
    <div
      ref={wrapperRef}
      className="canvas_circle absolute top-0 left-0 h-full aspect-square -z-1"
    >
      <canvas
        ref={canvasRef}
        className="absolute size-full"
        aria-hidden="true"
      />
    </div>
  );
};

export default LogoCanvas;