"use client";

import { Text, Stack } from "@chakra-ui/react";
import PersonalInfo from "./components/PersonalInfo";
import { useResumeStore } from "@/components/lib/resume.store";

const ResumeView = () => {
  const summary = useResumeStore((s) => s.resume)?.summary;
  console.log("summary", summary);
  return (
    <Stack
      height="100%"
      width="816px"
      minHeight="1056px"
      flex={2}
      p="48px"
      bg="#fff"
      boxShadow="0px 10px 40px -10px rgba(0, 0, 0, 0.1)"
    >
      <PersonalInfo />
      <Text>
        {summary && summary?.length > 0
          ? summary
          : "This is a summary about a hireable individual."}
      </Text>
    </Stack>
  );
};

export default ResumeView;
