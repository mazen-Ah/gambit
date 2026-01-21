"use client";

import SectionHeader from "@/src/components/common/SectionHeader";
import FlickityCarousel, {
  FlickityCarouselRef,
} from "@/src/components/common/generalFlickityContainer/FlickityCarousel";
import AwardCard from "@/src/components/pages/homePage/awardSection/AwardCard";
import QuoteCard from "@/src/components/pages/homePage/awardSection/QuoteCard";
import {
  AwardBadgeIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@/src/components/Icons";
import Shapes from "@/src/components/common/Animation/Shapes";
import { useContext, useRef } from "react";
import { isMobileContext } from "@/src/contexts/isMobileContext";
import GeneralAnimation from "@/src/components/common/Animation/GeneralAnimation";
import Image from "next/image";

const AwardsSectionFwd = (props: any) => {
  const flickityRef = useRef<FlickityCarouselRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;

  const getText = (content: any) => content?.en || content?.ar || '';
  
  const text = getText(data?.content?.title); // Swapped: title -> text
  const title = getText(data?.content?.subtitle); // Swapped: subtitle -> title
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;
  
  // Extract award cards from sub_sections
  const awardCards = data?.sub_sections?.filter((s: any) => s.type === 'award-card') || [];
  const awards = awardCards.map((card: any) => {
    const imageUrl = card.media?.find((m: any) => 
      m.collection_name === 'image_desktop' || m.collection_name === 'image'
    )?.url || "/images/aw1.webp";
    
    // Determine type based on content length or default to "wide"
    const category = getText(card.content?.title);
    const awardTitle = getText(card.content?.subtitle);
    
    return {
      type: awardTitle && awardTitle.length < 50 ? "slim" : "wide",
      category: category || undefined,
      title: awardTitle,
      image: imageUrl,
    };
  });

  const handleNext = () => {
    flickityRef.current?.next();
  };

  const handlePrev = () => {
    flickityRef.current?.previous();
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full space-y space-bottom-  overflow-x-hidden lg:overflow-visible bg-[#E3E7EE] "
    >
      <GeneralAnimation
        containerRef={containerRef}
        triggerSelector=".flickity-carousel"
        type="_eleX"
      >
        <div className="mx-auto relative z-10">
          <div className="mb-16 flex max-lg:flex-col lg:items-center space-x md:flex-row md:items-end md:justify-between gap-8">
            <SectionHeader
              icon={iconUrl ? (
                <Image src={iconUrl} alt="Icon" width={24} height={24} className="text-primary!" />
              ) : (
                <AwardBadgeIcon className="text-primary!" />
              )}
              text={text || "Awards & Recognition"}
              title={title || "Shaping the Standard of Success"}
              showLinkButton={false}
              BadgeClassName="bg-primary/10 border-primary/30!"
              textClassName="text-primary!"
              titleClassName="text-primary!"
              className="mb-0! max-lg:w-full!"
            />

            <div
              className={`flex gap-3 mt-auto ${
                true ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={handlePrev}
                className={`flex cursor-pointer items-center justify-center w-14 h-14 rounded-full border border-primary hover:bg-primarytransition-colors`}
                aria-label="Previous"
              >
                <ArrowLeftIcon className="text-primary!" />
              </button>
              <button
                onClick={handleNext}
                className={`flex cursor-pointer items-center justify-center w-14 h-14 rounded-full border border-primary hover:bg-primarytransition-colors`}
                aria-label="Next"
              >
                <ArrowRightIcon className="text-primary!" />
              </button>
            </div>
          </div>

          <FlickityCarousel
            ref={flickityRef}
            className="flickity-carousel relative"
            resizeOnMount={true}
            onScroll={(flkty) => {
              if (!flkty) return;
              const emToPx = parseFloat(
                getComputedStyle(document.body).fontSize
              );
              const maxShift = -5 * emToPx;

              const maxScroll =
                flkty.slides.length > 0
                  ? flkty.slides[flkty.slides.length - 1].target -
                    flkty.slides[0].target
                  : 1;

              flkty.slides.forEach(function (slide: any, i: number) {
                const img =
                  flkty.cells[i].element.querySelector(".parallex-image");
                if (!img) return;

                const progress = (slide.target + flkty.x) / maxScroll;
                const x = progress * maxShift;

                img.style.transform = `translateX(${x / emToPx}em)`;
              });
            }}
          >
            {awards?.map((award: any, index: number) => (
              <div key={`award-slide-${index}`} className="relative z-1">
                <AwardCard
                  svgColor="#e3e7ef"
                  type={award.type}
                  category={award.category}
                  title={award.title}
                  image={award.image}
                />
              </div>
            ))}
          </FlickityCarousel>
        </div>
      </GeneralAnimation>
    </section>
  );
};

export default AwardsSectionFwd;
