"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  return (
    <Flex
      px="20px"
      py="10px"
      w="100vw"
      alignItems="center"
      position="fixed"
      justifyContent="space-between"
      borderBottom="solid 1px grey"
      bg="white"
    >
      <Text
        cursor="pointer"
        onClick={() => router.push("/")}
        mb="0"
        fontSize="24px"
        fontWeight="700"
        color="black"
      >
        CVBUILDER
      </Text>
      <Button
        bg="lightblue"
        color="black"
        onClick={() => router.push("/login")}
      >
        Login
      </Button>
    </Flex>
  );
};

export default NavBar;
