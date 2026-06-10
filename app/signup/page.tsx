"use client";
import { Box, Button, Field, Flex, Input, Text } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignupPage() {
  const [error, setError] = useState<{
    username?: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  }>({ username: null, email: null, password: null, confirmPassword: null });

  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({ password: false, confirmPassword: false });

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email"));
    const username = String(formData.get("username"));
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!email) {
      newErrors.email = "Please use a valid email";
    }

    if (!password || password.length < 13) {
      newErrors.password = !password
        ? "Please enter a password"
        : "Password must be at least 12 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
      setError(newErrors);
      return;
    }

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
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
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
            onClick={() => signIn("linkedin", { callbackUrl: "/dashboard" })}
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
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Field.Label>Email</Field.Label>
                {error.email && (
                  <Text mb="0" fontSize="12px" color="red">
                    {error.email}
                  </Text>
                )}
              </Flex>
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
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Field.Label>Password</Field.Label>
                {error.password && (
                  <Text mb="0" fontSize="12px" color="red">
                    {error.password}
                  </Text>
                )}
              </Flex>
              <InputGroup
                w="100%"
                startElement={<i className="fa-solid fa-lock" />}
                endElement={
                  <Box
                    _hover={{ color: "lightBlue" }}
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                    cursor="pointer"
                  >
                    <i className="fa-solid fa-eye" />
                  </Box>
                }
              >
                <Input
                  w="100%"
                  color="black"
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Type your password"
                />
              </InputGroup>
            </Field.Root>

            <Field.Root w="100%">
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Field.Label width="100%" textWrap="none">
                  Confirm Password
                </Field.Label>
                {error.confirmPassword && (
                  <Text mb="0" fontSize="12px" color="red">
                    {error.confirmPassword}
                  </Text>
                )}
              </Flex>
              <InputGroup
                w="100%"
                startElement={<i className="fa-solid fa-lock" />}
                endElement={
                  <Box
                    _hover={{ color: "lightBlue" }}
                    cursor="pointer"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                  >
                    <i className="fa-solid fa-eye" />
                  </Box>
                }
              >
                <Input
                  w="100%"
                  color="black"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Retype your password"
                  autoComplete="confirm-password"
                />
              </InputGroup>
            </Field.Root>
            {error.confirmPassword === "Passwords do not match" && (
              <Text textAlign="right" mb="0" fontSize="12px" color="red">
                {error.confirmPassword}
              </Text>
            )}
          </Flex>
          <Flex justifyContent="flex-end" width="100%" mt="20px">
            <Button type="submit">Sign Up</Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}
