"use client";
import { Box, Button, Field, Flex, Input, Text } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { errorToJSON } from "next/dist/server/render";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<{
    email: string | null;
    password: string | null;
    backendError: string | null;
  }>({ email: null, password: null, backendError: null });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "")
      .toLowerCase()
      .trim();
    const password = String(formData.get("password") ?? "");
    const newErrors = {
      email: "",
      password: "",
      backendError: "",
    };

    if (!email) {
      newErrors.email = "Please enter your email.";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    }

    if (newErrors.email || newErrors.password) {
      setError(newErrors);
      setIsLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError((prev) => ({
        ...prev,
        backendError: "Invalid email or password.",
      }));
      return;
    }

    window.location.href = "/dashboard";
  }

  if (error) {
    console.log("login error:", error);
  }
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
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
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
            onClick={() => signIn("linkedin", { callbackUrl: "/dashboard" })}
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
        <form onSubmit={handleSubmit}>
          {error.backendError && (
            <Text mb="0" fontSize="16px" color="red">
              {error.backendError}
            </Text>
          )}
          <Flex flexDir="column" gap="16px" width="100%">
            <Field.Root width="100%">
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
                width="100%"
                startElement={<i className="fa-solid fa-lock"></i>}
                endElement={
                  <Box
                    cursor="pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                    _hover={{ color: "lightBlue" }}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </Box>
                }
              >
                <Input
                  width="100%"
                  color="black"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Type your password"
                />
              </InputGroup>
            </Field.Root>
          </Flex>
          <Button
            mt="20px"
            type="submit"
            border="solid 1px gray"
            minWidth="250px"
            color="black"
            bg="lightBlue"
            _hover={{ bg: "gray", color: "white" }}
          >
            Login
          </Button>
        </form>
        <Flex justifyContent="flex-end">
          <Text
            mb="0"
            fontSize="14px"
            color="purple"
            cursor="pointer"
            onClick={() => router.push("/signup")}
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
