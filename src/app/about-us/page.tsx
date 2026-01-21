import ComponentRenderer from "@/src/app/utils/ComponentRenderer";
import PerPageLayout from "../PerPageLayout";
import { fetchPageData } from "@/src/services/services_page";

interface Section {
  section_type: string;
  data?: Record<string, unknown>;
}

// Fallback sections if API fails
const fallbackSections: Section[] = [
  { section_type: "about_banner", data: {} },
  { section_type: "about_hero", data: {} },
  { section_type: "about_story", data: {} },
  { section_type: "about_philosophy", data: {} },
  { section_type: "about_pioneering_change", data: {} },
  { section_type: "about_services", data: {} },
  { section_type: "about_get_in_touch", data: {} },
];

export default async function Page() {
  const pageData = await fetchPageData("about-us", 0);
  
  const sections: Section[] = pageData?.sections
    ?.filter((s: any) => !s.disabled)
    .map((s: any) => {
      const sectionName = (s.name?.en || s.name || '').replace(/-/g, '_');
      const sectionNameMap: Record<string, string> = {
        'about_banner': 'about_banner',
        'about_hero': 'about_hero',
        'about_story': 'about_story',
        'about_philosophy': 'about_philosophy',
        'pioneering_change': 'about_pioneering_change',
        'services': 'about_services',
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
