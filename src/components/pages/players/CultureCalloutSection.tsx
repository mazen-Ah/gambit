"use client";
import Image from "next/image";
import { CustomButton } from "../../common/CustomButton";
import { ChessRookIcon, PhilosophyIcon } from "../../Icons";
import SectionHeader from "../../common/SectionHeader";
import usePopupStore from "@/src/app/hooks/usePopupStore";
import GeneralAnimation from "../../common/Animation/GeneralAnimation";
import { useRef } from "react";

const DiamondIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 0L12 6L6 12L0 6L6 0Z" fill="currentColor" />
    </svg>
  );
};

const CultureCalloutSection = (props: any) => {
  const setWorkWithUs = usePopupStore((state) => state.setWorkWithUs);
  const containerRef = useRef<HTMLDivElement>(null);
  const joinUsRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;
  
  // Helper function to get text from multilingual object
  const getText = (content: any) => {
    if (typeof content === 'string') return content;
    return content?.en || content?.ar || '';
  };

  // Extract culture callout section (about-section type)
  const cultureCallout = data?.sub_sections?.find((s: any) => s.type === 'about-section') || {};
  const cultureTitle = getText(cultureCallout?.content?.title) || 'CULTURE CALLOUT';
  const cultureSubtitle = getText(cultureCallout?.content?.subtitle) || 'We hire and retain the best of the best, and we make work feel like play';
  const cultureDescription = getText(cultureCallout?.content?.description) || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  const cultureIconUrl = cultureCallout?.media?.find((m: any) => m.collection_name === 'icon')?.url || cultureCallout?.icon;

  // Extract ready to play section (title-image type)
  const readyToPlay = data?.sub_sections?.find((s: any) => s.type === 'title-image') || {};
  const readyToPlayTitle = getText(readyToPlay?.content?.title) || 'Ready to play your move?';
  const readyToPlayImage = readyToPlay?.media?.find((m: any) => 
    m.collection_name === 'image_desktop' || m.collection_name === 'image'
  )?.url || readyToPlay?.image || '/images/aw1.webp';

  return (
    <section className="relative">
        <div ref={containerRef} className="bg-text-primary-30 space-x space-y  ">
          <GeneralAnimation containerRef={containerRef} type={'_eleY'}>
            <div className="flex max-lg:flex-col gap-[8.12rem] max-sm:gap-[3.75rem]">
              <div className="flex-1 grid grid-cols-8 grid-rows-9 gap-4 max-sm:min-h-[30rem]! min-h-[51.875rem]!">
                <div className="row-start-2 row-span-7 col-span-4 relative rounded-2xl overflow-hidden _eleY">
                  <Image
                    src="/images/aw1.webp"
                    alt="Team awards ceremony"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative rounded-2xl overflow-hidden row-span-3 col-span-3 _eleY">
                  <Image
                    src="/images/aw2.webp"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative rounded-2xl overflow-hidden row-span-6 col-span-4 _eleY">
                  <Image
                    src="/images/aw3.webp"
                    alt="Team working together"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <SectionHeader
                  icon={cultureIconUrl ? (
                    <Image 
                      src={cultureIconUrl} 
                      alt="Culture Icon"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  ) : (
                    <PhilosophyIcon />
                  )}
                  text={cultureTitle}
                  title={cultureSubtitle}
                  description={cultureDescription}
                  showLinkButton={false}
                />
              </div>
            </div>
          </GeneralAnimation>
        </div>

        <div ref={joinUsRef} >
          <GeneralAnimation containerRef={joinUsRef} type={'_eleY'}>
            <div className="bg-primary m-4 lg:m-20 mb-20 lg:mb-40 lg:h-[39.4375rem] rounded-2xl max-lg:h-[50.8125rem] overflow-hidden flex max-lg:flex-col-reverse gap-0 lg:gap-16 items-center ps-0 lg:ps-[8.37rem] max-lg:items-start _eleY">
              <div className="flex-1 max-lg:px-6 max-lg:pb-12 max-lg:pt-24 justify-start ">
                <h1 className="text-white mb-10 max-w-[35.8125rem] ">
                  {readyToPlayTitle}
                </h1>
                <CustomButton
                  text="JOIN US"
                  icon={<ChessRookIcon />}
                  variant="white"
                  iconContainerBg="primary"
                  action={() => {
                    setWorkWithUs(true);
                  }}
                  customClass="border-2 border-primary"
                  textClass="text-primary font-semibold"
                />
              </div>

              <div className="flex-1 relative overflow-hidden aspect-video lg:aspect-[16/10] h-full w-full max-lg:min-h-[24.8125rem] culture-card-clip">
                <Image
                  src={readyToPlayImage}
                  alt="Gambit team"
                  fill
                  className="object-cover "
                />
              </div>
            </div>
          </GeneralAnimation>
        </div>
    </section>
  );
};

export default CultureCalloutSection;
