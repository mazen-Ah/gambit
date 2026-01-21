
import ComponentRenderer from "./utils/ComponentRenderer";
import PerPageLayout from "./PerPageLayout";
import { fetchPageData } from "@/src/services/services_page"; 

interface Section {
  section_type: string;
  data?: Record<string, unknown>;
}

const sectionsProps: Record<string, any> = {
  home_hero: {
    className: "",
  },
  home_game: {},
  home_divisions: {
    // className: "pb-0!",
  },
  home_awards: {},
  home_team: {},
};

export default async function Page() {
  const pageData = await fetchPageData("home", 0);
  
  let sections: Section[] = pageData?.sections
    ?.filter((s: any) => !s.disabled)
    .map((s: any) => {
      const sectionName = (s.name?.en || s.name || '').replace(/-/g, '_');
      return {
        section_type: sectionName,
        data: s,
      };
    })
    .filter((s: Section) => s.section_type) || [];

  // Merge tabs section into home_team section
  const tabsSection = sections.find(s => s.section_type === 'tabs');
  const teamSection = sections.find(s => s.section_type === 'home_team');
  
  if (tabsSection && teamSection) {
    // Merge tabs data into team section
    teamSection.data = {
      ...teamSection.data,
      tabs: tabsSection.data,
    };
    // Remove tabs section from the array
    sections = sections.filter(s => s.section_type !== 'tabs');
  }
  
  
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
