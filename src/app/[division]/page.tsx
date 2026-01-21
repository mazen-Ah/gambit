import { notFound } from "next/navigation";
import { divisions } from "@/src/app/data/divisions";
import ComponentRenderer from "@/src/app/utils/ComponentRenderer";
import PerPageLayout from "@/src/app/PerPageLayout";
import DivisionPageWrapper from "@/src/components/pages/divisions/DivisionPageWrapper";

interface Section {
  section_type: string;
}

// All generic sections for a division page
const sections: Section[] = [
  { section_type: "division_hero" },
  { section_type: "division_action" },
  { section_type: "division_players" },
  { section_type: "division_awards" },
  { section_type: "about_get_in_touch" }, // Reuse existing contact section
];

interface PageProps {
  params: Promise<{
    division: string;
  }>;
}

// Generate static params for all divisions
export async function generateStaticParams() {
  return divisions.map((division) => ({
    division: division.id,
  }));
}

export default async function Page({ params }: PageProps) {
  const { division: divisionId } = await params;
  const currentDivision = divisions.find((d) => d.id === divisionId);

  if (!currentDivision) {
    return notFound();
  }

  // Pre-fill data for each section with the current division object
  // For 'about_get_in_touch', we might want specific texts, but for now reuse defaults or pass empty
  const getSectionData = (type: string) => {
    if (type === "about_get_in_touch") {
      return {
        srcImage: "",
        text: "Get in Touch",
        title: "Ready to start a project?",
        description: "Let's build something amazing together.",
      };
    }
    return { division: currentDivision };
  };

  return (
    <>
      <DivisionPageWrapper divisionId={currentDivision.id} />
      <PerPageLayout>
        {sections.map((section, index) => (
          <ComponentRenderer
            key={`${section.section_type}-${index}`}
            name={section.section_type}
            data={getSectionData(section.section_type)}
          />
        ))}
      </PerPageLayout>
    </>
  );
}
