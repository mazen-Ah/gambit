"use client";

import Link from "@/src/components/common/Link";
import { ArrowUpRightIcon } from "../Icons";
import LetterAnimation from "./Animation/LetterAnimation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import StrokeCanvasButton from "./StrokeCanvasButton";

interface SectionHeaderProps {
  icon: React.ReactNode;
  text: string;
  title: string | React.ReactNode;
  link?: string;
  showLinkButton?: boolean;
  className?: string;
  titleClassName?: string;
  linkClassName?: string;
  BadgeClassName?: string;
  canvasColor?: string;
  wrapperClassName?: string;
  description?: string;
  descriptionClassName?: string;
  textClassName?: string;
}

const SectionHeader = ({
  text,
  icon,
  title,
  link = "#",
  showLinkButton = true,
  className = "",
  titleClassName = "",
  linkClassName = "",
  BadgeClassName = "",
  canvasColor = "",
  wrapperClassName = "",
  description = "",
  textClassName = "",
  descriptionClassName = "",
}: SectionHeaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (text || showLinkButton) {
      const container = containerRef.current;
      if (!container) return;

      const eleYs = container.querySelectorAll("._eleY");
      gsap.set(eleYs, { autoAlpha: 0, yPercent: 100 });

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        once: true,
        onEnter: () => {
          gsap.to(eleYs, {
            delay: 0.15,
            duration: 0.7,
            stagger: 0.1,
            yPercent: 0,
            autoAlpha: 1,
            ease: "power3.out",
          });
        },
      });

      return () => {
        trigger.kill();
      };
    }
  }, [text, showLinkButton]);

  return (
    <div
      ref={containerRef}
      className={`mb-12 lg:mb-15 lg:max-w-180 ${className}`}
    >
      {(text || showLinkButton) && (
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {text && (
            <div
              className={`_eleY flex items-center justify-center gap-2 px-[0.9375em] h-11  rounded-full border border-text-primary bg-transparent ${BadgeClassName}`}
            >
              <span className="w-[0.85rem] flex items-center justify-center">
                {icon}
              </span>
              <span
                className={`text-xs font-semibold uppercase tracking-[1px] ${textClassName}`}
              >
                {text}
              </span>
            </div>
          )}
          {showLinkButton && (
            <StrokeCanvasButton
              wrapperClassName={wrapperClassName}
              canvasColor={canvasColor}
            >
              <Link
                href={link}
                className={`_eleY relative flex items-center justify-center w-11 h-11 rounded-full border border-text-primary-30 hover:text-text-primary transition-colors duration-400 group ${linkClassName}`}
                aria-label="View more"
              >
                <ArrowUpRightIcon />
              </Link>
            </StrokeCanvasButton>
          )}
        </div>
      )}
      <h2 className={titleClassName}>
        <LetterAnimation text={title} />
      </h2>
      {description && (
        <p className={`${descriptionClassName} mt-6`}>
          <LetterAnimation text={description} />
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
