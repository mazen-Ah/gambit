"use client";
import React, { useContext, useRef } from "react";
import GeneralSwiper from "../../common/generalSwiperContainer/GeneralSwiper";
import TeamMemberCard from "../homePage/teamSection/TeamMemberCard";
import { SwiperSlide } from "swiper/react";

import { isMobileContext } from "@/src/contexts/isMobileContext";
import SectionHeader from "../../common/SectionHeader";
import { ThePlayersIcon } from "../../Icons";
import GeneralAnimation from "../../common/Animation/GeneralAnimation";
import { Division } from "@/src/app/data/divisions";

// Dummy members data generator or filtering logic could go here.
// For now, I'll use the sampleMembers from the original file but genericize the team if needed.
const sampleMembers = [
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
  // duplicating for demo purposes as in original file
  {
    id: "tony-sidgwick-2",
    name: "Tony Sidgwick",
    position: "Account Director",
    bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries.",
    image: "/images/f_tm_1.webp",
    team: "fwd",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "tony-sidgwick-3",
    name: "Tony Sidgwick",
    position: "Account Director",
    bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries.",
    image: "/images/f_tm_1.webp",
    team: "fwd",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "tony-sidgwick-4",
    name: "Tony Sidgwick",
    position: "Account Director",
    bio: "Palestinian/British/Emirati hybrid with over 17 years’ experience handling the PR and Communications of multinational brands overseeing more than thirty countries.",
    image: "/images/f_tm_1.webp",
    team: "fwd",
    social: { twitter: "#", linkedin: "#" },
  },
];

interface DivisionPlayersProps {
  division: Division;
}

const DivisionPlayers = ({ division }: DivisionPlayersProps) => {
  const { isMobile } = useContext(isMobileContext);
  const containerRef = useRef<HTMLDivElement>(null);

  // In a real app, filter members by division.id or fetch specific members
  const members = sampleMembers;

  return (
    <section ref={containerRef} className="space-x space-y bg-[#E3E7EE]">
      <GeneralAnimation
        containerRef={containerRef}
        triggerSelector=".players_grid"
        type={isMobile ? "_eleX" : "_eleY"}
      >
        <SectionHeader
          icon={<ThePlayersIcon className="text-primary!" />}
          text="The Players"
          title="Humanize the division. Show who's building the future"
          showLinkButton={false}
          className="mb-12"
          BadgeClassName="bg-primary/10 border-primary/30!"
          textClassName="text-primary!"
          titleClassName="text-primary!"
        />
        {isMobile ? (
          <GeneralSwiper
            swiperKey={`team-swiper-${division.id}`}
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
            customClass="team_grid py-2! mt-15! max-lg:mt-12! overflow-visible! players_grid"
          >
            {members.map((member, i) => (
              <SwiperSlide key={`team-slide-${member.id}-${i}`} className="">
                <TeamMemberCard key={member.id} member={member} />
              </SwiperSlide>
            ))}
          </GeneralSwiper>
        ) : (
          <div className="players_grid grid grid-cols-4 gap-4">
            {members.map((member, i) => (
              <div key={member.id + i} className="_eleY">
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        )}
      </GeneralAnimation>
    </section>
  );
};

export default DivisionPlayers;
