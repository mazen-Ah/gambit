import { ComponentType } from "react";
import dynamic from "next/dynamic";

// Static imports for hero sections (first visible content)
import AboutGambit from "@/src/components/pages/about-us/hero/AboutGambit";
import HeroSection from "@/src/components/pages/homePage/hero/HeroSection";
import HeroPlayers from "@/src/components/pages/players/HeroPlayers";
import HeroAwards from "@/src/components/pages/awards/HeroAwards";
import HeroContact from "@/src/components/pages/contact-us/HeroContact";
import FwdHero from "@/src/components/pages/fwd/FwdHero";

// Static imports for lightweight components
import PhilosophySection from "@/src/components/pages/about-us/philosophy/PhilosophySection";
import PioneeringChangeSection from "@/src/components/pages/about-us/pioneeringChange/PioneeringChangeSection";
import GetInTouchSection from "@/src/components/common/GetInTouchSection";
import ServicesSection from "@/src/components/pages/about-us/servicesSection/ServicesSection";
import Stats from "@/src/components/pages/awards/Stats";

// Dynamic imports for heavy components (animations, carousels, complex interactions)
const AboutBanner = dynamic(() => import("@/src/components/pages/about-us/banner/AboutBanner"), {
  ssr: true
});

const AboutStory = dynamic(() => import("@/src/components/pages/about-us/story/StorySection"), {
  ssr: true
});

const TheGameSection = dynamic(() => import("@/src/components/pages/homePage/theGameSection/TheGameSection"), {
  ssr: true
});

const DivisionsSection = dynamic(() => import("@/src/components/pages/homePage/divisionsSection/DivisionsSection"), {
  ssr: true
});

const AwardsSection = dynamic(() => import("@/src/components/pages/homePage/awardSection/AwardsSection"), {
  ssr: true
});

const LogosSection = dynamic(() => import("@/src/components/pages/awards/LogosSection"), {
  ssr: true
});


const TeamSection = dynamic(() => import("@/src/components/pages/homePage/teamSection/TeamSection"), {
  ssr: true
});

const PlayersTeamSection = dynamic(() => import("@/src/components/pages/players/PlayersTeamSection"), {
  ssr: true
});

const IndividualAwards = dynamic(() => import("@/src/components/pages/players/IndividualAwards"), {
  ssr: true
});

const CultureCalloutSection = dynamic(() => import("@/src/components/pages/players/CultureCalloutSection"), {
  ssr: true
});

const WhatWeHaveWon = dynamic(() => import("@/src/components/pages/awards/WhatWeHaveWon"), {
  ssr: true
});

const FWDSection = dynamic(() => import("@/src/components/pages/fwd/FWDSection"), {
  ssr: true
});

const ThePlayersFwd = dynamic(() => import("@/src/components/pages/fwd/ThePlayersFwd"), {
  ssr: true
});

const AwardsSectionFwd = dynamic(() => import("@/src/components/pages/fwd/AwardsSectionFwd"), {
  ssr: true
});

const DivisionHero = dynamic(() => import("@/src/components/pages/divisions/DivisionHero"), {
  ssr: true
});

const DivisionActionSection = dynamic(() => import("@/src/components/pages/divisions/DivisionActionSection"), {
  ssr: true
});

const DivisionPlayers = dynamic(() => import("@/src/components/pages/divisions/DivisionPlayers"), {
  ssr: true
});

const DivisionAwards = dynamic(() => import("@/src/components/pages/divisions/DivisionAwards"), {
  ssr: true
});

export type ComponentName =
  | "about_banner"
  | "about_hero"
  | "about_story"
  | "about_services"
  | "about_philosophy"
  | "about_pioneering_change"
  | "about_get_in_touch"
  | "home_hero"
  | "home_game"
  | "home_divisions"
  | "home_awards"
  | "home_team"
  | "players_hero"
  | "players_team"
  | "players_individual_awards"
  | "players_culture_callout"
  | "awards_hero"
  | "awards_stats"
  | "awards_logos"
  | "awards_what_we_have_won"
  | "contact_hero"
  | "fwd_hero"
  | "fwd_section"
  | "fwd_players"
  | "fwd_awards"
  | "division_hero"
  | "division_action"
  | "division_players"
  | "division_awards";

export interface ComponentData {
  [key: string]: unknown;
}

export const componentMap: Record<ComponentName, React.ComponentType<any>> = {
  about_banner: AboutBanner,
  about_hero: AboutGambit,
  about_story: AboutStory,
  about_services: ServicesSection,
  about_philosophy: PhilosophySection as React.ComponentType<ComponentData>,
  about_pioneering_change: PioneeringChangeSection as React.ComponentType<ComponentData>,
  about_get_in_touch: GetInTouchSection as React.ComponentType<ComponentData>,
  home_hero: HeroSection as React.ComponentType<ComponentData>,
  home_game: TheGameSection as React.ComponentType<ComponentData>,
  home_divisions: DivisionsSection as React.ComponentType<ComponentData>,
  home_awards: AwardsSection as React.ComponentType<ComponentData>,
  home_team: TeamSection as React.ComponentType<ComponentData>,
  players_hero: HeroPlayers,
  players_team: PlayersTeamSection,
  players_individual_awards: IndividualAwards,
  players_culture_callout: CultureCalloutSection,
  awards_hero: HeroAwards,
  awards_logos: LogosSection,
  awards_stats: Stats,
  awards_what_we_have_won: WhatWeHaveWon,
  contact_hero: HeroContact,
  fwd_hero: FwdHero,
  fwd_section: FWDSection,
  fwd_players: ThePlayersFwd,
  fwd_awards: AwardsSectionFwd,
  division_hero: DivisionHero as unknown as React.ComponentType<ComponentData>,
  division_action: DivisionActionSection as unknown as React.ComponentType<ComponentData>,
  division_players: DivisionPlayers as unknown as React.ComponentType<ComponentData>,
  division_awards: DivisionAwards as unknown as React.ComponentType<ComponentData>,
};

export function hasComponent(name: string): name is ComponentName {
  return name in componentMap;
}
