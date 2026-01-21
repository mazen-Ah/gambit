"use client";

import React, { useMemo } from "react";
import SectionHeader from "../../common/SectionHeader";
import { PhilosophyIcon } from "../../Icons";
import GeneralSwiper from "../../common/generalSwiperContainer/GeneralSwiper";
import { SwiperSlide } from "swiper/react";
import AwardDisplayCard from "../awards/AwardDisplayCard";
import GeneralAnimation from "../../common/Animation/GeneralAnimation";
import { useRef } from "react";
import Image from "next/image";

const IndividualAwards = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;
  
  // Helper function to get text from multilingual object
  const getText = (content: any) => {
    if (typeof content === 'string') return content;
    return content?.en || content?.ar || '';
  };

  // Extract section title, subtitle, and icon
  const sectionTitle = getText(data?.content?.title) || 'individual awards';
  const sectionSubtitle = getText(data?.content?.subtitle) || 'Awards & Honors within Team';
  const sectionIconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url || data?.icon;

  // Extract award cards from sub_sections
  const awardWinners = useMemo(() => {
    const awardCards = (data?.sub_sections || [])
      .filter((card: any) => card.type === 'award-card-short' && !card.disabled)
      .map((card: any) => ({
        id: card.id?.toString() || card.name || `award-${card.order}`,
        name: getText(card.content?.title) || '',
        image: card.media?.find((m: any) => 
          m.collection_name === 'image_desktop' || m.collection_name === 'image'
        )?.url || card.image || '/images/aw1.webp',
        award: getText(card.content?.title) || '',
      }));
    
    return awardCards;
  }, [data, getText]);

  const defaultAwardWinners = [
    {
      id: "award-1",
      name: "Award Winner 1",
      image: "/images/aw1.webp",
      award: "Cannes PR Young Lions 2023 - Gold",
    },
    {
      id: "award-2",
      name: "Award Winner 2",
      image: "/images/aw2.webp",
      award: "Cannes PR Young Lions 2023 - Gold Cannes PRasdas",
    },
    {
      id: "award-3",
      name: "Award Winner 3",
      image: "/images/aw3.webp",
      award: "Cannes PR Young Lions 2023 - Gold",
    },
    {
      id: "award-4",
      name: "Award Winner 4",
      image: "/images/aw1.webp",
      award: "Cannes PR Young Lions 2023 - Gold",
    },
  ];

  return (
    <section ref={containerRef} className="space-y space-x bg-white/50">
      <GeneralAnimation containerRef={containerRef} triggerSelector=".individual-awards-grid" type={'_eleX'}>
        <SectionHeader
          icon={sectionIconUrl ? (
            <Image 
              src={sectionIconUrl} 
              alt="Section Icon"
              width={24}
              height={24}
              className="object-contain"
            />
          ) : (
            <PhilosophyIcon />
          )}
          showLinkButton={false}
          text={sectionTitle}
          title={sectionSubtitle}
          className="mb-12"
          titleClassName="w-[53.9375rem]!"
        />

        <GeneralSwiper
          swiperKey="individual-awards-swiper"
          baseSlidesPerView={1.2}
          baseSpaceBetween={20}
          breakPointsObject={{
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          enableFreeMode={true}
          noMouseWheel={true}
          customClass="individual-awards-grid py-2! overflow-visible!"
        >
          {(awardWinners.length > 0 ? awardWinners : defaultAwardWinners).map((winner: any, i: number) => (
            <SwiperSlide
              key={`award-${winner.id}-${i}`}
              className="will-change-opacity _eleX"
            >
              <AwardDisplayCard
                title={winner.award}
                image={winner.image}
                className=""
              />
            </SwiperSlide>
          ))}
        </GeneralSwiper>
      </GeneralAnimation>
    </section>
  );
};

export default IndividualAwards;
