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
import { useRef } from "react";
import GeneralAnimation from "@/src/components/common/Animation/GeneralAnimation";
import { Division } from "@/src/app/data/divisions";

// Sample awards data - would be filtered by division in a real app
const sampleAwards: any[] = [
  {
    type: "wide",
    category: "Campaign Middle East",
    title:
      "'PR Agency of the Year' 2024 and 'Independent Agency of the Year' 2024",
    image: "/images/aw1.webp",
  },
  {
    type: "quote",
    quote:
      "Organisations from across the Middle East, including agencies, corporations, government entities, and non-profits are invited to submit their most impactful work. This year's awards spotlight innovation, purpose-driven communications, and regional excellence, reflecting the rapidly evolving nature of the industry.",
    author: "Jamal Al Mawed",
    role: "Founder & Managing Director",
    avatar: "/images/avatar.webp",
  },
  {
    type: "slim",
    title: "Cannes PR Young Lions 2023 - Gold",
    image: "/images/aw2.webp",
  },
  {
    type: "wide",
    category: "MEPRA Medium",
    title: "Agency of the Year 2024",
    image: "/images/aw3.webp",
  },
];

interface DivisionAwardsProps {
  division: Division;
}

const DivisionAwards = ({ division }: DivisionAwardsProps) => {
  const flickityRef = useRef<FlickityCarouselRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
              icon={<AwardBadgeIcon className="text-primary!" />}
              text="Awards & Recognition"
              title="Shaping the Standard of Success"
              showLinkButton={false}
              BadgeClassName="bg-primary/10 border-primary/30!"
              textClassName="text-primary!"
              titleClassName="text-primary!"
              className="mb-0! max-lg:w-full!"
            />

            <div className={`flex gap-3 mt-auto opacity-100`}>
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
            {sampleAwards.map((award, index) => (
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
                    svgColor="#e3e7ef"
                    type={award.type}
                    category={award.category}
                    title={award.title}
                    image={award.image}
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

export default DivisionAwards;
