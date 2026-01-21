import { create } from "zustand"

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

interface SectionData {
  name?: string;
  icon?: string;
}

interface PopupState {
  member: boolean | TeamMember | null
  setMember: (value: boolean | TeamMember | null) => void
  filteredMembers: TeamMember[]
  setFilteredMembers: (members: TeamMember[]) => void
  currentMemberIndex: number
  setCurrentMemberIndex: (index: number) => void
  sectionData: SectionData
  setSectionData: (data: SectionData) => void
  workWithUs: boolean
  setWorkWithUs: (value: boolean) => void
}

const usePopupStore = create<PopupState>((set) => ({
  member: false,
  setMember: (value) => set({ member: value }),
  filteredMembers: [],
  setFilteredMembers: (members) => set({ filteredMembers: members }),
  currentMemberIndex: 0,
  setCurrentMemberIndex: (index) => set({ currentMemberIndex: index }),
  sectionData: {},
  setSectionData: (data) => set({ sectionData: data }),
  workWithUs: false,
  setWorkWithUs: (value) => set((state) => ({ workWithUs: typeof value === "boolean" ? value : state.workWithUs })),
}))

export type { TeamMember }
export default usePopupStore
