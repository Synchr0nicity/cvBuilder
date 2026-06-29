"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";

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

export async function updateResumeData(
  resumeId: string,
  patch: Prisma.InputJsonObject,
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
    throw new Error("Resume not found");
  }

  const currentData = resume.data as Prisma.JsonObject;

  const nextData: Prisma.InputJsonObject = {
    ...currentData,
    ...patch,
  };

  await prisma.resume.update({
    where: { id: resume.id },
    data: {
      data: nextData,
    },
  });
}
