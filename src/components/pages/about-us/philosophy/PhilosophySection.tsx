"use client";

import { useRef } from "react";
import SectionHeader from "@/src/components/common/SectionHeader";
import { PhilosophyIcon } from "@/src/components/Icons";
import CardCulture from "./CardCulture";
import CardInnovation from "./CardInnovation";
import CardIntegrity from "./CardIntegrity";
import GeneralAnimation from "@/src/components/common/Animation/GeneralAnimation";
import Image from "next/image";

const PhilosophySection = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  
  const text = getText(data?.content?.title); // Swapped: title -> text
  const title = getText(data?.content?.subtitle); // Swapped: subtitle -> title
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;
  
  // Extract philosophy cards from sub_sections
  const philosophyCards = data?.sub_sections?.filter((s: any) => s.type === 'title-subtitle') || [];
  
  // Map cards to components based on name or order
  const cardComponents = philosophyCards.map((card: any, index: number) => {
    const cardName = card.name?.toLowerCase() || '';
    const cardTitle = getText(card.content?.subtitle); // Swapped: subtitle -> title
    const cardSubtitle = getText(card.content?.title); // Swapped: title -> subtitle
    
    // Determine which card component to use based on name or fallback to order
    if (cardName.includes('culture') || index === 0) {
      return <CardCulture key={card.id || index} title={cardTitle} subtitle={cardSubtitle} />;
    } else if (cardName.includes('integrity') || index === 1) {
      return <CardIntegrity key={card.id || index} title={cardTitle} subtitle={cardSubtitle} />;
    } else if (cardName.includes('innovation') || index === 2) {
      return <CardInnovation key={card.id || index} title={cardTitle} subtitle={cardSubtitle} />;
    }
    return null;
  }).filter(Boolean);

  return (
    <div ref={containerRef} className="space-x space-y bg-secondary">
      <GeneralAnimation containerRef={containerRef} triggerSelector=".philosophy_container" type='_eleX'>
        <SectionHeader
          icon={iconUrl ? (
            <Image src={iconUrl} alt="Icon" width={24} height={24} />
          ) : (
            <PhilosophyIcon />
          )}
          showLinkButton={false}
          text={text || "Philosophy"}
          title={title || "We redefined what a communications agency can be."}
          className=""
          titleClassName="lg:w-[47.5rem]!"
        />
        <div className="philosophy_container grid grid-cols-3 gap-9.25 max-lg:grid-cols-1">
          {cardComponents.length > 0 ? cardComponents : (
            <>
          <CardCulture />
          <CardIntegrity />
          <CardInnovation />
            </>
          )}
        </div>
      </GeneralAnimation>
    </div>
  );
};

export default PhilosophySection;
