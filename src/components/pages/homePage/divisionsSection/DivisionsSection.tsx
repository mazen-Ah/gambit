"use client";

import { useRef } from "react";
import gsap from "gsap";
import SectionHeader from "../../../common/SectionHeader";
import DivisionsGrid from "./DivisionsGrid";
import { DivisionsIcon } from "../../../Icons";
import { Division } from "./DivisionCard";
import Shapes from "@/src/components/common/Animation/Shapes";
import GeneralAnimation from "@/src/components/common/Animation/GeneralAnimation";
import Image from "next/image";
const DivisionsSection = ({data}: any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getText = (content: any) => content?.en || content?.ar || '';

  // Header data
  const headerText = getText(data?.content?.subtitle); // "Character and Credibility"
  const headerTitle = getText(data?.content?.title); // "Divisions"

  // Section icon
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;

  // Division color mapping
  const colorMap: Record<string, string> = {
    'atelier': '#FFA38C',
    'pulse': '#BA0D2E',
    'sage': '#6B7866',
    'fwd': '#0066BA',
  };

  // Extract division cards from sub_sections
  const divisionCards = data?.sub_sections?.filter((s: any) => s.type === 'division-card') || [];
  const divisions: Division[] = divisionCards.map((card: any) => {
    const divisionName = getText(card.content?.title).toLowerCase();

    // Extract front and back images from sub_sections
    const backImageSection = card.sub_sections?.find((s: any) => s.name === 'back-image' || (s.type === 'image' && s.order === 1));
    const frontImageSection = card.sub_sections?.find((s: any) => s.name === 'front-image' || (s.type === 'image' && s.order === 2));
    const logoSection = card.sub_sections?.find((s: any) => s.name === 'logo' || (s.type === 'image' && s.order === 3));

    const backImageUrl = backImageSection?.media?.find((m: any) => m.collection_name === 'image_desktop')?.url || 
                         backImageSection?.media?.find((m: any) => m.collection_name === 'image')?.url || '';
    
    const frontImageUrl = frontImageSection?.media?.find((m: any) => m.collection_name === 'image_desktop')?.url || 
                          frontImageSection?.media?.find((m: any) => m.collection_name === 'image')?.url || '';

    const logoUrl = logoSection?.media?.find((m: any) => m.collection_name === 'image_desktop')?.url || 
                    logoSection?.media?.find((m: any) => m.collection_name === 'image')?.url || '';

    // Fallback to main media if sub_sections don't have images
    const fallbackImage = card.media?.find((m: any) => 
      m.collection_name === 'image_desktop' || m.collection_name === 'image'
    )?.url || '';

    return {
      id: divisionName,
      name: `gambit. ${getText(card.content?.title)}`,
      color: colorMap[divisionName],
      title: getText(card.content?.subtitle),
      description: getText(card.content?.description),
      button:card.content?.buttons,
      image: fallbackImage,
      frontImageUrl: frontImageUrl ,
      backImageUrl: backImageUrl ,
      logo: logoUrl,
      reach_text: card.content?.reach_text || card.reach_text,
    };
  });

  return (
    <section
      ref={containerRef}
      className={`relative w-full space-x bg-secondary space-y ${ data?.className || ""}`}
    >
      <GeneralAnimation
        containerRef={containerRef}
        triggerSelector=".dv_grid_set"
        type="_eleX"
        onComplete={() => {
          const query = gsap.utils.selector(containerRef.current);
          gsap.set(query("._eleX"), { pointerEvents: "auto" });
        }}
      >
        <Shapes className="animated_svg shape_a" dataSpeed="1.2">
          <svg
            width="499"
            height="576"
            viewBox="0 0 499 576"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M219.554 117.885C201.4 80.6456 186.295 41.7883 174.48 1.67034L136.129 69.4466L78.2178 45.7548L78.5196 108.324L1.48469 118.415C34.2675 144.383 64.6502 172.93 92.391 203.7M139.867 262.434C192.28 332.804 232.182 412.276 257.258 497.426M256.258 183.888C301.904 258.825 360.673 325.565 430.254 380.68M284.392 164.902L111.565 281.533L69.4754 219.165L242.303 102.533L284.392 164.902ZM497.742 418.926L267.305 574.435L228.454 516.864L458.89 361.355L497.742 418.926Z"
              stroke="#3C1A52"
              strokeOpacity="0.12"
              strokeMiterlimit="10"
            />
          </svg>
        </Shapes>
        <div className="w-full mx-auto relative z-10">
          <SectionHeader
            icon={<Image src={iconUrl} className="" alt="Icon" width={24} height={24} />}
            text={headerTitle}
            title={headerText}
            link="#"
            className=""
            titleClassName="text-text-primary-100"
            canvasColor="#000000"
            wrapperClassName="w-auto h-auto before:bg-[#ede3ee]"
          />
          <DivisionsGrid divisions={divisions} />
        </div>
      </GeneralAnimation>
    </section>
  );
};

export default DivisionsSection;
