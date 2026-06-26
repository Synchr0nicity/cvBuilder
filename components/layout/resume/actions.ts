"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { PersonalInfo } from "@/atoms/resumeAtoms";

type createResumeData = {
  resumeData: Prisma.InputJsonValue;
  title: string;
  style: Prisma.InputJsonValue | null;
};

export async function createResume(data: createResumeData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { resumeData, title, style } = data;

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: title,
      data: resumeData,
      style: style ?? {},
    },
  });

  redirect(`/resume/${resume.id}`);
}

export async function updatePersonalInfo(
  resumeId: string,
  personalInfo: Partial<PersonalInfo>,
) {
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
    throw new Error("resume not found");
  }

  const currentData = resume.data as Record<string, unknown>;

  await prisma.resume.update({
    where: {
      id: resume.id,
    },
    data: {
      data: {
        ...currentData,
        personalInfo: {
          ...(currentData.personalInfo as Record<string, unknown>),
          ...personalInfo,
        },
      },
    },
  });
}
