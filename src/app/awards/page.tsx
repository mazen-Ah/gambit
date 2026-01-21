import ComponentRenderer from "@/src/app/utils/ComponentRenderer";
import PerPageLayout from "../PerPageLayout";
import { fetchPageData } from "@/src/services/services_page";

interface Section {
  section_type: string;
  data?: Record<string, unknown>;
}

// Fallback sections if API fails
const fallbackSections: Section[] = [
  { section_type: "awards_hero", data: {} },
  { section_type: "awards_stats", data: {} },
  { section_type: "awards_logos", data: {} },
  { section_type: "awards_what_we_have_won", data: {} },
  {
    section_type: "about_get_in_touch",
    data: {
    },
  },
];

const sectionsProps: Record<string, any> = {
  about_get_in_touch: {
    className: "bg-white! space-y bg-white! min-h-200",
  },
};

export default async function Page() {
  const pageData = await fetchPageData("awards", 0);

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
    <PerPageLayout>
      {sections.map((section, index) => (
        <ComponentRenderer
          key={`${section.section_type}-${index}`}
          name={section.section_type}
          data={section.data}
          props={sectionsProps[section.section_type]}
        />
      ))}
    </PerPageLayout>
  );
}
