import { Flex } from "@chakra-ui/react";
import PersonalInfoField from "./formFields/PersonalInfoField";
import SummaryField from "./formFields/SummaryField";
import WorkExperienceField from "./formFields/workExperience/WorkExperienceField";

const ResumeEditor = () => {
  return (
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
  );
};

export default ResumeEditor;
