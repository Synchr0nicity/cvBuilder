import { Experience } from "@/types/resume";
import { Flex, Heading, Text } from "@chakra-ui/react";

const ExperienceBox = ({
  experience,
}: {
  experience: Experience | undefined;
}) => {
  return (
    <Flex
      bg="
                    #F4F6F84D"
      border="solid 1px #E2E8F0"
      borderRadius="8px"
      width="100%"
      color="black"
      flexDir="column"
      gap="4px"
      p="12px"
    >
      <Heading
        fontWeight="600"
        fontSize="14px"
        lineHeight="20px"
        color="#0F172A"
      >
        {experience?.jobTitle ?? "Lead UI/UX Designer"}
      </Heading>
      <Text mb="0" color="#64748B" fontSize="12px">
        {experience?.company ?? "TechCorp Solutions"} &#x2022;
        {experience?.location ?? "San Francisco, CA"}
      </Text>
      <Text mb="0" color="#64748BB2" fontSize="10px" fontWeight="500">
        {experience?.startDate ?? "Jan 2021"} -{" "}
        {experience?.endDate ?? "Present"}
      </Text>
    </Flex>
  );
};

export default ExperienceBox;
