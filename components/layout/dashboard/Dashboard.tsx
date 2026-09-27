"use client";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { createResume } from "../../lib/actions";
import ResumeCard from "./ResumeCard";
import { ResumeData } from "@/types/resume";

const Dashboard = ({ resumes }: { resumes: ResumeData[] }) => {
  return (
    <Flex width="100%" height="100%" mt="100px" justifyContent="center">
      <Flex flexDir="column" gap="24px" alignItems="center">
        <Heading>My Resumes</Heading>
        <Button
          onClick={() =>
            createResume({
              title: "Testio",
              workExperience: [],
              personalInfo: {
                firstName: "Dominic",
                lastName: "Abbott",
                phone: "6034569789",
              },
              summary: "I am a hard working bastard",
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
