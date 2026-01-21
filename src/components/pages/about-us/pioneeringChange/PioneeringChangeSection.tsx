"use client";
import SectionHeader from "@/src/components/common/SectionHeader";
import { AwardBadgeIcon, PhilosophyIcon } from "@/src/components/Icons";
import GeneralSwiper from "@/src/components/common/generalSwiperContainer/GeneralSwiper";
import { SwiperSlide } from "swiper/react";
import AchievementCard from "./AchievementCard";
import GeneralAnimation from "@/src/components/common/Animation/GeneralAnimation";
import { useRef } from "react";
import Image from "next/image";

const PioneeringChangeSection = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  
  const text = getText(data?.content?.title); // Swapped: title -> text
  const title = getText(data?.content?.subtitle); // Swapped: subtitle -> title
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;
  
  // Extract achievement cards from sub_sections
  const achievementCards = data?.sub_sections?.filter((s: any) => s.type === 'pioneering-card-1') || [];
  const achievements = achievementCards.map((card: any) => ({
    id: card.id || card.name,
    image: card.media?.find((m: any) => 
      m.collection_name === 'image_desktop' || m.collection_name === 'image'
    )?.url || '',
    description: getText(card.content?.description),
  }));

  return (
    <section ref={containerRef} className="space-x space-y small bg-secondary">
      <GeneralAnimation containerRef={containerRef} triggerSelector=".pioneering_change_grid" type='_eleX'>
        <SectionHeader
          icon={iconUrl ? (
            <Image src={iconUrl} alt="Icon" width={24} height={24} />
          ) : (
            <AwardBadgeIcon />
          )}
          showLinkButton={false}
          text={text || "PIONEERING CHANGE"}
          title={title || "Always the first to make the move"}
          className=""
          titleClassName="lg:w-[47.5rem]!"
        />
        <GeneralSwiper
          swiperKey="pioneering-change-swiper"
          baseSlidesPerView={1.2}
          baseSpaceBetween={24}
          breakPointsObject={{
            480: {
              slidesPerView: 1.2,
              spaceBetween: 24,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          enableFreeMode={true}
          noMouseWheel={true}
          customClass="pioneering_change_grid py-2! mt-15! max-lg:mt-12! overflow-visible!"
        >
          {achievements.map((achievement: any) => (
            <SwiperSlide
              key={`achievement-${achievement.id}`}
              className="will-change-opacity _eleX"
            >
              <AchievementCard
                image={achievement.image}
                description={achievement.description}
              />
            </SwiperSlide>
          ))}
        </GeneralSwiper>
      </GeneralAnimation>
    </section>
  );
};

export default PioneeringChangeSection;
