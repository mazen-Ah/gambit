import React from "react";
import StatItem from "./StatItem";
import AwardIcon from "./AwardIcon";
import AnimatedCounter from "./AnimatedCounter";
import Image from "next/image";

const Stats = (props: any) => {
  const data = props.data || props;
  
  const getText = (content: any) => content?.en || content?.ar || '';
  
  // Extract stats from sub_sections
  const statsSection = data?.sub_sections?.find((s: any) => s.type === 'state-awards');
  const otherStats = data?.sub_sections?.filter((s: any) => s.type === 'title-subtitle') || [];
  
  return (
    <section className="bg-primary space-x">
      <div className="flex flex-col">
        {statsSection && (
          <StatItem
            label={getText(statsSection.content?.title) || "Most Awarded in Mena"}
            className="max-sm:flex-col max-sm:gap-[1.88rem] items-start _hide"
          >
            <div className="flex max-lg:grid max-lg:grid-cols-2 items-center gap-6 max-[600px]:grid">
              {statsSection.sub_sections?.map((item: any, index: number) => {
                if (item.type === 'title-image') {
                  const imageUrl = item.media?.find((m: any) => 
                    m.collection_name === 'image_desktop' || m.collection_name === 'image'
                  )?.url;
                  return (
                    <AwardIcon
                      key={index}
                      icon={imageUrl}
                      text={getText(item.content?.title) || ""}
                      alt={getText(item.content?.title) || ""}
                    />
                  );
                } else if (item.type === 'title-subtitle') {
                  return (
                    <div key={index} className="w-49.25 h-49.25 max-lg:w-[14.25rem] max-lg:h-[14.25rem] rounded-full bg-transparent border border-white/20 gap-[0.44rem] flex flex-col items-center justify-center">
                      <span className="text-white text-[1.75rem]! font-medium!">
                        {getText(item.content?.subtitle) || ""}
                      </span>
                      <p className="text-white text-xs! font-normal! text-center">
                        {getText(item.content?.title) || ""}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </StatItem>
        )}

        {/* Other Stats Sections */}
        {otherStats.map((stat: any, index: number) => (
          <StatItem key={index} label={getText(stat.content?.title) || ""}>
            <AnimatedCounter 
              value={getText(stat.content?.subtitle) || ""} 
              className="text-white font-[500]" 
            />
          </StatItem>
        ))}
      </div>
    </section>
  );
};

export default Stats;
