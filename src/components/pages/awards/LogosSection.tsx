'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionHeader from '../../common/SectionHeader';
import { PhilosophyIcon } from '../../Icons';

export default function LogoBoard({data}: {data: any}) {
  const squaresRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const labels = ["Logo A", "Logo B", "Logo C", ""];
    
    const ctx = gsap.context((self: any) => {
      const squares = squaresRef.current;

      function getRandomLabel(currentText: string): string {
        let options = labels.slice();
        if (currentText !== "") {
          options = options.filter((l) => l !== currentText);
        }
        return options[Math.floor(Math.random() * options.length)] || "";
      }

      function animateSquare(labelEl: HTMLSpanElement) {
        const current = labelEl.textContent?.trim() || "";
        const newLabel = getRandomLabel(current);
        gsap.to(labelEl, {
          duration: 1,
          autoAlpha: 0,
          ease: "power3.out",
          onComplete: () => {
            self?.add(() => {
                labelEl.textContent = newLabel;
                gsap.to(labelEl, {
                  delay: 0.5,
                  duration: 1,
                  ease: "power3.out",
                  autoAlpha: newLabel === "" ? 0 : 1
                });
            });
          }
        });
      }

      function cycleLogos() {
        squares.forEach((labelEl) => {
          if (labelEl && Math.random() < 0.6) {
            const delay = Math.random() * 0.8;
            gsap.delayedCall(delay, () => {
               self?.add(() => {
                   if (labelEl) animateSquare(labelEl);
               });
            });
          }
        });
        gsap.delayedCall(3, () => {
            self?.add(() => cycleLogos());
        });
      }

      // Initialize
      squares.forEach((labelEl) => {
        if (labelEl) {
          labelEl.textContent = labels[Math.floor(Math.random() * labels.length)];
          if (labelEl.textContent === "") {
            gsap.set(labelEl, { autoAlpha: 0 });
          }
        }
      });

      cycleLogos();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="space-x py-25 lg:py-40 bg-[#ede3ee]">
      <SectionHeader
          icon={<PhilosophyIcon />}
          showLinkButton={false}
          text="Clients"
          title="Who We Work With"
          className="mb-12"
        />
      <div className="flex flex-wrap w-full mx-auto bg-[#d2c6d6] border border-[#d2c6d6] border-r-0 gap-px">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className={`relative w-[calc(33.333%-1px)] md:w-[calc(20%-1px)] flex-[0_0_calc(33.333%-1px)] md:flex-[0_0_calc(20%-1px)] aspect-square flex items-center justify-center text-sm text-center ${
              index % 2 === 0 ? 'bg-[#ede3ee]' : 'bg-[#f0eaf1]'
            }`}
          >
            <span
              ref={(el) => {
                squaresRef.current[index] = el;
              }}
              className="font-semibold opacity-100 transition-opacity duration-200 pointer-events-none select-none whitespace-nowrap"
            >
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}