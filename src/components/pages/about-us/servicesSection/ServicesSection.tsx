"use client";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import SectionHeader from "@/src/components/common/SectionHeader";
import Tabs from "@/src/components/common/Tabs";
import { CrownIcon } from "@/src/components/Icons";
import GeneralSwiper from "@/src/components/common/generalSwiperContainer/GeneralSwiper";
import { SwiperSlide } from "swiper/react";
import GeneralAnimation from "@/src/components/common/Animation/GeneralAnimation";
import ServiceCard from "./ServiceCard";
import gsap from "gsap";
import Image from "next/image";

interface Service {
  id: string;
  title: string;
  category: string;
  icon: string;
}

const ServicesSection = (props: any) => {
  const [isEnteredTheView, setIsEnteredTheView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  
  const text = getText(data?.content?.title); // Swapped: title -> text
  const title = getText(data?.content?.subtitle); // Swapped: subtitle -> title
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;
  
  // Extract service cards from sub_sections
  const serviceCards = data?.sub_sections?.filter((s: any) => s.type === 'service-card') || [];
  const allServices: Service[] = serviceCards.map((card: any) => ({
    id: card.id?.toString() || card.name || `service-${card.order}`,
    title: getText(card.content?.subtitle), // Swapped: subtitle -> title
    category: getText(card.content?.title), // Swapped: title -> category
    icon: card.media?.find((m: any) => m.collection_name === 'icon')?.url || "/images/ChessKnightIcon.svg",
  }));

  // Extract tabs from sub_sections
  const tabsData = data?.sub_sections?.filter((s: any) => s.type === 'tabs') || [];
  const serviceTabs = tabsData.map((tab: any) => ({
    id: getText(tab.content?.title) || tab.id?.toString() || 'all',
    label: getText(tab.content?.subtitle) || 'All Services',
    color: getText(tab.content?.description) || "#CF0F69",
  }));

  // Set initial active tab from first tab or default to "all"
  const [activeTab, setActiveTab] = useState(serviceTabs.length > 0 ? serviceTabs[0].id : "all");

  const filteredServices = useMemo(() => {
    if (activeTab === "all") {
      return allServices;
    }
    // Match by category name (normalized) or by exact category match
    return allServices.filter((service) => {
      const normalizedCategory = service.category.toLowerCase().replace(/\s+/g, "-");
      const normalizedActiveTab = activeTab.toLowerCase();
      return normalizedCategory === normalizedActiveTab || service.category.toLowerCase() === normalizedActiveTab;
    });
  }, [activeTab, allServices]);

  const handleTabChange = useCallback(
    (tab: { id: string; label: string; color: string }) => {
      if(tab.id !== activeTab) {
        gsap.to(".services_grid ._eleX", {
          duration: 1,
          stagger: 0.1,
          ease: "power3.in",
          x: -40,
          opacity: 0,
          onComplete: () => {
            setActiveTab(tab.id);
          },
        });
      }
    },
    [activeTab ]
  );

  useEffect(() => {
    gsap.set(".services_grid ._eleX", { x: 40, opacity: 0 });

    if(isEnteredTheView) {
      gsap.to(".services_grid ._eleX", {
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        x: 0,
        opacity: 1,
      });
    };
  }, [activeTab, isEnteredTheView]);

  return (
    <section
      ref={containerRef}
      className="services_section relative bg-secondary space-y space-x flex flex-col "
    >
    <GeneralAnimation
      containerRef={containerRef}
      triggerSelector=".services_grid"
      onEnter={() => setIsEnteredTheView(true)}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-6 lg:gap-0 ">
        <SectionHeader
          text={text || "SERVICES"}
          icon={iconUrl ? (
            <Image src={iconUrl} alt="Icon" width={24} height={24} />
          ) : (
            <CrownIcon />
          )}
          showLinkButton={false}
          title={title || "Communications is our game. Strategy is our move."}
          className="mb-0! lg:w-fit!"
          titleClassName="text-text-primary-100 max-w-[47.5rem]"
        />

        <div className="lg:shrink-0 max-lg:w-full">
          {serviceTabs.length > 0 && (
            <Tabs
              tabs={serviceTabs}
              defaultTab={serviceTabs[0]?.id || "all"}
              onTabChange={handleTabChange}
              className="sm:mt-auto"
            />
          )}
        </div>
      </div>
      <GeneralSwiper
        swiperKey="services-swiper-unique"
        baseSlidesPerView={1.2}
        baseSpaceBetween={20}
        breakPointsObject={{
          480: {
            slidesPerView: 1.2,
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
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        enableFreeMode={true}
        noMouseWheel={true}
        customClass="services_grid py-2! mt-15! max-lg:mt-12! overflow-visible!"
      >
        {filteredServices.map((service, i) => (
          <SwiperSlide
            key={`service-slide-${service.id}-${i}`}
            className="will-change-opacity _eleX"
          >
            <ServiceCard
              icon={service.icon}
              category={service.category}
              title={service.title}
            />
          </SwiperSlide>
        ))}
      </GeneralSwiper>
    </GeneralAnimation>
    </section>
  );
};

export default ServicesSection;
