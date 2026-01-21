"use client";
import Badge from "@/src/components/common/Badge";
import Image from "next/image";
import { useEffect, useRef } from "react";
import HeroLogos from "../homePage/hero/HeroSectionLogos";
import gsap from "gsap";
import { Division } from "@/src/app/data/divisions";

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
      s.dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));

      canvas.width = Math.round(w * s.dpr);
      canvas.height = Math.round(h * s.dpr);

      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);

      s.cx = w / 2;
      s.cy = h / 2;

      s.r = Math.max(0, Math.min(s.cx, s.cy));

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

interface DivisionHeroProps {
  division: Division;
}

const DivisionHero = ({ division }: DivisionHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasDrawRef02 = useRef<any>(null);
  const canvasState02 = useRef<any>({
    angle: 0,
    startAngle: -Math.PI / 2,
    r: 0,
    cx: 0,
    cy: 0,
    dpr: 1,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const logoIcon = document.querySelector(".dv_icon");

      if (logoIcon) {
        tl.to(logoIcon, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }).to(
          canvasState02.current,
          {
            angle: Math.PI * 2,
            duration: 1.2,
            onUpdate: () =>
              canvasDrawRef02.current && canvasDrawRef02.current(),
            ease: "power3.inOut",
          },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col bg-primary/15 mb-2"
    >
      {/* Background Image with Primary Color Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {division.heroImage && (
            <Image
              src={division.heroImage}
              alt={`${division.name} Hero`}
              fill
              className="object-cover _hide _y0"
              priority
            />
          )}
          {/* Primary Color Overlay */}
          <div className="absolute inset-0 bg-primary z-1 mix-blend-multiply"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 min-h-screen flex flex-col">
        <div className=" text-white max-w-360 h-full m-auto text-center flex flex-col items-center justify-center gap-6 w-full">
          <Badge className="border-text-primary-30! uppercase">
            {division.name}
          </Badge>
          <h1 className="hero__heading perspective-[1000px] max-w-[58.3125rem]">
            {division.heroSubtitle || division.title}
          </h1>
          <p className="hero__paragraph max-w-[38.8125rem]">
            {division.heroParagraph || division.description}
          </p>
        </div>
        <HeroLogos />
      </div>

      <LogoCanvas state={canvasState02} drawRef={canvasDrawRef02} />
    </div>
  );
};

export default DivisionHero;
