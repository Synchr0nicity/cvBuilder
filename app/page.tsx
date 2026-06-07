import LandingPage from "@/components/layout/LandingPage";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex width="100vw" h="100vh" bg="white">
      <LandingPage />
    </Flex>
  );
}
