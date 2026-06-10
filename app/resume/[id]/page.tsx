import { auth } from "@/auth";
import ResumeBuilder from "@/components/layout/resume/ResumeBuilder";
import { prisma } from "@/lib/prisma";
import { Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";

const ResumePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  const resume = await prisma.resume.findUnique({
    where: {
      id,
    },
  });

  //   const resume = await db.resume.findUnique({
  //     where: {id}
  //   })

  return (
    <Flex width="100%" height="100vh">
      <ResumeBuilder resume={resume} />
    </Flex>
  );
};

export default ResumePage;
