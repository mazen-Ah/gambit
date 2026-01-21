"use client";

import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import {
  createMarqueeScroller,
  MarqueeInstance,
} from "@/src/app/utils/createMarqueeScroller";
import { isMobileContext } from "@/src/contexts/isMobileContext";

const HeroLogos = ({ className, data, title }: { className?: string; data?: any[]; title?: any }) => {
  const container = useRef<HTMLDivElement>(null);
  const marqueeScroller = useRef<MarqueeInstance>(null);
  const { isMobile } = useContext(isMobileContext);

  // Filter logos based on device type
  const filteredLogos = data?.filter((item: any) => {
    if (item && typeof item === 'object' && item.collection_name) {
      // On mobile, show mobile images; on desktop, show desktop images
      return isMobile 
        ? item.collection_name === 'images_mobile'
        : item.collection_name === 'images_desktop';
    }
    // Fallback: if it's a string URL, include it (for backward compatibility)
    return typeof item === 'string';
  }) || [];

  // Extract URLs from filtered logos
  const logoUrls = filteredLogos.map((item: any) => {
    if (item && typeof item === 'object' && item.url) {
      return item.url;
    }
    return item; // If it's already a string URL
  });

  useEffect(() => {
    if (!container.current || !data || data.length === 0) return;

    // Clean up previous instance if it exists
    if (marqueeScroller.current) {
      marqueeScroller.current.destroy();
      marqueeScroller.current = null;
    }

    marqueeScroller.current = createMarqueeScroller({
      container: container.current,
      itemSelector: ".cur_col",
      direction: "rtl",
      baseDuration: 20,
      wheelControl: true,
    });

    return () => marqueeScroller.current?.destroy();
  }, [logoUrls,data]);

  const handleMouseEnter = () => {
    if (!marqueeScroller.current) return;
    // Pause animation by setting pxPerSec to 0
    marqueeScroller.current.pxPerSec = 0;
  };

  const handleMouseLeave = () => {
    if (!marqueeScroller.current) return;
    // Resume animation by restoring original pxPerSec
    marqueeScroller.current.pxPerSec = 20;
  };
  
  return (
    <div ref={container} className={`overflow-hidden h-fit _hide ${className}`}>
      {title?.en && <div className="text-white/80 text-xs font-semibold uppercase space-x mb-[1.44rem]">{title?.en}</div>}

      <div className="w-full py-16 relative">
        <div className="absolute top-0 left-[5em] right-[5em] border-t border-white/30" />
        <div className="absolute bottom-0 left-[5em] right-[5em] border-t border-white/30" />

        <div className="h-[4em] relative">
          <div className="absolute left-0 w-[10em] h-full z-99 bg-[linear-gradient(90deg,var(--primary),rgba(var(--primary),0))]" />
          <div className="absolute right-0 w-[10em] h-full z-99 bg-[linear-gradient(90deg,rgba(var(--primary),0),var(--primary))]" />
          <div className="relative flex items-center h-full">
            {logoUrls.map((logo, index) => {
              return (
                <div
                  key={`logo-${logo}-${index}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative cur_col w-72.25 h-full opacity-70 hover:opacity-100 transition-opacity duration-300 shrink-0"
                >
                  <div className="absolute inset-0 left-16 right-16">
                    <Image
                      src={logo}
                      alt={`Client logo ${index + 1}`}
                      fill
                      className="object-contain scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLogos;
