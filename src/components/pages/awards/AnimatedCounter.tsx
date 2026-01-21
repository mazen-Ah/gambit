"use client";

import { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileContext } from "@/src/contexts/isMobileContext";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

const AnimatedCounter = ({ value, className = "" }: AnimatedCounterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const context = useContext(isMobileContext);
  const isMobile = context?.isMobile ?? false;

  useEffect(() => {
    if (!valueRef.current || !containerRef.current) return;

    const numbers = value?.match(/\d+\.?\d*/g);

    if (!numbers || numbers.length === 0) {
      if (valueRef.current) {
        valueRef.current.innerHTML = value;
      }
      return;
    }

    if (valueRef.current) {
      valueRef.current.innerHTML = "";
    }

    const styles = window.getComputedStyle(valueRef.current!);
    const fontSize = styles.fontSize;
    const fontFamily = styles.fontFamily;
    const fontWeight = styles.fontWeight;
    const letterSpacing = styles.letterSpacing;
    const fontSizeNum = parseFloat(fontSize);
    const digitHeight = fontSizeNum * 1.25;
    const wrapperHeight = digitHeight + 4;

    const parts = value?.split(/(\d+\.?\d*)/g);

    let digitsContainer: HTMLDivElement | null = null;

    parts.forEach((part) => {
      if (/\d+\.?\d*/.test(part)) {
        // Create digits container if it doesn't exist
        if (!digitsContainer) {
          digitsContainer = document.createElement("div");
          digitsContainer.style.display = "inline-flex";
          digitsContainer.style.alignItems = "baseline";
          digitsContainer.style.direction = "ltr";
          valueRef.current?.appendChild(digitsContainer);
        }

        const digits = part.split("");

        digits.forEach((char) => {
          if (char === ".") {
            const decimal = document.createElement("span");
            decimal.textContent = ".";
            decimal.style.fontSize = fontSize;
            decimal.style.fontFamily = fontFamily;
            decimal.style.fontWeight = fontWeight;
            decimal.style.lineHeight = `${wrapperHeight}px`;
            decimal.style.verticalAlign = "baseline";
            decimal.style.display = "inline-block";
            digitsContainer?.appendChild(decimal);
          } else {
            const wrapper = document.createElement("span");
            wrapper.style.display = "inline-block";
            wrapper.style.height = `${wrapperHeight}px`;
            wrapper.style.verticalAlign = "baseline";
            wrapper.style.letterSpacing = letterSpacing;

            const column = document.createElement("div");
            column.style.position = "relative";
            column.style.display = "flex";
            column.style.flexDirection = "column";

            const targetDigit = parseInt(char);

            for (let i = 0; i <= 9; i++) {
              const digit = document.createElement("div");
              digit.textContent = i.toString();
              digit.style.height = `${digitHeight}px`;
              digit.style.lineHeight = `${digitHeight}px`;
              digit.style.fontSize = fontSize;
              digit.style.fontFamily = fontFamily;
              digit.style.fontWeight = fontWeight;
              digit.style.textAlign = "center";
              digit.style.paddingTop = "2px";
              digit.style.paddingBottom = "2px";
              column.appendChild(digit);
            }

            wrapper.appendChild(column);
            digitsContainer?.appendChild(wrapper);

            gsap.set(column, { y: 0 });

            gsap.to(column, {
              y: -targetDigit * digitHeight,
              duration: 1.5,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
                toggleActions: "play none none none",
                once: true,
              },
            });
          }
        });
      } else if (part) {
        // Reset digitsContainer for non-digit parts
        digitsContainer = null;
        const text = document.createElement("span");
        text.textContent = part;
        text.style.fontSize = fontSize;
        text.style.marginInlineStart = "0.3rem";
        text.style.fontFamily = fontFamily;
        text.style.fontWeight = fontWeight;
        text.style.lineHeight = `${wrapperHeight}px`;
        text.style.verticalAlign = "baseline";
        text.style.display = "inline-block";
        valueRef.current?.appendChild(text);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [value, isMobile]);

  return (
    <div ref={containerRef} className="flex items-baseline">
      <div
        ref={valueRef}
        className={`overflow-hidden text-[6.25rem] max-sm:text-[4.375rem]  tracking-[-0.25rem]! ${className} `}
      >
        {value}
      </div>
    </div>
  );
};

export default AnimatedCounter;
