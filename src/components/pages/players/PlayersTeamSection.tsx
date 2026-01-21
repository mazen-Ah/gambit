"use client";
import TeamMemberCard from "../homePage/teamSection/TeamMemberCard";
import GeneralSwiper from "../../common/generalSwiperContainer/GeneralSwiper";
import { SwiperSlide } from "swiper/react";
import { useContext, useRef, useMemo } from "react";
import { isMobileContext } from "@/src/contexts/isMobileContext";
import GeneralAnimation from "../../common/Animation/GeneralAnimation";
import Image from "next/image";

const PlayersTeamSection = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data || props;
  
  // Helper function to get text from multilingual object
  const getText = (content: any) => {
    if (typeof content === 'string') return content;
    return content?.en || content?.ar || '';
  };

  // Extract section title and icon
  const sectionTitle = getText(data?.content?.title) || 'Gambit Central';
  const sectionIconUrl = data?.media?.find((m: any) => m.collection_name === 'icon')?.url || data?.icon;

  // Extract team members from sub_sections
  const members = useMemo(() => {
    const playerCards = (data?.sub_sections || [])
      .filter((card: any) => card.type === 'player-card' && !card.disabled)
      .map((card: any) => ({
        id: card.id?.toString() || card.name || `player-${card.order}`,
        name: getText(card.content?.title),
        position: getText(card.content?.subtitle),
        bio: getText(card.content?.description),
        short_description: getText(card.content?.short_description),
        reach_text: card.content?.reach_text || card.reach_text,
        image: card.media?.find((m: any) => 
          m.collection_name === 'image_desktop' || m.collection_name === 'image'
        )?.url || card.image || '',
        media: card.media,
        team: sectionTitle.toLowerCase().replace(/^gambit\s+/, ''),
        social: {
          twitter: card.content?.buttons?.find((btn: any) => {
            const label = getText(btn?.label || btn?.name || '').toLowerCase();
            return label === 'x' || label.includes('x');
          })?.url || '#',
          linkedin: card.content?.buttons?.find((btn: any) => {
            const label = getText(btn?.label || btn?.name || '').toLowerCase();
            return label === 'linkedin' || label.includes('linkedin');
          })?.url || '#',
        },
      }));
    
    return playerCards;
  }, [data, sectionTitle, getText]);

  const sampleMembers = [
    {
      id: "jamal-al-mawed",
      name: "Jamal Al Mawed",
      position: "Founder & CEO",
      bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries, Jamal’s career before founding Gambit Communications took him to senior roles at leading brands such as Rolls-Royce Motor Cars and the Dubai Properties Group.",
      image: "/images/g_tm_1.webp",
      team: "central",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: "jamal-al-mawed",
      name: "Jamal Al Mawed",
      position: "Founder & CEO",
      bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries, Jamal’s career before founding Gambit Communications took him to senior roles at leading brands such as Rolls-Royce Motor Cars and the Dubai Properties Group.",
      image: "/images/g_tm_1.webp",
      team: "central",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: "jamal-al-mawed",
      name: "Jamal Al Mawed",
      position: "Founder & CEO",
      bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries, Jamal’s career before founding Gambit Communications took him to senior roles at leading brands such as Rolls-Royce Motor Cars and the Dubai Properties Group.",
      image: "/images/g_tm_1.webp",
      team: "central",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: "jamal-al-mawed",
      name: "Jamal Al Mawed",
      position: "Founder & CEO",
      bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries, Jamal’s career before founding Gambit Communications took him to senior roles at leading brands such as Rolls-Royce Motor Cars and the Dubai Properties Group.",
      image: "/images/g_tm_1.webp",
      team: "central",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },

    {
      id: "sarah-al-salem",
      name: "Sarah Al Salem",
      position: "Associate Director",
      bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries, Jamal’s career before founding Gambit Communications took him to senior roles at leading brands such as Rolls-Royce Motor Cars and the Dubai Properties Group.",
      image: "/images/p_tm_1.webp",
      team: "pulse",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: "suzana-saoud",
      name: "Suzana Saoud",
      position: "Associate Account Director",
      bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries, Jamal’s career before founding Gambit Communications took him to senior roles at leading brands such as Rolls-Royce Motor Cars and the Dubai Properties Group.",
      image: "/images/s_tm_1.webp",
      team: "sage",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: "kathleen-burbridge",
      name: "Kathleen Burbridge",
      position: "Senior Account Director",
      bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries, Jamal’s career before founding Gambit Communications took him to senior roles at leading brands such as Rolls-Royce Motor Cars and the Dubai Properties Group.",
      image: "/images/a_tm_1.webp",
      team: "atelier",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: "tony-sidgwick",
      name: "Tony Sidgwick",
      position: "Account Director",
      bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries, Jamal’s career before founding Gambit Communications took him to senior roles at leading brands such as Rolls-Royce Motor Cars and the Dubai Properties Group.",
      image: "/images/f_tm_1.webp",
      team: "fwd",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: "gaurang-shah",
      name: "Gaurang Shah",
      position: "Head of Finance",
      bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries, Jamal’s career before founding Gambit Communications took him to senior roles at leading brands such as Rolls-Royce Motor Cars and the Dubai Properties Group.",
      image: "/images/g_tm_3.webp",
      team: "central",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
  ];
  // Use API members if available, otherwise fallback to sample
  const displayMembers = members.length > 0 ? members : sampleMembers;

  return (
    <section ref={containerRef} className="space-y space-x">
      <GeneralAnimation containerRef={containerRef} triggerSelector=".team_grid" type={'_eleX'}>
        <h2 className="flex items-center gap-2 text-text-primary-100">
          {sectionIconUrl ? (
            <Image 
              src={sectionIconUrl} 
              alt="Section Icon"
              width={47}
              height={47}
              className="object-contain"
            />
          ) : (
            <svg
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_545_1086"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={47}
                height="47"
              >
                <path d="M0 3.8147e-06H47V47H0V3.8147e-06Z" fill="white" />
              </mask>
              <g mask="url(#mask0_545_1086)">
                <path
                  d="M34.5156 9.17969C34.5156 11.2076 32.8717 12.8516 30.8438 12.8516H16.1562C14.1284 12.8516 12.4844 11.2076 12.4844 9.17969V1.04308e-06V5.50781H19.8281V1.83594H27.1719V5.50781H34.5156V1.04308e-06V9.17969Z"
                  stroke="#3C1A52"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <path
                  d="M27.1719 12.8516V24.5354C27.1719 25.9261 27.9577 27.1976 29.2016 27.8196L32.4859 29.4617C33.7298 30.0837 34.5156 31.3552 34.5156 32.7459V37.8203"
                  stroke="#3C1A52"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <path
                  d="M12.4844 37.8203V32.7459C12.4844 31.3552 13.2702 30.0837 14.5141 29.4617L17.7984 27.8196C19.0423 27.1976 19.8281 25.9261 19.8281 24.5354V12.8516"
                  stroke="#3C1A52"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <path
                  d="M38.1875 45.1641H8.8125V41.4922C8.8125 39.4643 10.4565 37.8203 12.4844 37.8203H34.5156C36.5436 37.8203 38.1875 39.4643 38.1875 41.4922V45.1641Z"
                  stroke="#3C1A52"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </g>
            </svg>
          )}
          {sectionTitle}
        </h2>
        <GeneralSwiper
          swiperKey="team-swiper-unique"
          baseSlidesPerView={1.2}
          baseSpaceBetween={10}
          breakPointsObject={{
            480: {
              slidesPerView: 1.2,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 3.9,
              spaceBetween: 20,
            },
          }}
          enableFreeMode={true}
          noMouseWheel={true}
          customClass="team_grid py-2! mt-15! max-lg:mt-12! overflow-visible!"
        >
          {displayMembers.map((member: any, i: number) => (
            <SwiperSlide key={`team-slide-${member.id}-unique` + i}>
              <TeamMemberCard 
                key={member.id} 
                member={member}
                sectionName={sectionTitle}
                sectionIcon={sectionIconUrl}
              />
            </SwiperSlide>
          ))}
        </GeneralSwiper>
      </GeneralAnimation>
    </section>
  );
};

export default PlayersTeamSection;
