import ComponentRenderer from "@/src/app/utils/ComponentRenderer";
import PerPageLayout from "../PerPageLayout";
import PulsePageWrapper from "./PulsePageWrapper";
import { fetchPageData } from "@/src/services/services_page";

interface Section {
  section_type: string;
  data?: Record<string, unknown>;
}

// Fallback sections if API fails
const fallbackSections: Section[] = [
  { section_type: "fwd_hero", data: {} },
  { section_type: "fwd_section", data: {} },
  { section_type: "fwd_players", data: {} },
  { section_type: "fwd_awards", data: {} },
  {
    section_type: "about_get_in_touch",
    data: { srcImage: "", text: "", title: "", description: "" },
  },
];

export default async function Page() {
  const pageData = await fetchPageData("pulse", 0);

  const sections: Section[] = pageData?.sections
    ?.filter((s: any) => !s.disabled)
    .map((s: any) => {
      const sectionName = (s.name?.en || s.name || '').replace(/-/g, '_');
      const sectionNameMap: Record<string, string> = {
        'get_in_touch': 'about_get_in_touch',
      };
      const mappedName = sectionNameMap[sectionName] || sectionName;
      return {
        section_type: mappedName,
        data: s,
      };
    })
    .filter((s: Section) => s.section_type) || fallbackSections;

  return (
    <>
      <PulsePageWrapper />
      <PerPageLayout>
        {sections.map((section, index) => (
          <ComponentRenderer
            key={`${section.section_type}-${index}`}
            name={section.section_type}
            data={section.data}
          />
        ))}
      </PerPageLayout>
    </>
  );
}

