"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const { status } = useSession();

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
        onClick={() => router.push("/dashboard")}
        mb="0"
        fontSize="24px"
        fontWeight="700"
        color="black"
      >
        CVBUILDER
      </Text>
      {status === "unauthenticated" ? (
        <Button
          bg="lightblue"
          color="black"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      ) : (
        <Button
          bg="lightblue"
          color="black"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </Button>
      )}
    </Flex>
  );
};

export default NavBar;
