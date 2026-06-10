"use client";

import { Button, Flex } from "@chakra-ui/react";
import FormField from "./FormField";

import { createResume } from "@/components/layout/resume/resumeEditor/actions";

type ResumeEditorProps = {
  userId: string;
};

const ResumeEditor = ({ userId }: ResumeEditorProps) => {
  return (
    <Flex
      p="16px"
      height="100%"
      bg="#FFFFFF"
      flex={1}
      borderRight="solid 1px #E2E8F0"
      flexDir="column"
      gap="20px"
    >
      <FormField icon={"fa-user"} section={"Personal Details"} />
    </Flex>
  );
};

export default ResumeEditor;
