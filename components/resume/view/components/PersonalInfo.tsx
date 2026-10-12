import { useResumeStore } from "@/components/lib/resume.store";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";

const PersonalInfo = () => {
  const resume = useResumeStore((s) => s.resume);
  const personalInfo = resume?.personalInfo;

  return (
    <Flex w="100%" justifyContent="space-between">
      <Flex flexDirection="column">
        <Heading>
          {personalInfo?.firstName || "First Name"}{" "}
          {personalInfo?.lastName || "Last Name"}
        </Heading>
        <Text mb="0" color="#4F46E5">
          {personalInfo?.profession || "Profession"}
        </Text>
      </Flex>
      <Stack>
        <Text>{personalInfo?.email}</Text>
        <Text>{personalInfo?.phone}</Text>
      </Stack>
    </Flex>
  );
};

export default PersonalInfo;
