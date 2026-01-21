import ComponentRenderer from "@/src/app/utils/ComponentRenderer";
import PerPageLayout from "../PerPageLayout";
import { fetchPageData } from "@/src/services/services_page";

interface Section {
  section_type: string;
  data?: Record<string, unknown>;
}

// Fallback sections if API fails
const fallbackSections: Section[] = [
  { section_type: "players_hero", data: {} },
  { section_type: "players_team", data: {} },
  { section_type: "players_team", data: {} },
  { section_type: "players_individual_awards", data: {} },
  { section_type: "players_culture_callout", data: {} },
];

export default async function Page() {
  const pageData = await fetchPageData("players", 0);
  
  const sections: Section[] = pageData?.sections
    ?.filter((s: any) => !s.disabled)
    .map((s: any) => {
      const sectionName = (s.name?.en || s.name || '').replace(/-/g, '_');
      const sectionNameMap: Record<string, string> = {
        'players_hero': 'players_hero',
        'players_team': 'players_team',
        'players_individual_awards': 'players_individual_awards',
        'players_culture_callout': 'players_culture_callout',
      };
      const mappedName = sectionNameMap[sectionName] || sectionName;
      return {
        section_type: mappedName,
        data: s,
      };
    })
    .filter((s: Section) => {
      // Filter out sections that don't have a valid mapping
      // Also filter out duplicate players-team with type "title" (keep only "title-icon")
      if (s.section_type === 'players_team') {
        const sectionData = s.data as any;
        // Only include if it has sub_sections (title-icon type) or if it's the first occurrence
        return sectionData?.sub_sections?.length > 0 || sectionData?.type === 'title-icon';
      }
      return s.section_type;
    }) || fallbackSections;
  
  return (
    <PerPageLayout>
      {sections.map((section, index) => (
        <ComponentRenderer
          key={`${section.section_type}-${index}`}
          name={section.section_type}
          data={section.data}
        />
      ))}
    </PerPageLayout>
  );
}
