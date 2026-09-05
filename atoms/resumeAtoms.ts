import { atom } from "jotai";
import type { Experience } from "@/types/resume";
import { atomFamily } from "jotai-family";
import { Resume } from "@prisma/client";

export type ResumeData = NonNullable<Resume["data"]>;
export type PersonalInfo = NonNullable<Resume["personalInfo"]>;
export type Summary = NonNullable<Resume["summary"]>;
export type WorkExperience = NonNullable<Resume["workExperience"]>;

export const resumeAtom = atom<Resume | null>(null);
export const personalInfoAtom = atom(
  (get) => get(resumeAtom)?.personalInfo,
  (get, set, value: PersonalInfo | ((prev: PersonalInfo) => PersonalInfo)) => {
    const resume = get(resumeAtom);
    if (!resume) return;

    const prev = resume.data?.personalInfo as PersonalInfo;
    const next = typeof value === "function" ? value(prev) : value;

    set(resumeAtom, {
      ...resume,
      data: {
        ...resume.data,
        personalInfo: next,
      },
    });
  },
);

export const summaryAtom = atom(
  (get) => get(resumeAtom)?.data?.summary,
  (get, set, value: Summary) => {
    const resume = get(resumeAtom);

    if (!resume) return;

    set(resumeAtom, {
      ...resume,
      data: {
        ...resume.data,
        summary: value,
      },
    });
  },
);

export const experienceAtomFamily = atomFamily((experienceId) =>
  atom(
    (get) =>
      get(resumeAtom)?.data?.workExperience?.find(
        (exp) => exp.id === experienceId,
      ),
    (get, set, value: Experience) => {
      const resume = get(resumeAtom);

      if (!resume) return;

      set(resumeAtom, {
        ...resume,
        data: {
          ...resume.data,
          workExperience: resume.data?.workExperience?.map((exp) => {
            if (experienceId === exp.id) return value;
            else return exp;
          }),
        },
      });
    },
  ),
);

export const workExperiencesAtom = atom((get) => {
  return get(resumeAtom)?.data?.workExperience ?? [];
});
