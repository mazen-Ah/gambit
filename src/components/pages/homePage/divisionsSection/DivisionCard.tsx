import Link from "@/src/components/common/Link";
import { ArrowUpRightSmallIcon, GambitLogo } from "../../../Icons";
import { useContext, useRef } from "react";
import gsap from "gsap";
import { computeGridShift, getEm } from "./DivisionUtils";
import LogoCanvas from "./LogoCanvas";
import { isMobileContext } from "@/src/contexts/isMobileContext";
import SlicedImage from "@/src/components/common/SlicedImage";
import DivisionLogo from "./DivisionLogo";
export interface Division {
  id: string;
  name: string;
  color: string;
  title: string;
  description: string;
  image: string;
  frontImageUrl?: string;
  backImageUrl?: string;
  logo?: string;
  button?: any;
  label?: string;
  reach_text?: {en: string, ar: string};
}

interface DivisionCardProps {
  division: Division;
  className?: string;
}

const DivisionCard = ({ division, className = "" }: DivisionCardProps) => {
  const { isMobile, isTablet } = useContext(isMobileContext) || {
    isMobile: false,
    isTablet: false,
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline>(null);

  const canvasDrawRef01 = useRef<any>(null);
  const canvasDrawRef02 = useRef<any>(null);

  const canvasState01 = useRef<any>({
    angle: Math.PI * 2,
    startAngle: -Math.PI / 2,
    r: 0,
    cx: 0,
    cy: 0,
    dpr: 1,
  });
  const canvasState02 = useRef<any>({
    angle: 0,
    startAngle: -Math.PI / 2,
    r: 0,
    cx: 0,
    cy: 0,
    dpr: 1,
  });

  const handleMouseEnter = () => {
    if (!cardRef.current) return;

    const ease = "power3.inOut";
    const dur = 0.6;

    const card = cardRef.current;
    const grid = card.parentElement as HTMLDivElement;

    const nodes = card.querySelectorAll(".slice_node");
    const staticLogo = card.querySelector(".dv_icon") as HTMLDivElement;
    const extendContent = card.querySelectorAll(".dv_extend ._eleY");
    const extendIcon = card.querySelector(".dv_extend .dv_icon") as HTMLDivElement;

    // rotate nodes
    gsap.fromTo(
      nodes,
      {
        rotateX: 0,
      },
      {
        delay: 0.2,
        duration: 1.2,
        stagger: -0.06,
        ease: "power3.inOut",
        rotateX: 360,
        transformOrigin: "center",
      }
    );

    if (card.offsetWidth < grid.offsetWidth / 2) {
      gsap.killTweensOf(grid);
      gsap.to(grid, {
        duration: dur,
        x: computeGridShift(grid, card),
        ease,
      });
    }

    gsap.killTweensOf(card);

    if (tlRef.current) tlRef.current.kill();
    tlRef.current = gsap.timeline();

    if (!isMobile || isTablet) {
      tlRef.current
      .to(card, {
        duration: dur,
        width: () => 60 * getEm(card),
        ease,
      })
    }

    tlRef.current
    .to(staticLogo, {
      duration: dur,
      autoAlpha: 0,
      scale: 0.9,
      ease: "power3.in",
    }, 0)
    .to(canvasState01.current, {
      angle: 0,
      duration: 0.6,
      onUpdate: canvasDrawRef01.current,
      ease,
    }, "<")
    .fromTo(extendContent, {
      yPercent: 25,
      autoAlpha: 0,
    }, {
      duration: dur,
      stagger: 0.15,
      yPercent: 0,
      autoAlpha: 1,
      ease: "power3.out",
    }, "+=0.2")
    if (isMobile || isTablet) {
      tlRef.current
      .to(extendIcon, {
        duration: dur,
        autoAlpha: 1,
        ease,
      }, "<")
    }
    tlRef.current
    .to(canvasState02.current, {
      angle: Math.PI * 2,
      duration: 0.6,
      onUpdate: canvasDrawRef02.current,
      ease: "power3.out",
    }, "-=0.8");
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;

    if (!card) return;
    if (!tlRef.current) return;

    const dur = 0.6;

    const grid = card.parentElement as HTMLDivElement;
    const staticLogo = card.querySelector(".dv_icon") as HTMLDivElement;
    const extendContent = card.querySelectorAll(".dv_extend ._eleY");

    tlRef.current.kill();
    tlRef.current = gsap.timeline();

    if (!isMobile || isTablet) {
      tlRef.current.to(card, {
        duration: dur,
        width: "25%",
        ease: "power3.inOut",
      });
    }
    tlRef.current
      .to(
        extendContent,
        {
          duration: dur,
          stagger: -0.15,
          yPercent: 25,
          autoAlpha: 0,
          ease: "power3.out",
        },
        0
      )
      .to(
        canvasState02.current,
        {
          angle: 0,
          duration: 0.6,
          onUpdate: canvasDrawRef02.current,
          ease: "power3.in",
        },
        0
      )
      .to(
        canvasState01.current,
        {
          angle: Math.PI * 2,
          duration: 0.6,
          onUpdate: canvasDrawRef01.current,
          ease: "power3.out",
        },
        0.6
      )
      .to(
        staticLogo,
        {
          duration: dur,
          autoAlpha: 1,
          scale: 1,
          ease: "power3.out",
        },
        "<"
      );

    gsap.to(grid, {
      duration: 0.6,
      x: 0,
      ease: "power3.inOut",
    });
  };
  // Helper function to get text from multilingual object
  const getText = (content: any) => {
    if (typeof content === 'string') return content;
    return content?.en || content?.ar || '';
  };

  const reachText = getText(division.reach_text);

  return (
    <div
      ref={cardRef}
      className={`dv_block_set _eleX | shrink-0 relative h-[40.5em] lg:px-[0.625em] w-full min-[601px]:w-[22.7%] lg:w-[25%] ${className} pointer-events-none ${division.color}`}
      // style={{ backgroundColor: division.color }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dv_block | relative flex items-center justify-center h-full rounded-2xl overflow-hidden">
        <div className="dv_bg absolute w-[60em] top-0 -bottom-[8px] will-change-transform pointer-events-none ">
          <SlicedImage
            FrontImageUrl={division?.frontImageUrl || ""}
            BackImageUrl={division?.backImageUrl || ""}
            color={division.color}
          />
        </div>
        <div className="dv_static absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="dv_icon relative h-[7.6em] z-20 flex items-center justify-center">
            <LogoCanvas state={canvasState01} drawRef={canvasDrawRef01} />
            <DivisionLogo 
              color={division.color}
              logo={division.logo}
              name={division.name}
            />
          </div>
        </div>
        <div className="dv_extend p-[2em] lg:p-[3em] flex items-end absolute top-0 -bottom-[8px] lg:w-[60em] pointer-events-none">
          <div className="dv_icon absolute right-[3em] top-[3em] h-[6em] z-20 _eleY opacity-0 lg:opacity-100">
            <LogoCanvas state={canvasState02} drawRef={canvasDrawRef02} />
            <DivisionLogo 
              color={division.color}
              logo={division.logo}
              name={division.name}
              logoWidth={34}
            />
          </div>
          <div className="space-y-6 text-white lg:w-114">
            <div className="space-y-2">
              <h3 className="leading-tight! tracking-[-.09375rem]! _eleY opacity-0 ">
                {division.title}
              </h3>
              {reachText && (
                <span 
                  className="block text-white/80 leading-relaxed text-xs! lg:text-[0.834vw]! _eleY opacity-0"
                  dangerouslySetInnerHTML={{ __html: reachText }}
                />
              )}
            </div>
            <Link
              href={`${division.button[0]?.label?.url}`}
              className="inline-flex items-center !z-[9999999] gap-2 px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition-colors _eleY opacity-0"
            >
              <span className="text-xs font-semibold uppercase tracking-wider">
              {division.button[0]?.label?.en}
              </span>
              <ArrowUpRightSmallIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionCard;
