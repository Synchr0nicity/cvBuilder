import ResumeCard from "@/components/layout/dashboard/ResumeCard";
import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <Flex width="100%" height="100%" mt="100px" justifyContent="center">
      <Flex flexDir="column" gap="24px" alignItems="center">
        <Heading>My Resumes</Heading>
        <Flex width="100%" gap="10px">
          <ResumeCard />
          <ResumeCard />
          <ResumeCard />
          <ResumeCard />
          <ResumeCard />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default page;
