import { isMobileContext } from "@/src/contexts/isMobileContext";
import gsap from "gsap";
import { useContext, useEffect, useRef } from "react";
import Image from "next/image";

interface GameCardProps {
  title: string;
  description: string;
  index: number;
  activeIndex: number | null;
  icon: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const GameCard = ({
  title,
  index,
  activeIndex,
  description,
  icon,
  onMouseEnter,
  onMouseLeave,
}: GameCardProps) => {
  const { isMobile } = useContext(isMobileContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const backLayerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>(null);

  useEffect(() => {
    if (!isMobile) {
      const container = containerRef.current;
      if (!container) return;

      const staticEle = container.querySelectorAll(".serv_static ._ele");
      const hoverEle = container.querySelectorAll(".serv_hover ._ele");

      if (activeIndex === index) {
        if (!tl.current) {
          tl.current = gsap.timeline();
          tl.current
            .fromTo(
              staticEle,
              { autoAlpha: 1, y: 0 },
              {
                duration: 0.4,
                autoAlpha: 0,
                y: "-50%",
                stagger: 0.05,
                ease: "power3.in",
              }
            )
            .fromTo(
              hoverEle,
              { autoAlpha: 0, y: "50%" },
              {
                duration: 0.4,
                autoAlpha: 1,
                y: 0,
                stagger: 0.05,
                ease: "power3.out",
              }
            );
        } else tl.current.play();
      } else {
        if (tl.current) tl.current.reverse();
        else gsap.set(hoverEle, { autoAlpha: 0, y: "50%" });
      }

      if (!isMobile) {
        if (index === 0 && activeIndex !== null) {
          gsap.to(backLayerRef.current, {
            duration: 0.75,
            x: `${activeIndex * 100}%`,
            scale: 1,
            autoAlpha: 1,
            ease: "elastic.out(1,1)",
          });
        } else {
          gsap.to(backLayerRef.current, {
            duration: 0.5,
            scale: 0.9,
            autoAlpha: 0,
          });
        }
      }
    }
  }, [activeIndex]);

  //  opacity-100 group-hover:opacity-0 transition-opacity duration-300
  // bg-black/15 lg:group-hover:bg-black/15 lg:bg-transparent transition-all duration-300 lg:opacity-0 lg:hover:opacity-100
  return (
    <div
      ref={containerRef}
      className={`relative group cursor-pointer lg:h-109! flex flex-col items-center justify-center rounded-2xl _eleX `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!isMobile && index === 0 && (
        <div
          ref={backLayerRef}
          className="back_layer absolute inset-0 rounded-2xl origin-center bg-black/15"
          style={{
            transform: "scale(0.9)",
            opacity: 0,
          }}
        />
      )}
      <div className="serv_static hidden lg:flex flex-col items-center justify-center text-center p-10 ">
        <div className="mb-12 _ele">
          <div className="relative w-20 h-20 ">
            <Image src={icon} alt={title} fill className="object-contain" />
          </div>
        </div>
        <h4
          className="text-2xl font-medium tracking-tight leading-snug _ele"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <div className="serv_hover lg:absolute lg:inset-0 h-full flex flex-col items-start justify-between bg-black/15 lg:bg-transparent max-lg:gap-12 px-10 py-10 lg:py-15 lg:px-12.5 rounded-2xl">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-white/30 shrink-0 [&>svg]:w-7 [&>svg]:h-7 text-white/90 _ele">
          <div className="relative w-8 h-8">
            <Image src={icon} alt={title} fill className="object-contain" />
          </div>
        </div>
        <div className="mt-auto space-y-5">
          <h4
            className="text-2xl font-medium tracking-tight leading-snug _ele "
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-white/80 text-lg! _ele">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
