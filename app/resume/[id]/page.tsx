import { auth } from "@/auth";
import ResumeBuilder from "@/components/layout/resume/ResumeBuilder/ResumeBuilder";
import { prisma } from "@/lib/prisma";
import { AppResume } from "@/types/resume";
import { Flex } from "@chakra-ui/react";
import { notFound, redirect } from "next/navigation";

const ResumePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const { id } = await params;
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/resume/${id}`);
  }

  console.log("RESUME PAGE SESSION:", session);

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!resume) {
    notFound();
  }

  return (
    <Flex width="100%" minH="0" height="calc(100vh - 63px)" overflow="hidden">
      <ResumeBuilder resume={resume as AppResume} />
    </Flex>
  );
};

export default ResumePage;
