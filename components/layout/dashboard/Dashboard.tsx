"use client";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { createResume } from "../resume/actions";
import ResumeCard from "./ResumeCard";
import { AppResume } from "@/types/resume";

const Dashboard = ({ resumes }: { resumes: AppResume[] }) => {
  return (
    <Flex width="100%" height="100%" mt="100px" justifyContent="center">
      <Flex flexDir="column" gap="24px" alignItems="center">
        <Heading>My Resumes</Heading>
        <Button
          onClick={() =>
            createResume({
              title: "Testio",
              resumeData: "stuff",
              style: null,
            })
          }
        >
          Create Resume
        </Button>
        <Flex width="100%" gap="10px">
          {resumes.map((resume) => {
            return <ResumeCard key={resume.id} resume={resume} />;
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
