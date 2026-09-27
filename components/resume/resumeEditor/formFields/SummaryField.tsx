"use client";
import { Field, Flex, Textarea } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import DraggableHeader from "./DraggableHeader";
import { motion } from "framer-motion";

import { debounce } from "lodash";
import { useParams } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { useResumeStore } from "@/components/lib/resume.store";

const MotionFlex = motion(Flex);

const SummaryField = () => {
  const params = useParams();
  const resumeId = params.id as string;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const saveToastId = "summary-save";
  const setSummary = useResumeStore((s) => s.setSummary);
  const summary = useResumeStore((s) => s.resume)?.summary ?? "";

  // const debouncedSave = useMemo(
  //   () =>
  //     debounce(async (data: string) => {
  //       try {
  //         toaster.create({
  //           id: saveToastId,
  //           title: "Saving",
  //           type: "loading",
  //         });

  //         await updateResumeData(resumeId, {
  //           summary: data as string,
  //         });

  //         toaster.update(saveToastId, {
  //           title: "Saved",
  //           type: "success",
  //         });
  //       } catch (error) {
  //         toaster.create({
  //           title: "Failed to save",
  //           description:
  //             error instanceof Error ? error.message : "Something went wrong",
  //           type: "error",
  //         });
  //       }
  //     }, 800),
  //   [resumeId],
  // );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setSummary(value);
    // debouncedSave(value);
  };

  return (
    <Flex
      className="formField-container"
      // borderBottom="solid 1px #E2E8F0"
      w="100%"
      flexDir="column"
      border="solid 1px #E2E8F0"
      borderRadius="12px"
    >
      <DraggableHeader
        setIsCollapsed={setIsCollapsed}
        isCollapsed={isCollapsed}
        icon="fa-solid fa-align-left"
        section="Summary"
      />
      <MotionFlex
        flexDir="column"
        gap="16px"
        initial={false}
        animate={{
          height: isCollapsed ? 0 : "auto",
          opacity: isCollapsed ? 0 : 1,
          padding: isCollapsed ? 0 : "16px",
        }}
        transition={{
          duration: 0.085,
        }}
        overflow="hidden"
      >
        <Field.Root width="100%">
          <Flex width="100%" alignItems="center" justifyContent="space-between">
            {/* {error.password && (
                                  <Text mb="0" fontSize="12px" color="red">
                                    {error.password}
                                  </Text>
                                )} */}
          </Flex>

          <Textarea
            bg="
                    #F4F6F8"
            border="solid 1px #E2E8F0"
            borderRadius="8px"
            width="100%"
            color="black"
            name="firstName"
            placeholder="Award-winning product designer with 8+ 
years of experience creating intuitive, user-
centric digital experiences. Proven track 
record of leading design teams and 
increasing user engagement by 40% across 
SaaS platforms."
            minHeight="107px"
            value={summary}
            onChange={handleChange}
          />
        </Field.Root>
      </MotionFlex>
    </Flex>
  );
};

export default SummaryField;
