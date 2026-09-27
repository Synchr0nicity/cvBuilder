"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import ResumeView from "../../../resume/view/ResumeView";
import ResumeSidebar from "../../../resume/sidebar/ResumeSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/components/lib/resume.store";
import ResumeEditor from "../../resumeEditor/ResumeEditor";
type ResumeBuilderProps = {
  resume: ResumeData | null;
};
const ResumeBuilder = ({ resume }: ResumeBuilderProps) => {
  const setResume = useResumeStore((s) => s.setResume);
  const autoSaveStatus = useResumeStore((s) => s.autoSaveStatus);

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
      position="relative"
    >
      <ResumeEditor />
      <ResumeView />
      <ResumeSidebar />

      {autoSaveStatus && (
        <>
          <Flex
            position="absolute"
            bottom="8px"
            right="8px"
            width={autoSaveStatus === "success" ? "75px" : "150px"}
            height="50px"
            bg={autoSaveStatus === "success" ? "green" : "red"}
            opacity=".2"
            zIndex={0}
            borderRadius="8px"
          ></Flex>
          <Flex
            color={autoSaveStatus === "success" ? "green" : "red"}
            bottom="20px"
            right={autoSaveStatus === "success" ? "12px" : "20px"}
            zIndex={1}
            position="absolute"
            alignItems="center"
            gap="4px"
          >
            <Text>
              {autoSaveStatus === "success" ? "Saved" : "Failed to save"}
            </Text>
            <i className="fa-regular fa-face-frown"></i>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ResumeBuilder;
