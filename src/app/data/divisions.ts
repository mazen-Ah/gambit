export interface Division {
  id: string;
  name: string;
  color: string;
  title: string;
  description: string;
  image: string;
  heroImage?: string;
  heroSubtitle?: string;
  heroParagraph?: string;
  actionTitle?: string;
  actionDescription?: string;
  actionImage?: string;
}

export const divisions: Division[] = [
  {
    id: "atelier",
    name: "gambit. atelier",
    color: "#FFA38C",
    title: "A studio mindset for a pop culture world.",
    description:
      "Gambit Atelier curates the art of living beautifully. This division celebrates aesthetics, storytelling, and lifestyle — from couture to cinema, hotels to festivals. It brings cultural literacy, emotional elegance and editorial charm to brands that inspire, entertain, and influence.",
    image: "/images/dv1.webp",
    heroImage: "/images/dv1_bg.webp",
    heroSubtitle: "A studio mindset for a pop culture world.",
    heroParagraph: "Curating the art of living beautifully. From couture to cinema, hotels to festivals.",
    actionTitle: "The Art of Living",
    actionDescription: "Gambit Atelier celebrates aesthetics and storytelling, bringing emotional elegance to brands that inspire.",
    actionImage: "/images/dv1_bg.webp" 
  },
  {
    id: "pulse",
    name: "gambit. pulse",
    color: "#BA0D2E",
    title: "For brands that live in the moment and lead the momentum.",
    description:
      "Gambit Pulse is the energy centre of communications. It captures the tempo of now — the shifts in trends, the surge of emotion, and the moments that ignite passion and catch attention.",
    image: "/images/dv2.webp",
    heroImage: "/images/dv2_bg.webp",
    heroSubtitle: "Live in the moment. Lead the momentum.",
    heroParagraph: "The energy centre of communications. Capturing the tempo of now and the moments that ignite passion.",
    actionTitle: "Energy Centre",
    actionDescription: "Gambit Pulse captures the shifts in trends and the surge of emotion.",
    actionImage: "/images/dv2_bg.webp"
  },
  {
    id: "sage",
    name: "gambit. sage",
    color: "#6B7866",
    title: "Sage offers gravitas, calm, and strategic thinking.",
    description:
      "Gambit Sage is where wisdom meets clarity. This division is built for institutions shaping the future — from finance to education, law to sustainability. Navigating complex reputations or communicating impact with integrity.",
    image: "/images/dv3.webp",
    heroImage: "/images/dv3_bg.webp",
    heroSubtitle: "Where wisdom meets clarity.",
    heroParagraph: "Built for institutions shaping the future. Navigating complex reputations with integrity.",
    actionTitle: "Wisdom & Clarity",
    actionDescription: "Gambit Sage navigates complex reputations and communicates impact with integrity.",
    actionImage: "/images/dv3_bg.webp"
  },
  {
    id: "fwd",
    name: "gambit. fwd",
    color: "#0066BA",
    title: "fwd is future-facing and fast-tracking.",
    description:
      "Gambit fwd powers the industries defining tomorrow — from smart cities and luxury towers to connected tech and intelligent mobility. This division accelerates innovation through storytelling that keeps pace with progress. Built for visionaries and first movers.",
    image: "/images/dv4.webp",
    heroImage: "/images/heroFWD.png",
    heroSubtitle: "fwd is future-facing and fast-tracking",
    heroParagraph: "Powers the industries defining tomorrow. This division accelerates innovation through storytelling that keeps pace with progress.",
    actionTitle: "We move with the future.",
    actionDescription: "Gambit Pulse is the energy centre of communications. It captures the tempo of now — the shifts in trends, the surge of emotion, and the moments that ignite passion and catch attention.",
    actionImage: "/images/fwd.png"
  },
];
