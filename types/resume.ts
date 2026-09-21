import { Resume as PrismaResume } from "@prisma/client";

export type WorkExperience = {
  jobTitle: string;
  company: string;
  description: string;
  location?: string;
};

export type PersonalInfo = {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  profession?: string;
};

export type ResumeData = {
  id: string;
  title: string;
  personalInfo?: PersonalInfo;
  summary?: string;
  workExperiences?: WorkExperience[];
};

export type ResumeStyle = {
  font?: string;
  primaryColor?: string;
};
