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
