"use client";

import { useResumeStore } from "@/components/form/resume/lib/resume.store";
import { Flex, Heading, Text } from "@chakra-ui/react";

const ResumeView = () => {
  const resume = useResumeStore((s) => s.resume);
  const personalInfo = resume?.personalInfo;

  return (
    <Flex height="100%" flex={2} p="48px">
      <Flex
        flexDirection="column"
        bg="#fff"
        width="816px"
        minHeight="1056px"
        p="48px"
        boxShadow="0px 10px 40px -10px rgba(0, 0, 0, 0.1)"
      >
        <Heading>
          {personalInfo?.firstName || "First Name"}{" "}
          {personalInfo?.lastName || "Last Name"}
        </Heading>
        <Text mb="0" color="#4F46E5">
          {personalInfo?.profession || "Profession"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ResumeView;
