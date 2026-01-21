"use client";

import { useRef } from "react";
import { CrownIcon } from "../../../Icons";
import SectionHeader from "../../../common/SectionHeader";
import HeroSVGCircle from "../hero/HeroSVGCircle";
import GameGrid, { GameItem } from "./GameGrid";
import GeneralAnimation from "@/src/components/common/Animation/GeneralAnimation";
import Image from "next/image";

const TheGameSection = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  
  // Header data
  const headerText = getText(data?.content?.subtitle); // "The Game"
  const headerTitle = getText(data?.content?.title); // "Strategic thinking..."
  
  // Section icon
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;
  
  // Game cards from sub_sections
  const gameCards = data?.sub_sections?.filter((s: any) => s.type === 'game-card') || [];
  const gameItems: GameItem[] = gameCards.map((card: any) => {
    // Get inactive icon from card's sub_sections
    const inactiveIcon = card.sub_sections?.find(
      (s: any) => s.type === 'icon' && s.name === 'inactive-icon'
    );
    const cardIcon = inactiveIcon?.media?.find((m: any) => m.collection_name === 'icon')?.url || iconUrl;
    
    return {
      title: getText(card.content?.title),
      description: getText(card.content?.description),
      icon: cardIcon || '',
    };
  });
  return (
    <section
      ref={containerRef}
      className="game-section-wrapper relative bg-text-primary-100 bg-tp space-y  space-x text-white"
    >
      <GeneralAnimation
        containerRef={containerRef}
        triggerSelector=".game_container"
        type="_eleX"
      >
        <div className="game_container mx-auto relative z-10">
          <SectionHeader
            icon={<Image src={iconUrl} className="" alt="Icon" width={24} height={24} />}
            text={headerText}
            BadgeClassName="border-white/30"
            linkClassName="border-white/30  hover:text-white"
            title={headerTitle}
            link="#"
            canvasColor="#ffffff"
            wrapperClassName="w-auto h-auto before:bg-[#3C1A52]"
          />

          <GameGrid items={gameItems} />
        </div>
        <HeroSVGCircle trigger=".game-section-wrapper" color="#3C1A52" />
      </GeneralAnimation>
    </section>
  );
};

export default TheGameSection;
