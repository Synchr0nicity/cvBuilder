import { Flex, Text } from "@chakra-ui/react";

const ResumeCard = () => {
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
    >
      <Flex alignItems="center" flexDir="column" gap="10px">
        <Text mb="0" fontSize="16px" fontWeight="700">
          Resume Title
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
          10:01pm, May 6th
        </Text>
      </Flex>
    </Flex>
  );
};

export default ResumeCard;
