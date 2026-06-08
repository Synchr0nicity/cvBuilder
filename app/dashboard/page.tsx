"use client";
import ResumeCard from "@/components/layout/dashboard/ResumeCard";
import { Flex, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") return null;
  if (!session) return null;

  return (
    <Flex width="100%" height="100%" mt="100px" justifyContent="center">
      <Flex flexDir="column" gap="24px" alignItems="center">
        <Heading>My Resumes</Heading>
        <Flex width="100%" gap="10px">
          <ResumeCard />
          <ResumeCard />
          <ResumeCard />
          <ResumeCard />
          <ResumeCard />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardPage;
