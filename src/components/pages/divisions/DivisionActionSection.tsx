"use client";

import Image from "next/image";
import SectionHeader from "@/src/components/common/SectionHeader";
import { CrownIcon } from "@/src/components/Icons";
import { useRef } from "react";
import GeneralAnimation from "../../common/Animation/GeneralAnimation";
import { Division } from "@/src/app/data/divisions";

interface DivisionActionSectionProps {
  division: Division;
}

const DivisionActionSection = ({ division }: DivisionActionSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!division.actionImage) return null;

  return (
    <section
      ref={containerRef}
      className="space-x  space-y"
      style={{ background: "linear-gradient(to bottom, white, #E3E7EE)" }}
    >
      <GeneralAnimation containerRef={containerRef} type="_eleY">
        <SectionHeader
          icon={<CrownIcon className="text-primary!" />}
          text={`${
            division.name.split(".")[1] || "Division"
          } IN ACTION`.toUpperCase()}
          title={division.actionTitle || "We move with the future."}
          showLinkButton={false}
          className="mb-12"
          BadgeClassName="bg-primary/10 border-primary/30!"
          textClassName="text-primary!"
          titleClassName="text-primary!"
        />

        <div className="relative w-full rounded-2xl overflow-hidden _eleY">
          <div className="relative w-full h-244.5 max-lg:h-180 ">
            <Image
              src={division.actionImage}
              alt={`${division.name} Action`}
              fill
              className="object-cover"
              priority
            />
            {/* Blue Overlay - using mix-blend-multiply with primary color */}
            <div className="absolute inset-0 bg-primary z-1 mix-blend-multiply"></div>
          </div>

          {/* Text Overlay - Bottom Left */}
          <div className="absolute bottom-0 left-0 p-8 max-sm:p-6 z-10 max-w-[50%] max-lg:max-w-[60%] max-sm:max-w-[80%]">
            <h2 className="text-white! mb-[0.94rem]!">
              {division.heroSubtitle?.split(" ")[0] || "Division"}
            </h2>
            {/* Using hero paragraph or action description if available */}
            <p className="text-white/80 text-[1.3125rem]! leading-[150%] max-w-162.75 font-normal! tracking-[-0.01563rem]!">
              {division.actionDescription || division.description}
            </p>
          </div>
        </div>
      </GeneralAnimation>
    </section>
  );
};

export default DivisionActionSection;
