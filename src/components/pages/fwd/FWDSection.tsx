"use client"

import Image from "next/image";
import SectionHeader from "@/src/components/common/SectionHeader";
import { CrownIcon } from "@/src/components/Icons";
import { useContext, useEffect, useMemo, useRef } from "react";
import GeneralAnimation from "../../common/Animation/GeneralAnimation";
import SlicedImage from "../../common/SlicedImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileContext } from "@/src/contexts/isMobileContext";

const FWDSection = (props: any) => {
  const { isMobile } = useContext(isMobileContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;

  const getText = (content: any) => content?.en || content?.ar || '';
  
  const text = getText(data?.content?.title); // Swapped: title -> text
  const title = getText(data?.content?.subtitle); // Swapped: subtitle -> title
  const iconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url;
  
  // Extract cards from sub_sections
  const cards = data?.sub_sections?.filter((s: any) => s.type === 'title-subtitle-image') || [];
  
  const sectionData = useMemo(() => {
    const getText = (content: any) => content?.en || content?.ar || '';
    return cards.map((card: any) => ({
      image: card.media?.find((m: any) => 
        m.collection_name === 'image_desktop' || m.collection_name === 'image'
      )?.url || "/images/fwd.png",
      title: getText(card.content?.title),
      description: getText(card.content?.subtitle),
    }));
  }, [cards]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const nodes = container.querySelectorAll(".slice_node");
    const frontImages = container.querySelectorAll(".face-front");
    const backImages = container.querySelectorAll(".face-back");
    const textBlocks = container.querySelectorAll(".content_fade");

    const tl = gsap.timeline({
      paused: true,
      onUpdate: function () {
        const p = this.progress();
        nodes.forEach((node, i) => {
          const rotation = (gsap.getProperty(node, "rotateX") as number) || 0;
          const absRot = Math.abs(rotation);
          
          const segment = Math.min(Math.floor(absRot / 180), data.length - 2);

          if (segment % 2 === 0) {
            gsap.set(frontImages[i], { backgroundImage: `url(${data[segment].image})` });
            gsap.set(backImages[i], { backgroundImage: `url(${data[segment + 1].image})` });
          } else {
            gsap.set(backImages[i], { backgroundImage: `url(${data[segment].image})` });
            gsap.set(frontImages[i], { backgroundImage: `url(${data[segment + 1].image})` });
          }
        });
      },
    });

    sectionData.slice(0).forEach((_:any, index:number) => {
      tl.to(nodes, {
        duration: 1.2,
        stagger: -0.06,
        ease: "power3.inOut",
        rotateX: (index + 1) * 180,
        transformOrigin: "center",
      });
    });

    let currentIdx = 0;
    gsap.set(textBlocks, { autoAlpha: 0 });
    gsap.set(textBlocks[0], { autoAlpha: 1 });

    const trigger = ScrollTrigger.create({
      trigger: ".features_wrapper",
      start: "top top",
      end: `bottom+=${(sectionData.length - 1) * 100}% top`,
      pin: true,
      pinType: isMobile ? "fixed" : "transform",
      pinSpacing: true,
      onUpdate: ({ progress }) => {
        tl.progress(progress);

        const activeIndex = Math.round(progress * (sectionData.length - 1));

        if (activeIndex !== currentIdx) {
          gsap.to(textBlocks[currentIdx], {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: "auto",
          });
          gsap.to(textBlocks[activeIndex], {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: "auto",
          });
          currentIdx = activeIndex;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile, sectionData]);

  return (
    <section
      ref={containerRef}
      className="relative space-x space-y min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(to bottom, white, #E3E7EE)" }}
    >
      <div className="fwd_section_wrapper">
        <GeneralAnimation containerRef={containerRef} type='_eleY'>
          <SectionHeader
            icon={iconUrl ? (
              <Image src={iconUrl} alt="Icon" width={24} height={24} className="text-primary!" />
            ) : (
              <CrownIcon className="text-primary!" />
            )}
            text={text || "FWD IN ACTION"}
            title={title || "We move with the future."}
            showLinkButton={false}
            className="mb-12"
            BadgeClassName="bg-primary/10 border-primary/30!"
            textClassName="text-primary!"
            titleClassName="text-primary!"
          />

          {sectionData.length > 0 && (
            <div className="features_wrapper w-full">
              <div className="w-full h-screen flex items-center justify-center rounded-2xl overflow-hidden">
                <div className="relative w-full h-244.5 max-lg:h-[90vh] _eleY">
                  <div className="dv_bg absolute size-full top-0 -bottom-[8px]">
                    <SlicedImage
                      FrontImageUrl={sectionData[0].image}
                      BackImageUrl={sectionData[0].image }
                    />
                  </div>
                  <div className="absolute inset-0 bg-primary z-1 mix-blend-multiply"></div>
                  <div className="absolute bottom-0 left-0 p-8 max-sm:p-6 z-10 w-full">
                    {sectionData.map((item:any, idx:number) => (
                      <div
                        key={idx}
                        className="content_fade absolute bottom-0 left-0 p-8 max-sm:p-6 w-full"
                      >
                        <h2 className="text-white! mb-[0.94rem]!">{item.title}</h2>
                        <p className="text-white/80 text-[1.3125rem]! leading-[150%] max-w-162.75 font-normal! tracking-[-0.01563rem]!">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </GeneralAnimation>
      </div>
      <div className="absolute inset-0 pointer-events-auto z-10"></div>
    </section>
  );
};

export default FWDSection;
