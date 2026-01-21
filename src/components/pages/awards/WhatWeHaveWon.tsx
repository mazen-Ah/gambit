"use client";

import React, { useContext, useMemo, useRef, useState } from "react";
import { AwardBadgeIcon } from "../../Icons";
import SectionHeader from "../../common/SectionHeader";
import AwardDisplayCard from "./AwardDisplayCard";
import QuoteCard from "../homePage/awardSection/QuoteCard";
import GeneralAnimation from "../../common/Animation/GeneralAnimation";
import { isMobileContext } from "@/src/contexts/isMobileContext";
import Select from "../../common/form/Select";
import Image from "next/image";

const AWARDS_DATA = [
  {
    id: 1,
    row: 1,
    kind: "award",
    category: "Campaign Middle East 2024",
    title:
      "'PR Agency of the Year' 2024 and 'Independent Agency of the Year' 2024",
    image: "/images/aw1.webp",
    svgColor: "#f7f2f7",
    gridClass: "lg:col-span-6 max-lg:col-span-12",
    year: "2024",
  },
  {
    id: 2,
    row: 1,
    kind: "quote",
    quote:
      "Organisations from across the Middle East, including agencies, corporations, government entities, and non-profits are invited to submit their most impactful work. This year's awards spotlight innovation, purpose-driven communications, and regional excellence, reflecting the rapidly evolving nature of the industry.",
    author: "Jamal Al Mawed",
    role: "Founder & Managing Director",
    avatar: "/images/avatar.webp",
    gridClass: "lg:col-span-3 max-sm:col-span-12 max-lg:col-span-6",
    year: "All",
  },
  {
    id: 3,
    row: 1,
    kind: "award",
    title: "Cannes PR Young Lions 2023 - Gold",
    image: "/images/aw2.webp",
    className: "w-full!",
    svgColor: "#f7f2f7",
    gridClass: "lg:col-span-3 max-sm:col-span-12 max-lg:col-span-6",
    year: "2023",
  },
  {
    id: 4,
    row: 2,
    kind: "award",
    title: "Cannes PR Young Lions 2023 - Gold",
    image: "/images/aw2.webp",
    svgColor: "#f7f2f7",
    gridClass: "col-span-2 max-lg:col-span-6 max-sm:col-span-12",
    year: "2023",
  },
  {
    id: 5,
    row: 2,
    kind: "award",
    title: "Cannes PR Young Lions 2023 - Gold",
    image: "/images/aw2.webp",
    svgColor: "#f7f2f7",
    gridClass: "col-span-2 max-lg:col-span-6 max-sm:col-span-12",
    year: "2023",
  },
  {
    id: 6,
    row: 2,
    kind: "award",
    category: "MEPRA Medium 2024",
    title: "Agency of the Year 2024",
    image: "/images/aw3.webp",
    svgColor: "#f7f2f7",
    gridClass: "col-span-3 max-lg:col-span-12",
    year: "2024",
  },
];

const WhatWeHaveWon = (props: any) => {
  const { isMobile } = useContext(isMobileContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState("All");
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  
  const text = getText(data?.content?.title); // Swapped: title -> text
  const title = getText(data?.content?.subtitle); // Swapped: subtitle -> title
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;
  
  // Extract awards from sub_sections
  const awardCards = data?.sub_sections?.filter((s: any) => 
    s.type === 'award-card' || s.type === 'award-card-short' || s.type === 'quote-card'
  ) || [];
  
  // Map awards to the format expected by the component
  const awardsData = useMemo(() => {
    const getText = (content: any) => content?.en || content?.ar || '';
    return awardCards.map((card: any, index: number) => {
      const imageUrl = card.media?.find((m: any) => 
        m.collection_name === 'image_desktop' || m.collection_name === 'image'
      )?.url || "/images/aw1.webp";
      const iconUrl = card.media?.find((m: any) => m.collection_name === 'icon')?.url;
      
      // Calculate position in 6-3-3 pattern (every 3 items = one row)
      const positionInRow = index % 3;
      
      if (card.type === 'quote-card') {
        // Quote cards take 3 columns (second or third position in row)
        return {
          id: card.id || index,
          row: Math.floor(index / 3) + 1,
          kind: "quote",
          quote: getText(card.content?.description),
          author: getText(card.content?.title),
          role: getText(card.content?.subtitle),
          avatar: card.media?.find((m: any) => 
            m.collection_name === 'image_desktop' || m.collection_name === 'image'
          )?.url || "/images/avatar.webp",
          gridClass: "lg:col-span-3 max-sm:col-span-12 max-lg:col-span-6",
          year: "All",
        };
      } else if (card.type === 'award-card-short') {
        // Short award cards take 3 columns (second or third position in row)
        return {
          id: card.id || index,
          row: Math.floor(index / 3) + 1,
          kind: "award",
          title: getText(card.content?.title),
          image: imageUrl,
          className: "w-full!",
          svgColor: "#f7f2f7",
          gridClass: "lg:col-span-3 max-sm:col-span-12 max-lg:col-span-6",
          year: "All",
          icon: iconUrl,
        };
      } else {
        // Large award cards: first position = 6 cols, others = 3 cols
        return {
          id: card.id || index,
          row: Math.floor(index / 3) + 1,
          kind: "award",
          category: getText(card.content?.title),
          title: getText(card.content?.subtitle),
          image: imageUrl,
          svgColor: "#f7f2f7",
          gridClass: positionInRow === 0 
            ? "lg:col-span-6 max-lg:col-span-12" 
            : "lg:col-span-3 max-lg:col-span-12",
          year: "All",
          icon: iconUrl,
        };
      }
    });
  }, [awardCards]);

  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(awardsData.map((item: any) => item.year).filter((y: any) => y !== "All"))
    ) as string[];
    return ["All", ...uniqueYears.sort((a: string, b: string) => b.localeCompare(a))];
  }, [awardsData]);

  const filteredItems = useMemo(() => {
    if (selectedYear === "All") return awardsData;
    return awardsData.filter(
      (item: any) => item.year === selectedYear || item.year === "All"
    );
  }, [selectedYear, awardsData]);

  return (
    <section className="space-x space-y  bg-white/50!">
      <GeneralAnimation
        containerRef={containerRef}
        triggerSelector=".we_have_won_section"
        type={isMobile ? "_eleX" : "_eleY"}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeader
            icon={iconUrl ? (
              <Image src={iconUrl} alt="Icon" width={24} height={24} />
            ) : (
              <AwardBadgeIcon />
            )}
            showLinkButton={false}
            text={text || "What We've Won"}
            title={title || "96 trophies. 258 nominations. 8x Agency of the Year. Multiple regional firsts"}
            className="mb-0!"
            titleClassName="w-[54.9375rem]! max-sm:w-full!"
          />

          <div className="min-w-[15rem]">
            <Select
              value={selectedYear}
              onChange={setSelectedYear}
              placeholder="Filter by year"
              options={years.map((y: string) => ({ value: y, label: y }))}
              colorDropdown="!bg-[#F6F1F6] !opacity-100"
            />
          </div>
        </div>

        <div ref={containerRef} className="we_have_won_section grid grid-cols-12 gap-6">
          {filteredItems.map((item: any) => (
            <div key={item.id} className={`${item.gridClass} _eleX _eleY`}>
              {item.kind === "award" ? (
                <AwardDisplayCard
                  category={item.category}
                  title={item.title!}
                  image={item.image!}
                  className={item.className}
                  svgColor={item.svgColor}
                  icon={item.icon}
                />
              ) : (
                <QuoteCard
                  quote={item.quote!}
                  author={item.author!}
                  role={item.role!}
                  avatar={item.avatar!}
                  className="w-auto!"
                />
              )}
            </div>
          ))}
        </div>
      </GeneralAnimation>
    </section>
  );
};

export default WhatWeHaveWon;
