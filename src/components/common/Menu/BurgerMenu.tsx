"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isMobileContext } from "@/src/contexts/isMobileContext";
import LogoItem from "./LogoItem";
import InfoRow from "./InforRow";
import Link from "@/src/components/common/Link";
import {
  AddressIcon,
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  PhoneIcon,
  TwitterIcon,
} from "../../Icons";
import StrokeCanvasButton from "../StrokeCanvasButton";

export default function BurgerMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { isMobile } = useContext(isMobileContext) ?? { isMobile: false };

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinkBgRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const whiteLayerRef = useRef<HTMLDivElement>(null);
  const logosContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<GSAPTimeline>(null);

  const startPath = "M 0 0 L 0 0 Q 400 0 800 0 L 800 0 Z";
  const endPath = "M 0 0 L 0 0 Q 400 200 800 0 L 800 0 Z";

  useEffect(() => {
    if (isOpen) {
      if (!timelineRef.current) {
        const tl = gsap.timeline({ paused: true });

        tl.set(containerRef.current, { autoAlpha: 1 });
        tl.fromTo(
          whiteLayerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          0
        )
          .fromTo(
            pinkBgRef.current,
            { y: "-100%" },
            { y: "0%", duration: 1, ease: "power3.inOut" },
            0
          )
          .fromTo(
            pinkBgRef.current,
            { y: "-100%" },
            { y: "0%", duration: 1, ease: "power3.inOut" },
            0
          )
          .fromTo(
            pathRef.current,
            { attr: { d: startPath } },
            { attr: { d: endPath }, duration: 0.5, ease: "power3.in" },
            0
          )
          .fromTo(
            "#burger-menu ._eleY",
            { y: 100, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              stagger: 0.03,
            },
            0.5
          )
          .to(
            pathRef.current,
            {
              attr: { d: startPath },
              duration: 0.5,
              ease: "power3.out",
            },
            0.5
          );

        timelineRef.current = tl;
      }

      timelineRef.current?.play();
      if (isMobile) {
        gsap.set("#smooth-container", { overflow: "hidden" });
      } else {
        window.scrollSmoother?.paused(true);
      }
    } else if (timelineRef.current) {
      timelineRef.current?.reverse();
      if (isMobile) { 
        gsap.set("#smooth-container", { overflow: "auto" });
      } else {
        window.scrollSmoother?.paused(false);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (logosContainerRef.current && isOpen) {
        gsap.to(logosContainerRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  const handleLogoEnter = (id: string) => {
    gsap.set(".burger_logo_item", { autoAlpha: 0 }); // Hide all
    gsap.set(`#${id}`, { autoAlpha: 1 }); // Show specific
    gsap.to(logosContainerRef.current, { autoAlpha: 1, duration: 0.3 });
  };

  const handleLogoLeave = () => {
    gsap.to(logosContainerRef.current, { autoAlpha: 0, duration: 0.3 });
  };

  return (
    <div
      id="burger-menu"
      ref={containerRef}
      className={`fixed top-0 left-0 w-screen h-screen z-900 opacity-0 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        ref={logosContainerRef}
        className="absolute top-0 left-0 w-32 h-32 pointer-events-none flex flex-col max-md:hidden z-30"
      >
        <LogoItem id="logo-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="280"
            height="163"
            fill="none"
            viewBox="0 0 280 163"
          >
            <path
              fill="#ffa38c"
              d="M162.99 81.49c0 45.01-36.49 81.49-81.49 81.49S0 126.49 0 81.49 36.49 0 81.5 0s81.49 36.49 81.49 81.49"
            />
            <path
              fill="#fff"
              d="M30.26 81.13c0-2.79-2.28-4.94-5.2-4.94s-5.2 2.2-5.2 4.94 2.32 4.98 5.2 4.98 5.2-2.15 5.2-4.98m5.96-10.01v19.26c0 6.29-5.15 10.01-11.4 10.01-3.42 0-7.52-1.23-9.55-3.3l2.91-4.14c1.86 1.44 4.18 2.11 6.63 2.11s5.45-1.86 5.45-4.69v-2.03c-1.44 2.11-3.67 3.29-6.59 3.29-5.36 0-9.63-4.73-9.63-10.52s4.27-10.47 9.63-10.47c2.91 0 5.15 1.18 6.59 3.29V71.1h5.96zM54.07 81.46c0-2.87-2.28-5.11-5.2-5.11s-5.2 2.28-5.2 5.11 2.32 5.11 5.2 5.11 5.2-2.2 5.2-5.11m5.95-10.34v20.74h-5.96V88.9c-1.44 2.15-3.67 3.38-6.59 3.38-5.36 0-9.63-4.86-9.63-10.81s4.27-10.77 9.63-10.77c2.91 0 5.15 1.23 6.59 3.38v-2.96zM93.98 91.86h-5.96V76.78h-6.84v15.08h-5.95V76.78h-6.81v15.08h-5.95V71.12h31.51zM112.77 81.46c0-2.83-2.32-5.11-5.2-5.11s-5.2 2.24-5.2 5.11 2.28 5.11 5.2 5.11 5.2-2.24 5.2-5.11m5.79 0c0 5.96-4.27 10.81-9.63 10.81-2.87 0-5.11-1.18-6.55-3.34v2.91h-5.96V62.27h5.96v11.74c1.44-2.15 3.67-3.34 6.55-3.34 5.36 0 9.63 4.82 9.63 10.77M128.6 65.46h5.96v5.66h5.11v5.66h-5.11v6.76c0 1.94 1.48 3.17 3.21 3.17.59 0 1.39-.13 1.86-.3l.3 5.28c-.76.38-1.94.59-3.04.59-4.86 0-8.28-3.08-8.28-8.45V65.46zM126.15 71.12h-5.96v20.74h5.96zM126.8 65.04c0 1.98-1.65 3.63-3.63 3.63s-3.63-1.65-3.63-3.63 1.65-3.59 3.63-3.59 3.63 1.65 3.63 3.59M148.95 88.65c0 1.98-1.65 3.63-3.63 3.63s-3.63-1.65-3.63-3.63 1.65-3.59 3.63-3.59 3.63 1.65 3.63 3.59"
            />
            <path
              fill="#ffa38c"
              d="M185.65 81.46c0-2.87-2.28-5.11-5.19-5.11s-5.2 2.28-5.2 5.11 2.32 5.11 5.2 5.11 5.19-2.2 5.19-5.11m5.95-10.35v20.74h-5.96v-2.96c-1.44 2.15-3.67 3.38-6.59 3.38-5.36 0-9.63-4.86-9.63-10.81s4.27-10.77 9.63-10.77c2.92 0 5.15 1.23 6.59 3.38v-2.96zM220.45 79.1c-.25-2.07-2.15-3.59-4.35-3.59-2.49 0-4.14 1.35-4.69 3.59zm5.79 3.8h-14.91c.55 2.83 2.49 4.31 5.32 4.31 1.86 0 3.8-.85 4.52-2.11l4.65 2.83c-1.52 2.74-4.98 4.35-9.29 4.35-6.08 0-10.9-4.73-10.9-10.9s4.73-10.69 10.77-10.69c5.62 0 10.01 4.35 10.01 9.88 0 .72-.04 1.52-.17 2.32M234 62.29h-5.95v29.57H234zM258.87 79.1c-.25-2.07-2.15-3.59-4.35-3.59-2.49 0-4.14 1.35-4.69 3.59zm5.79 3.8h-14.91c.55 2.83 2.49 4.31 5.32 4.31 1.86 0 3.8-.85 4.52-2.11l4.65 2.83c-1.52 2.74-4.98 4.35-9.29 4.35-6.08 0-10.9-4.73-10.9-10.9s4.73-10.69 10.77-10.69c5.62 0 10.01 4.35 10.01 9.88 0 .72-.04 1.52-.17 2.32M279.17 76.77h-6.8v15.08h-5.92V71.11h12.72zM194.05 65.46H200v5.66h5.11v5.66H200v6.76c0 1.94 1.48 3.17 3.21 3.17.59 0 1.39-.13 1.86-.3l.3 5.28c-.76.38-1.94.59-3.04.59-4.86 0-8.28-3.08-8.28-8.45zM242.41 71.11h-5.95v20.74h5.95zM243.07 65.04c0 1.98-1.65 3.63-3.63 3.63s-3.63-1.65-3.63-3.63 1.65-3.59 3.63-3.59 3.63 1.65 3.63 3.59"
            />
          </svg>
        </LogoItem>
        <LogoItem id="logo-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="263"
            height="163"
            fill="none"
            viewBox="0 0 263 163"
          >
            <path
              fill="#ba0d2e"
              d="M162.99 81.49c0 45.01-36.49 81.49-81.5 81.49S0 126.49 0 81.49 36.49 0 81.49 0s81.5 36.49 81.5 81.49"
            />
            <path
              fill="#fff"
              d="M30.25 81.13c0-2.79-2.28-4.94-5.2-4.94s-5.2 2.2-5.2 4.94 2.32 4.98 5.2 4.98 5.2-2.15 5.2-4.98m5.96-10.02v19.26c0 6.29-5.15 10.01-11.4 10.01-3.42 0-7.52-1.22-9.55-3.29l2.91-4.14c1.86 1.44 4.18 2.11 6.63 2.11s5.45-1.86 5.45-4.69v-2.03c-1.44 2.11-3.67 3.29-6.59 3.29-5.36 0-9.63-4.73-9.63-10.52s4.27-10.47 9.63-10.47c2.91 0 5.15 1.18 6.59 3.29V71.1h5.96zM54.06 81.46c0-2.87-2.28-5.11-5.2-5.11s-5.2 2.28-5.2 5.11 2.32 5.11 5.2 5.11 5.2-2.2 5.2-5.11m5.96-10.35v20.74h-5.96v-2.96c-1.44 2.15-3.67 3.38-6.59 3.38-5.36 0-9.63-4.86-9.63-10.81s4.27-10.77 9.63-10.77c2.91 0 5.15 1.22 6.59 3.38v-2.96zM93.97 91.85h-5.95V76.78h-6.84v15.07h-5.96V76.78h-6.8v15.07h-5.96V71.11h31.51zM112.76 81.46c0-2.83-2.32-5.11-5.2-5.11s-5.2 2.24-5.2 5.11 2.28 5.11 5.2 5.11 5.2-2.24 5.2-5.11m5.79 0c0 5.96-4.27 10.81-9.63 10.81-2.87 0-5.11-1.18-6.55-3.34v2.91h-5.96V62.27h5.96v11.74c1.44-2.15 3.67-3.34 6.55-3.34 5.36 0 9.63 4.82 9.63 10.77M128.59 65.45h5.96v5.66h5.11v5.66h-5.11v6.76c0 1.94 1.48 3.17 3.21 3.17.59 0 1.39-.13 1.86-.29l.3 5.28c-.76.38-1.94.59-3.04.59-4.86 0-8.28-3.08-8.28-8.45V65.46zM126.149 71.11h-5.96v20.74h5.96zM126.799 65.03c0 1.98-1.65 3.63-3.63 3.63s-3.63-1.65-3.63-3.63 1.65-3.59 3.63-3.59 3.63 1.65 3.63 3.59M148.949 88.64c0 1.98-1.65 3.63-3.63 3.63s-3.63-1.65-3.63-3.63 1.65-3.59 3.63-3.59 3.63 1.65 3.63 3.59"
            />
            <path
              fill="#ba0d2e"
              d="M186.6 81.46c0-2.83-2.32-5.11-5.2-5.11s-5.2 2.24-5.2 5.11 2.28 5.11 5.2 5.11 5.2-2.24 5.2-5.11m5.79 0c0 5.96-4.27 10.82-9.63 10.82-2.87 0-5.11-1.18-6.55-3.34v9.76h-5.96V71.11h5.96v2.91c1.44-2.15 3.68-3.34 6.55-3.34 5.37 0 9.63 4.82 9.63 10.78M194.029 91.85V71.11h5.96v15.08h7.39V71.11h5.96v20.74zM221.739 62.28h-5.96v29.58h5.96zM223.369 89.66l1.78-4.14c1.94 1.44 4.48 2.2 7.01 2.2 1.86 0 3.04-.72 3.04-1.69-.04-3.17-11.2-.8-11.28-8.45-.04-3.89 3.42-6.89 8.32-6.89 2.91 0 5.83.72 7.9 2.37l-1.69 4.31c-1.61-1.22-4.22-2.15-6.46-2.15-1.52 0-2.54.72-2.54 1.65.04 3 11.28 1.35 11.41 8.79 0 3.84-3.38 6.63-8.2 6.63-3.55 0-6.8-.85-9.3-2.62M256.49 79.09c-.25-2.07-2.16-3.59-4.35-3.59-2.49 0-4.14 1.35-4.69 3.59zm5.79 3.8h-14.92c.55 2.83 2.49 4.31 5.32 4.31 1.86 0 3.8-.84 4.52-2.11l4.65 2.83c-1.52 2.75-4.98 4.35-9.3 4.35-6.08 0-10.9-4.73-10.9-10.9s4.73-10.69 10.78-10.69c5.62 0 10.01 4.35 10.01 9.89 0 .72-.04 1.52-.17 2.32"
            />
          </svg>
        </LogoItem>
        <LogoItem id="logo-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="256"
            height="163"
            fill="none"
            viewBox="0 0 256 163"
          >
            <path
              fill="#6b7866"
              d="m169.18 89.66 1.77-4.14c1.94 1.44 4.48 2.2 7.01 2.2 1.86 0 3.04-.72 3.04-1.69-.04-3.17-11.2-.8-11.28-8.45-.04-3.89 3.42-6.89 8.32-6.89 2.91 0 5.83.72 7.9 2.37l-1.69 4.31c-1.61-1.23-4.22-2.16-6.46-2.16-1.52 0-2.54.72-2.54 1.65.04 3 11.28 1.35 11.41 8.79 0 3.84-3.38 6.63-8.2 6.63-3.55 0-6.8-.84-9.3-2.62M203.7 81.47c0-2.87-2.28-5.11-5.2-5.11s-5.2 2.28-5.2 5.11 2.32 5.11 5.2 5.11 5.2-2.2 5.2-5.11m5.96-10.35v20.75h-5.96v-2.96c-1.44 2.15-3.68 3.38-6.59 3.38-5.37 0-9.63-4.86-9.63-10.82s4.27-10.77 9.63-10.77c2.91 0 5.15 1.22 6.59 3.38v-2.96zM227.5 81.13c0-2.79-2.28-4.94-5.2-4.94s-5.2 2.2-5.2 4.94 2.32 4.99 5.2 4.99 5.2-2.15 5.2-4.99m5.96-10.06v19.31c0 6.3-5.16 10.01-11.41 10.01-3.42 0-7.52-1.23-9.55-3.3l2.92-4.14c1.86 1.44 4.18 2.11 6.63 2.11s5.45-1.86 5.45-4.69v-2.03c-1.44 2.11-3.68 3.3-6.59 3.3-5.37 0-9.63-4.73-9.63-10.52s4.27-10.48 9.63-10.48c2.91 0 5.15 1.18 6.59 3.3v-2.87zM249.92 79.1c-.25-2.07-2.15-3.59-4.35-3.59-2.49 0-4.14 1.35-4.69 3.59zm5.79 3.8h-14.92c.55 2.83 2.49 4.31 5.32 4.31 1.86 0 3.8-.84 4.52-2.11l4.65 2.83c-1.52 2.75-4.99 4.35-9.3 4.35-6.08 0-10.9-4.73-10.9-10.9s4.73-10.69 10.78-10.69c5.62 0 10.01 4.35 10.01 9.89 0 .72-.04 1.52-.17 2.32M162.99 81.49c0 45.01-36.49 81.49-81.49 81.49S0 126.49 0 81.49 36.49 0 81.5 0s81.49 36.49 81.49 81.49"
            />
            <path
              fill="#fff"
              d="M30.26 81.13c0-2.79-2.28-4.94-5.2-4.94s-5.19 2.2-5.19 4.94 2.32 4.98 5.19 4.98 5.2-2.15 5.2-4.98m5.95-10.01v19.26c0 6.29-5.15 10.01-11.4 10.01-3.42 0-7.52-1.22-9.55-3.29l2.91-4.14c1.86 1.44 4.18 2.11 6.63 2.11s5.45-1.86 5.45-4.69v-2.03c-1.44 2.11-3.68 3.29-6.59 3.29-5.36 0-9.63-4.73-9.63-10.52s4.27-10.47 9.63-10.47c2.92 0 5.15 1.18 6.59 3.29v-2.83h5.95zM54.06 81.47c0-2.87-2.28-5.11-5.19-5.11s-5.19 2.28-5.19 5.11 2.32 5.11 5.19 5.11 5.19-2.2 5.19-5.11m5.96-10.35v20.74h-5.96V88.9c-1.44 2.15-3.67 3.38-6.59 3.38-5.36 0-9.63-4.86-9.63-10.81s4.27-10.77 9.63-10.77c2.92 0 5.15 1.22 6.59 3.38v-2.96zM93.98 91.86h-5.96V76.78h-6.84v15.08h-5.96V76.78h-6.8v15.08h-5.95V71.12h31.51zM112.77 81.47c0-2.83-2.32-5.11-5.2-5.11s-5.19 2.24-5.19 5.11 2.28 5.11 5.19 5.11 5.2-2.24 5.2-5.11m5.78 0c0 5.96-4.27 10.81-9.63 10.81-2.87 0-5.11-1.18-6.55-3.34v2.91h-5.96V62.28h5.96v11.74c1.44-2.15 3.67-3.34 6.55-3.34 5.36 0 9.63 4.82 9.63 10.77M128.6 65.46h5.96v5.66h5.11v5.66h-5.11v6.76c0 1.94 1.48 3.17 3.21 3.17.59 0 1.39-.13 1.86-.29l.3 5.28c-.76.38-1.94.59-3.04.59-4.86 0-8.28-3.08-8.28-8.45V65.47zM126.15 71.12h-5.96v20.74h5.96zM126.8 65.04c0 1.98-1.65 3.63-3.63 3.63s-3.63-1.65-3.63-3.63 1.65-3.59 3.63-3.59 3.63 1.65 3.63 3.59M148.95 88.65c0 1.98-1.65 3.63-3.63 3.63s-3.63-1.65-3.63-3.63 1.65-3.59 3.63-3.59 3.63 1.65 3.63 3.59"
            />
          </svg>
        </LogoItem>
        <LogoItem id="logo-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="237"
            height="163"
            fill="none"
            viewBox="0 0 237 163"
          >
            <path
              fill="#0066ba"
              d="M162.99 81.49c0 45.01-36.49 81.49-81.49 81.49S0 126.49 0 81.49 36.49 0 81.5 0s81.49 36.49 81.49 81.49"
            />
            <path
              fill="#fff"
              d="M30.25 81.13c0-2.79-2.28-4.94-5.2-4.94s-5.19 2.2-5.19 4.94 2.32 4.98 5.19 4.98 5.2-2.15 5.2-4.98m5.96-10.01v19.26c0 6.29-5.15 10.01-11.4 10.01-3.42 0-7.52-1.23-9.55-3.3l2.91-4.14c1.86 1.44 4.18 2.11 6.63 2.11s5.45-1.86 5.45-4.69v-2.03c-1.44 2.11-3.68 3.29-6.59 3.29-5.36 0-9.63-4.73-9.63-10.52s4.27-10.47 9.63-10.47c2.92 0 5.15 1.18 6.59 3.29V71.1h5.95zM54.06 81.46c0-2.87-2.28-5.11-5.19-5.11s-5.19 2.28-5.19 5.11 2.32 5.11 5.19 5.11 5.19-2.2 5.19-5.11m5.96-10.34v20.74h-5.96V88.9c-1.44 2.15-3.67 3.38-6.59 3.38-5.36 0-9.63-4.86-9.63-10.81s4.27-10.77 9.63-10.77c2.92 0 5.15 1.23 6.59 3.38v-2.96zM93.97 91.86h-5.95V76.78h-6.85v15.08h-5.95V76.78h-6.8v15.08h-5.96V71.12h31.51zM112.76 81.46c0-2.83-2.32-5.11-5.2-5.11s-5.19 2.24-5.19 5.11 2.28 5.11 5.19 5.11 5.2-2.24 5.2-5.11m5.79 0c0 5.96-4.27 10.81-9.63 10.81-2.87 0-5.11-1.18-6.55-3.34v2.91h-5.96V62.27h5.96v11.74c1.44-2.15 3.67-3.34 6.55-3.34 5.36 0 9.63 4.82 9.63 10.77M128.59 65.46h5.96v5.66h5.11v5.66h-5.11v6.76c0 1.94 1.48 3.17 3.21 3.17.59 0 1.39-.13 1.86-.3l.3 5.28c-.76.38-1.94.59-3.04.59-4.86 0-8.28-3.08-8.28-8.45V65.46zM126.15 71.12h-5.96v20.74h5.96zM126.8 65.04c0 1.98-1.65 3.63-3.63 3.63s-3.63-1.65-3.63-3.63 1.65-3.59 3.63-3.59 3.63 1.65 3.63 3.59M148.95 88.65c0 1.98-1.65 3.63-3.63 3.63s-3.63-1.65-3.63-3.63 1.65-3.59 3.63-3.59 3.63 1.65 3.63 3.59"
            />
            <path
              fill="#0066ba"
              d="M230.88 81.46c0-2.87-2.28-5.11-5.2-5.11s-5.2 2.28-5.2 5.11 2.32 5.11 5.2 5.11 5.2-2.2 5.2-5.11m5.95-19.18v29.57h-5.96v-2.96c-1.44 2.15-3.67 3.38-6.59 3.38-5.36 0-9.63-4.86-9.63-10.82s4.27-10.77 9.63-10.77c2.92 0 5.15 1.22 6.59 3.38V62.27h5.96zM209.66 71.11l-3.42 11.36-4.18-11.36h-4.65l-4.14 11.36-3.46-11.36h-11.48v-1.23c0-1.9 1.48-3.17 3.21-3.17.59 0 1.44.17 1.86.3l.3-5.24c-.76-.38-1.94-.63-3.04-.63-4.86 0-8.28 3.08-8.28 8.45v1.52h-3.84v5.66h3.84v15.08h5.96V76.77h7.15l5.44 15.08h4.6l4.22-11.36 4.18 11.36h4.69l7.48-20.74h-6.44"
            />
          </svg>
        </LogoItem>
      </div>
      <div
        ref={wrapRef}
        className="absolute top-0 left-0 inset-0 h-screen overflow-hidden z-30"
      >
        <div className="relative w-full h-full overflow-y-scroll z-30 [&::-webkit-scrollbar]:hidden">
          <div className="pt-[11em] pb-[4em] px-[5vw] text-white flex flex-col items-center min-h-full">
            <div className="w-full max-w-[75em] flex flex-col gap-20">
              <div className="flex justify-between max-md:flex-col max-md:gap-12">
                <div className="flex flex-col items-start gap-6 flex-1">
                  <p className="text-base opacity-70 mb-4 _eleY">Quick Links</p>
                  <ul className="group flex flex-col items-start gap-0">
                    {[
                      { name: "Home", href: "/" },
                      { name: "About us", href: "/about-us" },
                      { name: "The Players", href: "/players" },
                      { name: "Clients and Awards", href: "/awards" },
                      { name: "Contact us", href: "/contact-us" },
                    ].map((item, i) => (
                      <li key={i} className="_eleY">
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-[2.625em] font-medium py-[0.25em] block transition-colors duration-300 group-hover:text-white/40 hover:!text-white"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-start gap-6 flex-1">
                  <p className="text-base opacity-70 mb-4 _eleY">
                    Our Divisions
                  </p>
                  <ul
                    className="group flex flex-col items-start gap-0"
                    onMouseLeave={handleLogoLeave}
                  >
                    {[
                      { name: "Atelier", id: "logo-1", href: "/atelier" },
                      { name: "Pulse", id: "logo-2", href: "/pulse" },
                      { name: "Sage", id: "logo-3", href: "/sage" },
                      { name: "FWD", id: "logo-4", href: "/fwd" },
                    ].map((item, i) => (
                      <li
                        key={i}
                        onMouseEnter={() => handleLogoEnter(item.id)}
                        className="_eleY"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-[2.625em] font-medium py-[0.25em] block transition-colors duration-300 group-hover:text-white/40 hover:!text-white"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="py-[3.75em] border-y border-white/30 flex justify-between max-md:flex-col max-md:gap-8">
                <ul className="flex flex-col w-full gap-8">
                  <li className="flex lg:gap-36  max-lg:flex-col max-sm:flex-row! items-start  max-lg:gap-4  py-5 first:pt-0 max-lg:w-full! _eleY">
                    <div className="flex items-center justify-center gap-2 px-4 h-11 rounded-full bg-primary border border-white/30 min-w-[8.125em] shrink-0 _eleY">
                      <AddressIcon />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Address
                      </span>
                    </div>
                    <div className="flex-1  max-w-94 _eleY">
                      <span className="text-base ">
                        Gambit Communications, The Binary by Omniyat, Offices
                        P3-14 & P3-15, Business Bay, Dubai
                      </span>
                    </div>
                  </li>
                  <li className="flex lg:gap-36 max-lg:flex-col max-sm:flex-row! items-start  gap-6 max-lg:gap-4 py-5 _eleY">
                    <div className="flex items-center justify-center gap-2 px-4 h-11 rounded-full bg-primary border border-white/30 min-w-[8.125em] shrink-0 _eleY">
                      <EmailIcon />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Email
                      </span>
                    </div>
                    <div className="flex-1 flex  md:flex-row justify-between gap-6 w-full max-w-94">
                      <div className="flex flex-col gap-2 items-start flex-1 _eleY">
                        <strong className="text-sm md:text-base font-semibold">
                          General
                        </strong>
                        <a
                          href="mailto:info@gambit.ae"
                          className="relative inline-block text-white/80 hover:text-white transition-all duration-400 "
                        >
                          info@gambit.ae
                        </a>
                      </div>
                      <div className="flex flex-col gap-2 items-start flex-1 _eleY">
                        <strong className="text-sm md:text-base font-semibold">
                          Careers
                        </strong>
                        <a
                          href="mailto:careers@gambit.ae"
                          className="relative inline-block text-white/80 hover:text-white transition-all duration-400"
                        >
                          careers@gambit.ae
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="flex lg:gap-36 max-lg:flex-col max-sm:flex-row! items-start max-lg:gap-4 py-5 _eleY">
                    <div className="flex items-center justify-center gap-2 px-4 h-11 rounded-full bg-primary border border-white/30 min-w-[8.125em] shrink-0 _eleY">
                      <PhoneIcon />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Phone
                      </span>
                    </div>
                    <div className="flex-1 flex justify-between max-w-94 _eleY">
                      <div className="flex flex-col gap-2 items-start">
                        <strong className="text-sm md:text-base font-semibold">
                          Customer Service
                        </strong>
                        <a
                          href="tel:+97145786446"
                          className="relative inline-block text-white/80 hover:text-white transition-all duration-400 "
                        >
                          +971 (0) 4 578 6446
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex">
                <div className="flex gap-4">
                  <div className="flex gap-4">
                    <StrokeCanvasButton
                      wrapperClassName="w-auto h-auto before:bg-primary _eleY"
                      canvasColor="#ffffff"
                    >
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 p-2.5 rounded-full border border-white/30 hover:text-white hover:bg-white/10 transition-colors duration-400 _eleY"
                        aria-label="X (Twitter)"
                      >
                        <TwitterIcon />
                      </a>
                    </StrokeCanvasButton>
                    <StrokeCanvasButton
                      wrapperClassName="w-auto h-auto before:bg-primary _eleY"
                      canvasColor="#ffffff"
                    >
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 p-2.5 rounded-full border border-white/30 hover:text-white hover:bg-white/10 transition-colors duration-400 _eleY"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon />
                      </a>
                    </StrokeCanvasButton>
                    <StrokeCanvasButton
                      wrapperClassName="w-auto h-auto before:bg-primary _eleY"
                      canvasColor="#ffffff"
                    >
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 p-2.5 rounded-full border border-white/30 hover:text-white hover:bg-white/10 transition-colors duration-400 _eleY"
                        aria-label="Facebook"
                      >
                        <FacebookIcon />
                      </a>
                    </StrokeCanvasButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={pinkBgRef}
        className="absolute left-0 top-0 w-full h-full bg-primary z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 top-[99%] w-full h-auto"
          fill="none"
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M 0 0 L 0 0 Q 400 0 800 0 L 800 0 Z"
            fill="var(--primary)"
          ></path>
        </svg>
      </div>
      <div
        ref={whiteLayerRef}
        className="white-layer absolute left-0 top-0 w-full h-full bg-white opacity-0 z-10"
      ></div>
    </div>
  );
}
