"use client";
import React, { useContext, useRef } from "react";
import GeneralSwiper from "../../common/generalSwiperContainer/GeneralSwiper";
import TeamMemberCard from "../homePage/teamSection/TeamMemberCard";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

import {
  isMobileContext,
  IsMobileContextType,
} from "@/src/contexts/isMobileContext";
import SectionHeader from "../../common/SectionHeader";
import { ThePlayersIcon } from "../../Icons";
import GeneralAnimation from "../../common/Animation/GeneralAnimation";

const ThePlayersFwd = (props: any) => {
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  
  const text = getText(data?.content?.title); // Swapped: title -> text
  const title = getText(data?.content?.subtitle); // Swapped: subtitle -> title
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;
  
  // Extract player cards from sub_sections
  const playerCards = data?.sub_sections?.filter((s: any) => s.type === 'player-card') || [];
  const members = playerCards.map((card: any) => {
    const linkedinButton = card.content?.buttons?.find((b: any) => 
      b.type === 'url' && (b.label?.en?.toLowerCase().includes('linkedin') || b.url?.includes('linkedin'))
    );
    
    return {
      id: card.id?.toString() || card.name || `player-${card.order}`,
      name: getText(card.content?.title),
      position: getText(card.content?.subtitle),
      bio: getText(card.content?.description),
      image: card.media?.find((m: any) => 
        m.collection_name === 'image_desktop' || m.collection_name === 'image'
      )?.url ,
      team: "fwd",
      social: {
        twitter: card.content?.buttons?.find((b: any) => 
          b.type === 'url' && (b.label?.en?.toLowerCase().includes('twitter') || b.url?.includes('twitter'))
        )?.url || "#",
        linkedin: linkedinButton?.url || "#",
      },
    };
  });
  
  const { isMobile } = useContext(isMobileContext);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="space-x space-y bg-[#E3E7EE]">
      <GeneralAnimation containerRef={containerRef} triggerSelector=".players_grid" type={isMobile ? '_eleX' : '_eleY'}>
        <SectionHeader
          icon={iconUrl ? (
            <Image src={iconUrl} alt="Icon" width={24} height={24} className="text-primary!" />
          ) : (
            <ThePlayersIcon className="text-primary!" />
          )}
          text={text || "The Players"}
          title={title || "Humanize the division. Show who's building the future"}
          showLinkButton={false}
          className="mb-12"
          BadgeClassName="bg-primary/10 border-primary/30!"
          textClassName="text-primary!"
          titleClassName="text-primary!"
        />
        {members.length > 0 && (
          isMobile ? (
            <GeneralSwiper
              swiperKey="team-swiper-unique"
              baseSlidesPerView={1.2}
              baseSpaceBetween={10}
              breakPointsObject={{
                480: {
                  slidesPerView: 1.2,
                  spaceBetween: 15,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 15,
                },
                1280: {
                  slidesPerView: 3.9,
                  spaceBetween: 20,
                },
              }}
              enableFreeMode={true}
              noMouseWheel={true}
              customClass="team_grid py-2! mt-15! max-lg:mt-12! overflow-visible! players_grid"
            >

              {members.map((member: any, i: number) => (
                <SwiperSlide
                  key={`team-slide-${member.id}-unique` + i}
                  className=""
                >
                  <TeamMemberCard key={member.id} member={member} />
                </SwiperSlide>
              ))}
            </GeneralSwiper>
          ) : (
            <div className="players_grid grid grid-cols-4 gap-4">
              {members.map((member: any, i: number) => (
                <div key={member.id + i} className="_eleY">
                  <TeamMemberCard member={member} />
                </div>
              ))}
            </div>
          )
        )}
      </GeneralAnimation>
    </section>
  );
};

export default ThePlayersFwd;
