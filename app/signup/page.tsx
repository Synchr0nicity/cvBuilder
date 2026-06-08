"use client";
import { Box, Button, Field, Flex, Input, Text } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignupPage() {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email"));
    const username = String(formData.get("username"));
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        confirmPassword,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  }
  if (error) {
    console.log(
      "the error object returned in case of error during sign up",
      error,
    );
  }

  return (
    <Flex minH="calc(100vh - 61px)" w="100%" justifyContent="center" mt="100px">
      <Flex flexDir="column" gap="20px" w="250px">
        <Flex flexDir="column" gap="16px" w="100%">
          <Button
            w="100%"
            border="solid 1px gray"
            color="black"
            bg="transparent"
            _hover={{ bg: "gray", color: "white" }}
          >
            <i className="fa-brands fa-google" />
            Sign up with Google
          </Button>

          <Button
            w="100%"
            border="solid 1px gray"
            color="black"
            bg="transparent"
            _hover={{ bg: "gray", color: "white" }}
          >
            <i className="fa-brands fa-linkedin" />
            Sign up with Linkedin
          </Button>
        </Flex>

        <Flex w="100%" alignItems="center" gap="8px">
          <Box flex={1} h="1px" bg="gray" />
          <Text whiteSpace="nowrap">Or Sign up with Email</Text>
          <Box flex={1} h="1px" bg="gray" />
        </Flex>
        <form onSubmit={handleSubmit}>
          <Flex flexDir="column" gap="16px" w="100%">
            <Field.Root w="100%">
              <Field.Label>Username</Field.Label>
              <InputGroup
                w="100%"
                startElement={<i className="fa-regular fa-user" />}
              >
                <Input
                  autoComplete="off"
                  w="100%"
                  type="username"
                  name="username"
                  placeholder="bobsBurgers69"
                />
              </InputGroup>
            </Field.Root>
            <Field.Root w="100%">
              <Field.Label>Email</Field.Label>
              <InputGroup
                w="100%"
                startElement={<i className="fa-regular fa-envelope" />}
              >
                <Input
                  w="100%"
                  autoComplete="email"
                  type="email"
                  name="email"
                  placeholder="bobsBurgers69@gmail.com"
                />
              </InputGroup>
            </Field.Root>

            <Field.Root w="100%">
              <Field.Label>Password</Field.Label>
              <InputGroup
                w="100%"
                startElement={<i className="fa-solid fa-lock" />}
                endElement={
                  <Box _hover={{ color: "lightBlue" }} cursor="pointer">
                    <i className="fa-solid fa-eye" />
                  </Box>
                }
              >
                <Input
                  w="100%"
                  color="black"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Type your password"
                />
              </InputGroup>
            </Field.Root>

            <Field.Root w="100%">
              <Field.Label>Confirm Password</Field.Label>
              <InputGroup
                w="100%"
                startElement={<i className="fa-solid fa-lock" />}
                endElement={
                  <Box _hover={{ color: "lightBlue" }} cursor="pointer">
                    <i className="fa-solid fa-eye" />
                  </Box>
                }
              >
                <Input
                  w="100%"
                  color="black"
                  type="password"
                  name="confirmPassword"
                  placeholder="Retype your password"
                  autoComplete="confirm-password"
                />
              </InputGroup>
            </Field.Root>
          </Flex>
          <Flex justifyContent="flex-end" width="100%" mt="20px">
            <Button type="submit">Sign Up</Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}
