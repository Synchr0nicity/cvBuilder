"use client";

import { Flex } from "@chakra-ui/react";
import PersonalInfo from "./components/PersonalInfo";

const ResumeView = () => {
  return (
    <Flex
      height="100%"
      width="816px"
      minHeight="1056px"
      flex={2}
      p="48px"
      bg="#fff"
      boxShadow="0px 10px 40px -10px rgba(0, 0, 0, 0.1)"
      justifyContent="space-between"
    >
      <PersonalInfo />
    </Flex>
  );
};

export default ResumeView;
