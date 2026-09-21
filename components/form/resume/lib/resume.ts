import { z } from "zod";

export const workExperienceSchema = z.object({
  jobTitle: z.string(),
  company: z.string(),
  description: z.string(),
  location: z.string(),
});

export const workExperiencesSchema = z.array(workExperienceSchema);

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string(),
  phone: z.string(),
  email: z.string(),
  profession: z.string(),
});

export const resumeSchema = z.object({
  title: z.string().min(1, "Title is required."),
  workExperience: z.array(workExperienceSchema),
  personalInfo: personalInfoSchema.nullable(),
  summary: z.string().nullable(),
});

export const createResumeSchema = resumeSchema;

export const updateResumeSchema = resumeSchema.extend({
  id: z.string(),
});

export type Resume = z.infer<typeof resumeSchema>;

export type CreateResumeBody = z.infer<typeof createResumeSchema>;
export type UpdateResumeBody = z.infer<typeof updateResumeSchema>;

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type WorkExperiences = z.infer<typeof workExperiencesSchema>;
