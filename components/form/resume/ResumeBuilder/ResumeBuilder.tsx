"use client";

import { Flex } from "@chakra-ui/react";
import ResumeView from "./ResumeView";
import ResumeSidebar from "./ResumeSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ResumeData } from "@/types/resume";
import PersonalInfoField from "./resumeEditor/formFields/PersonalInfoField";
import SummaryField from "./resumeEditor/formFields/SummaryField";
import WorkExperienceField from "./resumeEditor/formFields/workExperience/WorkExperienceField";
import { useResumeStore } from "@/components/form/resume/lib/resume.store";
import ResumeEditor from "./resumeEditor/ResumeEditor";
type ResumeBuilderProps = {
  resume: ResumeData | null;
};
const ResumeBuilder = ({ resume }: ResumeBuilderProps) => {
  const setResume = useResumeStore((s) => s.setResume);

  useEffect(() => {
    if (!resume) return;
    setResume(resume);
  }, [resume, setResume]);

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <Flex
      bg="#F4F6F8"
      h="100%"
      minH="0"
      width="100%"
      justifyContent="space-between"
      overflow="hidden"
    >
      <ResumeEditor />
      <ResumeView />
      <ResumeSidebar />
    </Flex>
  );
};

export default ResumeBuilder;
