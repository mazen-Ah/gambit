'use client';

import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileContext } from '@/src/contexts/isMobileContext';
import SVGComponent from './SVGComponent';
import SectionHeader from '@/src/components/common/SectionHeader';
import { StoryIcon, chess1, chess2, chess3, chess4, chess5 } from '@/src/components/Icons';
import Image from 'next/image';

export default function StorySection(props: any) {
  const data = props.data || props;
  
  // Helper function to get text from multilingual object
  const getText = (content: any) => {
    if (typeof content === 'string') return content;
    return content?.en || content?.ar || '';
  };

  // Extract timeline data from sub_sections
  const timelineData = (data?.sub_sections || [])
    .filter((subSection: any) => subSection.type === 'story-card' && !subSection.disabled)
    .map((card: any) => ({
      year: getText(card.content?.title) || '',
      title: getText(card.content?.subtitle) || '',
      description: getText(card.content?.description) || '',
    }))
    .filter((item: any) => item.year || item.title || item.description); // Only include cards with at least one field

  // Extract section title and icon
  const sectionTitle = getText(data?.content?.title) || 'The Story';
  const sectionIconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url || data?.icon;
  const { isMobile } = useContext(isMobileContext)

  const containerRef = useRef<any>(null); 
  const stageRef = useRef<any>(null);
  const squareRef = useRef<any>(null);
  const pathWrapperRef = useRef<any>(null);
  const entriesRef = useRef<any>(null);
  
  const pathsSVGs = useMemo(() => {
    const icons = [chess1, chess2, chess3, chess4, chess5];
    return Array.from({ length: 12 }, (_, index) => {
      const IconComponent = icons[index % icons.length];
      return <IconComponent key={index} />;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const square = squareRef.current;
    const paths = pathWrapperRef.current?.querySelectorAll("svg path") || [];
    const entries = entriesRef.current?.children || [];

    if (!container || !stage) return;

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "none" },
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      pin: stage,
      pinSpacing: false,
      pinType: !isMobile ? "transform" : "fixed",
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate({ progress }) {
        tl.progress(progress);
      }
    });

    tl.to(square, { rotation: -360, duration: 1 }, 0);

    if (paths.length > 0) {
      tl.to(paths, {
        fill: "#CF0F69",
        duration: 0,
        stagger: {
          each: -1 / Math.max(paths.length, 1), 
          ease: "none", 
          from: "end" 
        }
      }, 0);
    }

    if (entries.length > 0) {
      gsap.set(entries[0], { autoAlpha: 1 });
      const seg = 1 / entries.length;
      
      [...entries]?.forEach((el: HTMLDivElement, i: number) => {
        if (!el) return;
        
        if (i === 0) {
          tl.to(el, { autoAlpha: 0, duration: seg * 0.45 }, seg * 0.55);
        } else if (i === entries.length - 1) {
          tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: seg * 0.45 }, i * seg);
        } else {
          tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: seg * 0.45 }, i * seg);
          tl.to(el, { autoAlpha: 0, duration: seg * 0.45 }, i * seg + seg * 0.55);
        }
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    let resizeTO: any;
    
    window.addEventListener("load", refresh);
    const handleResize = () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(refresh, 120);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", handleResize);
      scrollTrigger.kill();
    };
  }, [isMobile]);

  // Default to empty array if no timeline data
  const displayTimelineData = timelineData.length > 0 ? timelineData : [];

  return (
    <div className="story-section relative w-full overflow-x-hidden bg-linear-to-b from-white to-[#ede3ee]">
      <div 
        ref={containerRef} 
        className="relative pointer-events-none"
        style={{ height: '600vh' }}
      >
        <div 
          ref={stageRef}
          className="relative h-screen px-5 w-full flex items-center justify-center"
        >
        <SectionHeader
          icon={sectionIconUrl ? (
            <Image 
              src={sectionIconUrl} 
              alt="Story Icon"
              width={24}
              height={24}
              className="object-contain"
            />
          ) : (
            <StoryIcon />
          )}
          showLinkButton={false}
          text={sectionTitle}
          title=""
          className="absolute top-0 left-0 space-x space-y pb-0!"
        />
          <div 
            ref={squareRef}
            className="relative w-[90%] min-[600px]:w-[80%] md:w-[75%] lg:w-[38.5vw] flex items-center justify-center pointer-events-none aspect-square will-change-transform rotate-180"
          >
            <div ref={pathWrapperRef} className="size-full">
              {pathsSVGs.map((path, index) => {
                return (
                  <React.Fragment key={index}>
                    <SVGComponent index={index}>
                      {path}
                    </SVGComponent>
                  </React.Fragment>
                )
              })}
            </div>  
          </div>
          <div ref={entriesRef} className="absolute w-55 min-[600px]:w-[22.575rem] lg:w-95.75 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {displayTimelineData.map((entry: { year: string; title: string; description: string }, index: number) => (
              <div
                key={index}
                className="absolute w-full flex flex-col items-center text-center gap-2.5 opacity-0"
                style={{ transform: 'translateZ(0)' }}
              >
                {entry.year && (
                  <h6 className="text-[0.75rem]! min-[600px]:text-[1.25rem]! font-bold tracking-wider uppercase text-[#3c1a52] opacity-75">
                    {entry.year}
                  </h6>
                )}
                {entry.title && (
                  <h3 className="text-[1.25rem]! min-[600px]:text-[2.625rem]! leading-tight font-extrabold text-[#3c1a52]">
                    {entry.title}
                  </h3>
                )}
                {entry.description && (
                  <p className="text-[0.75rem]! min-[600px]:text-[1.25rem]! leading-relaxed text-[#3c1a52] opacity-85">
                    {entry.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='absolute inset-0 z-10 pointer-events-auto'></div>
    </div>
  );
}