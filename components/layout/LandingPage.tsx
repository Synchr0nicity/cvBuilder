import { Flex, Heading } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Flex w="100%" h="100%" justifyContent="center" mt="100px">
      <Flex>
        <Heading letterSpacing={"1.5px"}>Welcome to CVBUILDER!</Heading>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
