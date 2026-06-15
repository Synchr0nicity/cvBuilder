"use client";

import { Flex } from "@chakra-ui/react";
import ResumeView from "./ResumeView";
import ResumeSidebar from "./ResumeSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppResume } from "@/types/resume";
import { useSetAtom } from "jotai";
import { resumeAtom } from "@/atoms/resumeAtoms";
import PersonalInfoField from "./resumeEditor/formFields/PersonalInfoField";
import SummaryField from "./resumeEditor/formFields/SummaryField";
import WorkExperienceField from "./resumeEditor/formFields/workExperience/WorkExperienceField";
type ResumeBuilderProps = {
  resume: AppResume | null;
};
const ResumeBuilder = ({ resume }: ResumeBuilderProps) => {
  const setResume = useSetAtom(resumeAtom);

  useEffect(() => {
    setResume(resume);
  }, [resume, setResume]);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <Flex
      bg="#F4F6F8"
      h="100%"
      minH="0"
      width="100%"
      justifyContent="space-between"
      overflow="hidden"
    >
      <Flex
        className="resume-builder-editor"
        minH="0"
        overflowY="auto"
        p="16px"
        height="100%"
        bg="#FFFFFF"
        flex={1}
        borderRight="solid 1px #E2E8F0"
        flexDir="column"
        gap="20px"
      >
        <PersonalInfoField />
        <SummaryField />
        <WorkExperienceField />
      </Flex>
      <ResumeView />
      <ResumeSidebar />
    </Flex>
  );
};

export default ResumeBuilder;
