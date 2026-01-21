"use client";

import SectionHeader from "../../../common/SectionHeader";
import FlickityCarousel, {
  FlickityCarouselRef,
} from "../../../common/generalFlickityContainer/FlickityCarousel";
import AwardCard from "./AwardCard";
import QuoteCard from "./QuoteCard";
import { AwardBadgeIcon, ArrowLeftIcon, ArrowRightIcon } from "../../../Icons";
import Shapes from "@/src/components/common/Animation/Shapes";
import { useRef } from "react";
import GeneralAnimation from "@/src/components/common/Animation/GeneralAnimation";

const AwardsSection = (props: any) => {
  const flickityRef = useRef<FlickityCarouselRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;

  const getText = (content: any) => content?.en || content?.ar || '';

  // Extract header data
  const headerText = getText(data?.content?.subtitle); // "Awards & Recognition"
  const headerTitle = getText(data?.content?.title); // "Shaping the Standard of Success"

  // Extract awards from sub_sections
  const awardCards = data?.sub_sections?.filter((s: any) => 
    s.type === 'award-card' || s.type === 'award-card-short' || s.type === 'quote-card'
  ) || [];

  const awards = awardCards.map((card: any) => {
    const type = card.type === 'quote-card' ? 'quote' : 
                 card.type === 'award-card-short' ? 'slim' : 'wide';
    
    if (type === 'quote') {
      return {
        type: 'quote',
        quote: getText(card.content?.description),
        author: getText(card.content?.title),
        role: getText(card.content?.subtitle),
        avatar: card.media?.find((m: any) => 
          m.collection_name === 'image_desktop' || m.collection_name === 'image'
        )?.url || '',
      };
    }

    return {
      type,
      category: getText(card.content?.subtitle) || '',
      title: getText(card.content?.title),
      image: card.media?.find((m: any) => 
        m.collection_name === 'image_desktop' || m.collection_name === 'image'
      )?.url || card.image || '',
      icon: card.media?.find((m: any) => 
        m.collection_name === 'icon'
      )?.url || '',
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
      className={`relative w-full space-y bg-secondary bg-s overflow-x-hidden lg:overflow-visible ${
        data?.className || ""
      }`}
    >
      <Shapes className="animated_svg shape_b" dataSpeed="1.2">
        <svg
          width="509"
          height="502"
          viewBox="0 0 509 502"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M165.621 127.992L276.447 121.98L352.516 214.942L211.643 330.215L141.572 244.583C141.572 244.583 77.6084 256.134 27.7085 186.845C-22.1927 117.555 6.08167 44.1151 51.4607 1.54459L75.4484 30.8593L194.119 3.09016L225.436 41.3619L188.792 71.347C188.792 71.347 193.607 105.475 160.22 132.795C126.833 160.115 101.81 141.164 101.81 141.164M421.163 254.797L236.889 405.584L189.826 348.069L374.099 197.281L421.163 254.797ZM507.319 309.061L273.029 500.776L211.881 426.048L446.171 234.333L507.319 309.061Z"
            stroke="#3C1A52"
            strokeOpacity="0.12"
            strokeMiterlimit="10"
          />
        </svg>
      </Shapes>
      <GeneralAnimation
        containerRef={containerRef}
        triggerSelector=".flickity-carousel"
        type="_eleX"
      >
        <div className="mx-auto relative z-10">
          <div className="mb-16 flex max-lg:flex-col lg:items-center space-x md:flex-row md:items-end md:justify-between gap-8">
            <SectionHeader
              icon={<AwardBadgeIcon />}
              title={headerText}
              text={headerTitle}
              showLinkButton={false}
              BadgeClassName="border-[#3C1A52]/15 text-[#3C1A52] bg-secondary"
              titleClassName="text-[#3C1A52]"
              className="mb-0! max-lg:w-full!"
            />

            <div
              className={`flex gap-3 mt-auto ${
                true ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={handlePrev}
                className={`flex cursor-pointer items-center justify-center w-14 h-14 rounded-full border border-text-primary-100/30 hover:bg-text-primary-100/5 transition-colors`}
                aria-label="Previous"
              >
                <ArrowLeftIcon />
              </button>
              <button
                onClick={handleNext}
                className={`flex cursor-pointer items-center justify-center w-14 h-14 rounded-full border border-text-primary-100/30 hover:bg-text-primary-100/5 transition-colors`}
                aria-label="Next"
              >
                <ArrowRightIcon />
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
                {award.type === "quote" ? (
                  <QuoteCard
                    quote={award.quote}
                    author={award.author}
                    role={award.role}
                    avatar={award.avatar}
                  />
                ) : (
                  <AwardCard
                    svgColor="var(--secondary)"
                    type={award.type}
                    category={award.category}
                    title={award.title}
                    image={award.image}
                    icon={award.icon}
                  />
                )}
              </div>
            ))}
          </FlickityCarousel>
        </div>
      </GeneralAnimation>
    </section>
  );
};

export default AwardsSection;
