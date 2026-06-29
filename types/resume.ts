import { Resume as PrismaResume } from "@prisma/client";

export type ResumeData = {
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    profession?: string;
  };
  summary?: string;
  workExperience?: Experience[];
};

export type Experience = {
  id: string;
  company?: string;
  jobTitle?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  location?: string;
};

export type ResumeStyle = {
  font?: string;
  primaryColor?: string;
};

export type AppResume = Omit<PrismaResume, "data" | "style"> & {
  data?: ResumeData;
  style?: ResumeStyle;
};
