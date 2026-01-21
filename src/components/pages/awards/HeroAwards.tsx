import React from "react";
import StatItem from "./StatItem";
import AwardIcon from "./AwardIcon";

const HeroAwards = (props: any) => {
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  
  const title = getText(data?.content?.subtitle); // Swapped: subtitle -> title
  const subtitle = getText(data?.content?.title); // Swapped: title -> subtitle
  
  // Extract stats from sub_sections
  const statsSection = data?.sub_sections?.find((s: any) => s.type === 'state-awards');
  const statsItems = statsSection?.sub_sections || [];
  
  // Extract other stats (like Nominations)
  const otherStats = data?.sub_sections?.filter((s: any) => s.type === 'title-subtitle') || [];
  
  return (
    <div className="bg-primary w-full">
      <div className="relative pt-24 min-h-[80vh] flex flex-col">
        <div className="ml-(--space-x) text-white max-w-360 h-full my-auto">
          <h4 className="hero__heading mb-8">{subtitle }</h4>
          <h1 className="hero__heading perspective-[1000px] max-w-296.75">
            {title }
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroAwards;
