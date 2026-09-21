import { auth } from "@/auth";
import ResumeBuilder from "@/components/form/resume/ResumeBuilder/ResumeBuilder";
import { prisma } from "@/lib/prisma";
import { ResumeData } from "@/types/resume";
import { Flex } from "@chakra-ui/react";
import { notFound, redirect } from "next/navigation";

const ResumePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const { id } = await params;
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/resume/${id}`);
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      personalInfo: true,
      workExperiences: true,
    },
  });

  if (!resume) {
    notFound();
  }

  return (
    <Flex width="100%" minH="0" height="calc(100vh - 63px)" overflow="hidden">
      <ResumeBuilder resume={resume as ResumeData} />
    </Flex>
  );
};

export default ResumePage;
