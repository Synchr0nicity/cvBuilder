import { PersonalInfo, ResumeData, WorkExperience } from "@/types/resume";
import { create } from "zustand";

type ResumeStore = {
  resume: ResumeData | null;
  setResume: (resume: ResumeData) => void;
  setSummary: (summary: string) => void;
  setPersonalInfo: (personalInfo: PersonalInfo) => void;
  setWorkExperiences: (workExperience: WorkExperience) => void;
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: null,
  setResume: (resume) => set({ resume: resume }),
  setSummary: (summary) =>
    set((state) => ({
      resume: state.resume ? { ...state.resume, summary } : null,
    })),
  setPersonalInfo: (personalInfo) =>
    set((state) => ({
      resume: state.resume ? { ...state.resume, personalInfo } : null,
    })),
  setWorkExperiences: (workExperience) =>
    set((state) => ({
      resume: state.resume ? { ...state.resume, workExperience } : null,
    })),
}));
