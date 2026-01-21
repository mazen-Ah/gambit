"use client";

import Image from "next/image";
import TeamMemberContentOverlay from "./TeamMemberContentOverlay";
import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isMobileContext } from "@/src/contexts/isMobileContext";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  short_description?: string;
  reach_text?: {en: string, ar: string};
  image: string;
  logos?: string[];
  team: string;
  social: {
    twitter: string;
    linkedin: string;
  };
}

interface TeamMemberCardProps {
  member: TeamMember;
  filteredMembers?: TeamMember[];
  currentIndex?: number;
  sectionName?: string;
  sectionIcon?: string;
}
//  transition-transform duration-500 group-hover:scale-105
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, filteredMembers = [], currentIndex = 0, sectionName, sectionIcon }) => {
  const { isMobile } = useContext(isMobileContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const blockAnimationRef = useRef<GSAPTween>(null);
  const origin = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const maxTilt = 8;

  const handleMoveEnter = (e: any) => {
    if(isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    origin.current.x = e.clientX - rect.left;
    origin.current.y = e.clientY - rect.top;
    origin.current.w = rect.width;
    origin.current.h = rect.height;

    setIsExpanded(true);
  };
  const handleMoveMove = (e: any) => {
    if(isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const block = containerRef.current?.querySelector('.team_block') as HTMLElement;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (origin.current.x === null || origin.current.y === null) {
      origin.current.x = x; origin.current.y = y; origin.current.w = rect.width; origin.current.h = rect.height;
    }

    const dx = x - origin.current.x;
    const dy = y - origin.current.y;

    const nx = gsap.utils.clamp(-1, 1, dx / (origin.current.w * 0.5));
    const ny = gsap.utils.clamp(-1, 1, dy / (origin.current.h * 0.5));

    const rotateY = nx * maxTilt;
    const rotateX = -ny * maxTilt;

    blockAnimationRef.current = gsap.to(block, { rotationY: rotateY, rotationX: rotateX, ease: 'power3.out', duration: 0.4 });
  };
  const handleMoveLeave = () => {
    if(isMobile) return;
    origin.current.x = origin.current.y = 0;
    const block = containerRef.current?.querySelector('.team_block') as HTMLElement;
    gsap.to(block, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 0.4, });
    // block.animation.reverse();

    setIsExpanded(false);
  };
  
  return (
    <div
      ref={containerRef} 
      className="team_col perspective-[150em] group transform-flat _eleX"
      onMouseEnter={handleMoveEnter}
      onMouseMove={handleMoveMove}
      onMouseLeave={handleMoveLeave}
    >
      <div className="team_block relative flex items-end h-[41.0625rem] min-[601px]:h-[41.5rem] transform-3d group perspective-none will-change-transform">
        <div className="tm_img absolute inset-0 rounded-2xl overflow-hidden">
          <Image
            src={member.image}
            alt={`${member.name} - ${member.position}`}
            fill
            className="object-cover group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(.22,.61,.36,1)]"
            priority={false}
          />
        </div>
        <TeamMemberContentOverlay 
          member={{
            ...member,
            _sectionName: sectionName,
            _sectionIcon: sectionIcon,
          } as any}
          isExpanded={isExpanded} 
          setIsExpanded={setIsExpanded}
          filteredMembers={filteredMembers}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
};

export default TeamMemberCard;
