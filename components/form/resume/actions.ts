"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { PersonalInfo, WorkExperience } from "@/types/resume";
import { revalidatePath } from "next/cache";

type createResumeData = {
  title: string;
  workExperience?: WorkExperience[];
  personalInfo?: PersonalInfo;
  summary?: string;
};

export async function createResume(data: createResumeData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: data.title,
      workExperience: { create: data.workExperience },
      personalInfo: { create: data.personalInfo },
      summary: data.summary,
    },
  });

  redirect(`/resume/${resume.id}`);
}

export async function updatePersonalInfo(
  resumeId: string,
  patch: PersonalInfo,
) {
  console.log("updatePersonalInfo called");
  console.log("resumeId:", resumeId);
  console.log("patch:", patch);

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: session.user.id,
    },
  });

  console.log("resume found:", resume);

  if (!resume) {
    throw new Error("Resume not found");
  }

  const updated = await prisma.resume.update({
    where: {
      id: resume.id,
    },
    data: {
      personalInfo: {
        upsert: {
          create: patch,
          update: patch,
        },
      },
    },
    include: {
      personalInfo: true,
    },
  });

  revalidatePath(`/resume/${resumeId}`);

  return updated;
}

export async function updateSummary(resumeId: string, patch: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: session.user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  await prisma.resume.update({
    where: { id: resume.id },
    data: {
      summary: patch,
    },
  });
}
