"use client";
import { AppResume } from "@/types/resume";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ResumeCard = ({ resume }: { resume: AppResume }) => {
  const router = useRouter();

  return (
    <Flex
      p="20px"
      border="solid 1px lightBlue"
      borderRadius="8px"
      h="200px"
      w="150px"
      justifyContent="space-between"
      alignItems="center"
      flexDir="column"
      cursor="pointer"
      _hover={{ bg: "lightBlue", borderColor: "darkBlue" }}
      transition={"all .15s ease-in-out"}
      onClick={() => router.push(`/resume/${resume.id}`)}
    >
      <Flex alignItems="center" flexDir="column" gap="10px">
        <Text mb="0" fontSize="16px" fontWeight="700">
          {resume?.title ?? "Resume"}
        </Text>
        <Flex flexDir="column" alignItems="center">
          <Text mb="0" fontSize="14px">
            Template:
          </Text>
          <Text mb="0" fontSize="14px" fontStyle="italic">
            Regular
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        gap="2px"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="12px">Created at:</Text>
        <Text justifySelf="flex-end" fontSize="10px" fontWeight="700">
          {resume?.createdAt?.toLocaleDateString("en-GB")}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ResumeCard;
