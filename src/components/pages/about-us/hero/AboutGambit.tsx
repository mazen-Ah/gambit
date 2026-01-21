  "use client"

import SectionHeader from "@/src/components/common/SectionHeader";
import { CrownIconWhite } from "@/src/components/Icons";
import { ChessQueenPiece, ChessRockPiece } from "@/src/components/common/SVGs";
import GeneralAnimation from "@/src/components/common/Animation/GeneralAnimation";
import { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const AboutGambit = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  const text = getText(data?.content?.title); // Swapped: title -> text
  const title = getText(data?.content?.subtitle); // Swapped: subtitle -> title
  const description = getText(data?.content?.description);
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;
  return (
    <div className="w-full bg-primary space-y" ref={containerRef}>
      <GeneralAnimation 
        containerRef={containerRef}
        type="_eleX"
        start="top+=15% bottom"
        onEnter={()=> {
          gsap.to(".intial-svg", {
            duration: 1.2,
            ease: "power3.inOut",
            rotate: -180,
          });

          gsap.to(".target-svg", {
            duration: 1.2,
            ease: "power4.inOut",
            rotate: 0,
          });
        }}
      >
        <div className="lg:px-50 max-lg:px-5 flex items-center w-full justify-between gap-52 max-lg:flex-col max-lg:gap-17 _hide">
          <div className="relative w-80 h-80 flex items-center justify-center">
            <svg className="absolute w-full h-full" viewBox="0 0 313 313" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="156.5" cy="156.5" r="155" stroke="white" stroke-width="3"/>
              <defs>
                <clipPath id="circle">
                  <circle cx="156.5" cy="156.5" r="155" stroke="white" stroke-width="3"/>
                </clipPath>
              </defs>
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-full overflow-hidden">
              <div className="intial-svg absolute top-0 left-0 w-full h-full flex items-center justify-center mt-8 origin-bottom">
                <ChessRockPiece fill="#ffffff" className="rotate-270" />
              </div>
              <div className="target-svg absolute top-0 left-0 w-full h-full flex items-center justify-center mt-9 origin-bottom rotate-180">
                <ChessQueenPiece fill="#ffffff" className="rotate-30 translate-x-[10px]" />
              </div>
            </div> 
            {/* 
            */}
          </div>
          <SectionHeader
          text={text}
          BadgeClassName="border-white/30!"
          description={description}
          icon={<Image src={iconUrl} alt="Icon" width={24} height={24} />}
          className="max-w-235!"
          showLinkButton={false}
          titleClassName="text-white "
          descriptionClassName="text-white max-w-[49.357rem]! text-[1.3125rem]! leading-[150%] font-[400]! "
          textClassName="text-white"
          title={title}
        />
        </div>
      </GeneralAnimation>
    </div>
  );
};

export default AboutGambit;
