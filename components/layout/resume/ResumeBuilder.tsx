"use client";

import { Flex } from "@chakra-ui/react";
import ResumeEditor from "./resumeEditor/ResumeEditor";
import ResumeView from "./ResumeView";
import ResumeSidebar from "./ResumeSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Resume } from "@/types/resume";
type ResumeBuilderProps = {
  resume: Resume;
};
const ResumeBuilder = ({ resume }: ResumeBuilderProps) => {
  const [localResume, setLocalResume] = useState<Resume>(resume);

  const { data: session } = useSession();
  const router = useRouter();

  console.log("resume:", localResume);
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <Flex bg="#F4F6F8" h="100%" width="100%" justifyContent="space-between">
      <ResumeEditor userId={session?.user?.id ?? ""} />
      <ResumeView />
      <ResumeSidebar />
    </Flex>
  );
};

export default ResumeBuilder;
