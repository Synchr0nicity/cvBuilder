"use client";
import { Box, Button, Field, Flex, Input, Text } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  return (
    <Flex
      minH="calc(100vh - 61px)"
      width="100%"
      justifyContent="center"
      mt="100px"
      //   alignItems="center"
    >
      <Flex flexDir="column" gap="20px" w="250px">
        <Flex flexDir="column" gap="16px" w="100%">
          <Button
            border="solid 1px gray"
            minWidth="250px"
            color="black"
            bg="transparent"
            _hover={{ bg: "gray", color: "white" }}
          >
            <i className="fa-brands fa-google"></i>
            Login with Google
          </Button>
          <Button
            border="solid 1px gray"
            minWidth="250px"
            color="black"
            bg="transparent"
            _hover={{ bg: "gray", color: "white" }}
          >
            <i className="fa-brands fa-linkedin"></i>
            Login with Linkedin
          </Button>
        </Flex>
        <Flex width="100%" alignItems="center" gap="8px">
          <Box flex={1} h="1px" bg="gray" />
          <Text mb="0">Or Login with Email</Text>
          <Box flex={1} h="1px" bg="gray" />
        </Flex>
        <Flex flexDir="column" gap="16px" width="100%">
          <Field.Root width="100%">
            <Field.Label>Email</Field.Label>
            <InputGroup
              width="100%"
              startElement={<i className="fa-regular fa-envelope"></i>}
            >
              <Input
                width="100%"
                type="email"
                name="email"
                placeholder="bobsBurgers69@gmail.com"
              />
            </InputGroup>
          </Field.Root>
          <Field.Root width="100%">
            <Field.Label>Password</Field.Label>
            <InputGroup
              width="100%"
              startElement={<i className="fa-solid fa-lock"></i>}
              endElement={<i className="fa-solid fa-eye"></i>}
            >
              <Input
                width="100%"
                color="black"
                type="password"
                name="password"
                placeholder="Type your password"
              />
            </InputGroup>
          </Field.Root>
        </Flex>
        <Flex justifyContent="flex-end">
          <Text
            mb="0"
            fontSize="14px"
            color="purple"
            cursor="pointer"
            onClick={() => router.push("/signin")}
            _hover={{ color: "lightBlue" }}
          >
            or create an account
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
