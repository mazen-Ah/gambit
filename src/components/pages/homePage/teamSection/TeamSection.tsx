"use client";
import { useState, useMemo, useContext, useRef, useEffect } from "react";
import SectionHeader from "@/src/components/common/SectionHeader";
import Tabs from "@/src/components/common/Tabs";
import {
  DivisionsIcon,
  SliderViewIcon,
  ThePlayersIcon,
} from "@/src/components/Icons";
import TeamMemberCard from "./TeamMemberCard";
import GeneralSwiper from "@/src/components/common/generalSwiperContainer/GeneralSwiper";
import { SwiperSlide } from "swiper/react";
import { isMobileContext } from "@/src/contexts/isMobileContext";
import Shapes from "@/src/components/common/Animation/Shapes";
import gsap from "gsap";
import GeneralAnimation from "@/src/components/common/Animation/GeneralAnimation";

const TeamSection = (props: any) => {
  const data = props.data || props;
  const getText = (content: any) => content?.en || content?.ar || '';

  // Extract tabs from API data
  const tabsData = data?.tabs?.sub_sections || [];
  
  // Get initial tab ID - default to "all"
  const getInitialTabId = () => {
    return 'all';
  };

  const [activeView, setActiveView] = useState("list");
  const [activeTab, setActiveTab] = useState(getInitialTabId());
  // const { isMobile, isTablet } = useContext(isMobileContext);
  const changingRef = useRef(false);
  const containerRef = useRef(null);
  const teamTabs = tabsData.map((tab: any, index: number) => {
    const tabName = getText(tab.content?.title).toLowerCase();
    const colorMap: Record<string, string> = {
      'central': '#CF0F69',
      'gambit central': '#CF0F69',
      'pulse': '#BA0D2E',
      'sage': '#6B7866',
      'atelier': '#FFA38C',
      'fwd': '#0066BA',
    };
    // Use unique ID from API or create one based on index
    const uniqueId = tab.id?.toString() || tab.name || `tab-${index}`;
    // Normalize team name for matching (remove "gambit" prefix if present)
    const normalizedTeamName = tabName.replace(/^gambit\s+/, '');
    
    return {
      id: uniqueId,
      label: getText(tab.content?.title),
      color: colorMap[tabName] || colorMap[normalizedTeamName] || '#CF0F69',
      _teamName: normalizedTeamName, // Store normalized name for player matching
    };
  });

  // Extract team members from API data
  // Player cards can have type "player-card" or "player-card-new"
  const isPlayerCard = (type: string) => {
    return type === 'player-card' || type === 'player-card-new';
  };
  
  const playerCards = data?.sub_sections?.filter((s: any) => isPlayerCard(s.type)) || [];
  
  // Also check if there's a tabs section nested in sub_sections that might have players
  const nestedTabsSection = data?.sub_sections?.find((s: any) => s.name === 'tabs' || s.type === 'has-child');
  const playerCardsFromNestedTabs = nestedTabsSection?.sub_sections?.filter((s: any) => isPlayerCard(s.type)) || [];
  
  const allPlayerCards = [...playerCards, ...playerCardsFromNestedTabs];
  
  const members = allPlayerCards.map((card: any, index: number) => {
    // Default to first tab or 'central'
    let teamName = teamTabs[0]?._teamName || 'central';
    
    // Try to match player to a tab based on nested structure
    // Check if player is nested under a tab in the nested tabs section
    if (nestedTabsSection) {
      for (const tab of nestedTabsSection.sub_sections || []) {
        if (tab.sub_sections?.some((s: any) => s.id === card.id)) {
          const tabTitle = getText(tab.content?.title).toLowerCase().replace(/^gambit\s+/, '');
          teamName = tabTitle;
          break;
        }
      }
    }
    
    return {
      id: card.id?.toString() || card.name || `player-${index}`,
      name: getText(card.content?.title),
      position: getText(card.content?.subtitle),
      bio: getText(card.content?.description),
      short_description: getText(card.content?.short_description),
      reach_text: card.content?.reach_text || card.reach_text,
      image: card.media?.find((m: any) => 
        m.collection_name === 'image_desktop' || m.collection_name === 'image'
      )?.url || card.image || '',
      media: card.media,
      team: getText(card.content?.short_description),
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
    };
  });

 
  // Add "All" tab at the beginning
  const finalTeamTabs = [
    {
      id: "all",
      label: "All",
      color: "#3C1A52",
    },
    ...teamTabs,
  ];

  // Filter team members based on active tab
  const filteredMembers = useMemo(() => {
    const membersToUse = members;
    if (activeTab === "all") {
      return membersToUse;
    }
    
    // Find the tab by its unique ID and get its team name
    const activeTabData = teamTabs.find((tab: any) => tab.id === activeTab?.toLowerCase());
    const teamNameToFilter = activeTabData?._teamName?.toLowerCase() || activeTab?.toLowerCase();
    
    const filtered = membersToUse.filter(
      (member) => member.team?.toLowerCase() === teamNameToFilter || member.team?.toLowerCase() === activeTab?.toLowerCase()
    );

    return filtered;
  }, [activeTab, members, teamTabs]);

  // Handler for tab changes
  const handleTabChange = (tab: {
    id: string;
    label: string;
    color: string;
  }) => {
    if (changingRef.current || tab.id === activeTab) return;
    changingRef.current = true;

    const contentTL = gsap.timeline();
    const contents = document.querySelectorAll(".team_block");

    contentTL
      .to(".team_section .swiper-slide", {
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.in",
        autoAlpha: 0,
      })
      .fromTo(
        contents,
        {
          xPercent: 0,
          rotateY: 0,
        },
        {
          duration: 0.8,
          stagger: 0.1,
          xPercent: -50,
          rotateY: "-50deg",
          ease: "power3.in",
        },
        0
      )
      .call(() => {
        changingRef.current = false;
        setActiveTab(tab.id);
      });
  };

  // Handler for view toggle
  const handleViewChange = () => {
    setActiveView(activeView === "list" ? "slider" : "list");
  };

  useEffect(() => {
    const contentTL = gsap.timeline();
    const contents = document.querySelectorAll(".team_block");

    const timer = setTimeout(() => {
      contentTL
        .fromTo(
          ".team_section .swiper-slide",
          {
            autoAlpha: 0,
          },
          {
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            autoAlpha: 1,
          }
        )
        .fromTo(
          contents,
          {
            xPercent: 50,
            rotateY: "50deg",
          },
          {
            duration: 0.8,
            xPercent: 0,
            rotateY: 0,
            stagger: 0.1,
            ease: "power3.out",
          },
          0
        );
    }, 10);

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <section
      ref={containerRef}
      className="team_section relative bg-secondary space-y space-x flex flex-col"
    >
      <GeneralAnimation
        containerRef={containerRef}
        triggerSelector=".team_grid"
        type="_eleX"
      >
        <Shapes className="animated_svg shape_c" dataSpeed="1.2">
          <svg
            width="469"
            height="673"
            viewBox="0 0 469 673"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M137.434 380.001C185.924 340.697 244.144 270.941 287.682 194.889C304.16 166.104 292.385 129.255 262.007 115.464L260.246 114.664L445.771 198.892L444.011 198.093C413.633 184.301 378.141 199.691 367.318 231.043C338.721 313.879 324.529 403.623 326.856 465.998M109.146 496.773C78.4072 482.818 64.8065 446.576 78.768 415.823C92.7295 385.071 128.966 371.454 159.705 385.41L308.125 452.792C338.864 466.748 352.465 502.99 338.504 533.742C324.542 564.495 288.306 578.111 257.567 564.156M298.071 672.089L1.23038 537.324L18.0833 500.203C27.3905 479.702 51.5494 470.624 72.0413 479.928L294.672 581.001C315.164 590.304 324.231 614.467 314.924 634.968L298.071 672.089ZM460.925 116.227C442.31 157.23 393.994 175.385 353.009 156.778C312.024 138.171 293.889 89.8474 312.504 48.8446C331.12 7.84183 379.435 -10.3136 420.42 8.29349C461.405 26.9006 479.54 75.2242 460.925 116.227Z"
              stroke="#3C1A52"
              strokeOpacity="0.12"
              strokeMiterlimit="10"
            />
          </svg>
        </Shapes>
        <div className="flex flex-col sm:flex-row lg:items-center lg:justify-between w-full gap-6 lg:gap-0">
          <SectionHeader
            title={getText(data?.content?.subtitle)}
            icon={<ThePlayersIcon />}
            showLinkButton={false}
            text={getText(data?.content?.title) }
            className="mb-0! w-full!"
            titleClassName="text-text-primary-100"
          />

          <Tabs
            tabs={finalTeamTabs}
            defaultTab={finalTeamTabs[0]?.id || "all"}
            onTabChange={handleTabChange}
            className="sm:mt-auto w-full lg:w-auto"
            actionButton={{
              label: "Slider View",
              icon: <SliderViewIcon />,
              onClick: handleViewChange,
            }}
          />
        </div>
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
          {filteredMembers.map((member, i) => (
            <SwiperSlide
              key={`team-slide-${member.id}-unique` + i}
              className="will-change-opacity opacity-0"
            >
              <TeamMemberCard 
                key={member.id} 
                member={member} 
                filteredMembers={filteredMembers}
                currentIndex={i}
                sectionName={getText(data?.content?.title)}
                sectionIcon={data?.media?.find((m: any) => m.collection_name === 'icon')?.url}
              />
            </SwiperSlide>
          ))}
        </GeneralSwiper>
      </GeneralAnimation>
    </section>
  );
};

export default TeamSection;
