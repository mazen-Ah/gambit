"use client"

import React, { useEffect, useRef } from 'react'

function Shapes({ className, dataSpeed, children }: { className?: string, dataSpeed?: string, children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const SPEED_PX_PER_SEC = 2000;
  const DASH_RATIO = 0.08;
  const MIN_DASH_PX = 60;
  const GAP_MIN_PX = 1;
  const NS = "http://www.w3.org/2000/svg";

  const setupPath = (svg: SVGSVGElement, basePath: SVGPathElement) => {
    const d = basePath.getAttribute("d") ?? "";
    if (!d.trim()) return;

    const parts = d
        .trim()
        .split(/(?=[Mm])/)
        .map(s => s.trim())
        .filter(Boolean);

    if (!parts.length) return;

    const runners: SVGPathElement[] = parts.map(subD => {
        const p = document.createElementNS(NS, "path") as SVGPathElement;
        p.setAttribute("d", subD);
        p.setAttribute("class", "runner");
        svg.appendChild(p);
        return p;
    });

    const lengths = runners.map(p => p.getTotalLength());
    const totalLen = lengths.reduce((a, b) => a + b, 0);

    const dashLenTarget = Math.max(MIN_DASH_PX, totalLen * DASH_RATIO);
    const durationMs = (totalLen / SPEED_PX_PER_SEC) * 1000;

    let cmBefore = 0;

    runners.forEach((runner, i) => {
        const len = lengths[i];

        const dashLen = Math.min(
            dashLenTarget,
            Math.max(GAP_MIN_PX + 1, len - GAP_MIN_PX)
        );

        const gapLen = Math.max(GAP_MIN_PX, len - dashLen);

        runner.setAttribute(
            "stroke-dasharray",
            `${dashLen} ${gapLen}`
        );

        const phaseMs = (cmBefore / totalLen) * durationMs;

        runner.animate(
            [
                { strokeDashoffset: "0" },
                { strokeDashoffset: String(-len) }
            ],
            {
                duration: durationMs,
                iterations: Infinity,
                easing: "linear",
                delay: -phaseMs,
                fill: "both"
            }
        );

        cmBefore += len;
    });
  }

  useEffect(() => {
    if (containerRef.current) {
      const svg = containerRef.current.querySelector("svg") as SVGSVGElement;
      svg.querySelectorAll("path").forEach((path) => setupPath(svg, path as SVGPathElement));
    }
  }, []);

  return (
    <div ref={containerRef} className={className} data-speed={dataSpeed}>
      {children}
    </div>
  )
}

export default Shapes