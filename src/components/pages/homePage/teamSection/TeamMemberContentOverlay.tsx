"use client";

import { useState, useCallback, useContext } from "react";
import {
  TwitterIcon,
  LinkedInIcon,
  PlusIcon,
  ExpandIcon,
} from "@/src/components/Icons";
import { isMobileContext } from "@/src/contexts/isMobileContext";
import CanvasButton from "@/src/components/common/CanvasButton";
import usePopupStore from "@/src/app/hooks/usePopupStore";
import { usePathname } from "next/navigation";
interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  short_description?: string;
  reach_text?: {en: string, ar: string};
  logos?: string[];
  image: string;
  team: string;
  social: {
    twitter: string;
    linkedin: string;
  };
}

interface TeamMemberContentOverlayProps {
  member: TeamMember;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  filteredMembers?: TeamMember[];
  currentIndex?: number;
}

const TeamMemberContentOverlay: React.FC<TeamMemberContentOverlayProps> = ({
  member,
  isExpanded,
  setIsExpanded,
  filteredMembers = [],
  currentIndex = 0,
}) => {
  const setMember = usePopupStore((state) => state.setMember);
  const setFilteredMembers = usePopupStore((state) => state.setFilteredMembers);
  const setCurrentMemberIndex = usePopupStore((state) => state.setCurrentMemberIndex);
  const setSectionData = usePopupStore((state) => state.setSectionData);
  const { isMobile } = useContext(isMobileContext);
  const pathname = usePathname();
  const isFwd = pathname.includes("fwd");
  
  // Get section data from props if available
  const sectionName = (member as any)?._sectionName;
  const sectionIcon = (member as any)?._sectionIcon;
  console.log(member,"member");
  return (
    <div className="team_outer_content z-50 perspective-[50em] transform-3d m-6 mx-8! scale-[0.97]">
      <div className="team_content bg-white rounded-lg px-5.75 pt-0 relative z-50 transform-3d transform-[translate3D(0,-.3em,3em)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between py-4.5">
          <div className=" leading-4!">
            <p
              className={
                isFwd || isExpanded
                  ? "text-primary! plus"
                  : "text-text-primary! plus"
              }
            >
              {member.name}
            </p>
            <div
              className={
                isFwd
                  ? "text-base font-normal text-primary/60"
                  : "text-base font-normal text-text-primary/60"
              }
            >
              {member.position}
            </div>
          </div>

          {/* Plus Button with Custom Styling */}
          {isMobile && (
            <div
              className={`relative w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-1000 ${
                isExpanded ? "text-white" : "text-gray-600"
              }`}
              role="button"
              tabIndex={0}
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
              style={{
                willChange: "transform",
                transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
              }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div
                style={{
                  transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                }}
                className={`absolute inset-0 rounded-full ${
                  isFwd
                    ? "border border-primary/20"
                    : "border border-text-primary-15"
                } transition-all duration-1000 ${
                  isExpanded ? "scale-150 opacity-0" : "scale-100 opacity-100"
                }`}
              />
              <div
                style={{
                  transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                }}
                className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                  isExpanded
                    ? "bg-primary scale-100 opacity-100"
                    : "bg-transparent scale-0 opacity-0"
                }`}
              />
              <div
                className="relative z-40 transition-transform duration-1000"
                style={{
                  transform: isExpanded ? "rotate(135deg)" : "rotate(0deg)",
                  transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                }}
              >
                <PlusIcon />
              </div>
            </div>
          )}
        </div>

        {/* Body - Bio and Actions */}
        <div
          className="flex flex-col overflow-hidden transition-all duration-1000 h-fit"
          style={{
            height: isExpanded ? "20rem" : "0rem",
            willChange: "height",
            transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          {/* Bio Section */}
          <div className="flex flex-col py-5 border-t border-b border-primary/10 h-full">
            <span
              className={
                isFwd
                  ? "text-base text-primary/80 leading-[160%]"
                  : "text-base text-text-primary/80 leading-[160%]"
              }
            >
              {member.bio}
            </span>
          </div>

          {/* Footer - Social Links and Expand Button */}
          <div className="flex items-center justify-between py-5">
            {/* Social Links */}
            <div className="flex gap-2">
              {member.social?.twitter && member.social.twitter !== '#' && member.social.twitter !== '' && (
                <CanvasButton
                  wrapperClassName="w-auto h-auto"
                  canvasColor="var(--primary)"
                >
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-wrapper-fill w-10 h-10 p-2 text-gray-900 flex items-center justify-center hover:text-white pointer-events-auto cursor-pointer"
                    aria-label={`Follow ${member.name} on Twitter`}
                  >
                    <TwitterIcon />
                  </a>
                </CanvasButton>
              )}
              {member.social?.linkedin && member.social.linkedin !== '#' && member.social.linkedin !== '' && (
                <CanvasButton
                  wrapperClassName="w-auto h-auto"
                  canvasColor="var(--primary)"
                >
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-wrapper-fill w-10 h-10 p-2 text-gray-900 flex items-center justify-center hover:text-white pointer-events-auto cursor-pointer"
                    aria-label={`Connect with ${member.name} on LinkedIn`}
                  >
                    <LinkedInIcon />
                  </a>
                </CanvasButton>
              )}
            </div>

            {/* Expand Button */}
            <CanvasButton
              wrapperClassName="w-auto h-auto"
              canvasColor="var(--primary)"
            >
              <div
                className="icon-wrapper-fill w-10 h-10 p-2 text-gray-900 flex items-center justify-center hover:text-white pointer-events-auto cursor-pointer"
                data-id={member.id}
                onClick={() => {
                  setFilteredMembers(filteredMembers);
                  setCurrentMemberIndex(currentIndex);
                  if (sectionName || sectionIcon) {
                    setSectionData({
                      name: sectionName,
                      icon: sectionIcon,
                    });
                  }
                  setMember(member);
                }}
                role="button"
                tabIndex={0}
                aria-label={`View full profile of ${member.name}`}
              >
                <ExpandIcon />
              </div>
            </CanvasButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberContentOverlay;
