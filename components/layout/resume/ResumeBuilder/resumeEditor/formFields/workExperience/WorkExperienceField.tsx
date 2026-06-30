"use client";
import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import DraggableHeader from "../DraggableHeader";
import { motion } from "framer-motion";
import { resumeAtom, workExperiencesAtom } from "@/atoms/resumeAtoms";
import { v4 as uuid } from "uuid";
import { useAtom } from "jotai";
import ExperienceBox from "./ExperienceBox";
import ExperienceForm from "./ExperienceForm";
import { Experience } from "@/types/resume";
import { toaster } from "@/components/ui/toaster";
import { updateResumeData } from "@/components/layout/resume/actions";
import { useParams } from "next/navigation";

const MotionFlex = motion(Flex);

const WorkExperienceField = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [workExperience, setWorkExperience] = useAtom(workExperiencesAtom);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const resume = useAtom(resumeAtom);
  const params = useParams();
  const resumeId = params.id as string;
  const [trigger, setTrigger] = useState<boolean>(false);
  const saveToastId = "experience-save";

  const handleSubmit = async (d: Experience) => {
    if (d.jobTitle?.length === 0) {
      console.error("Job title needed");
      setTrigger(false);
      return;
    }
    try {
      toaster.create({
        id: saveToastId,
        title: "Saving",
        type: "loading",
      });

      const dataWithId = { ...d, id: uuid() };

      await updateResumeData(resumeId, {
        workExperience: [...workExperience, dataWithId],
      });

      toaster.update(saveToastId, {
        title: "Saved",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Failed to save",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        type: "error",
      });
      console.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }

    setIsCreating(false);
    setTrigger(false);
  };

  return (
    <Flex
      className="formField-container"
      w="100%"
      flexDir="column"
      border="solid 1px #E2E8F0"
      borderRadius="12px"
    >
      <DraggableHeader
        setIsCollapsed={setIsCollapsed}
        isCollapsed={isCollapsed}
        icon="fa-solid fa-briefcase"
        section="Work Experience"
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
        {isCreating && (
          <ExperienceForm trigger={trigger} onSubmit={handleSubmit} />
        )}
        <ExperienceBox experience={undefined} />

        <Flex alignItems="center" width="100%" gap="8px">
          <Button
            bg="
                    #F4F6F84D"
            border="solid 1px #E2E8F0"
            borderRadius="8px"
            flex={1}
            color="#64748B"
            fontWeight="500"
            _hover={{ bg: "#F4F6F8" }}
            onClick={() => {
              setIsCreating((prev) => !prev);
            }}
          >
            <Flex alignItems="center" justifyContent="center" gap="8px">
              <i className={`fa-solid fa-${isCreating ? "trash" : "plus"}`}></i>{" "}
              {isCreating ? "Cancel" : "Add Experience"}
            </Flex>
          </Button>
          {isCreating && (
            <Button
              bg="
                    #329f26"
              border="solid 1px #E2E8F0"
              borderRadius="8px"
              flex={1}
              color="white"
              fontWeight="500"
              _hover={{ bg: "#25721b" }}
              onClick={() => {
                setTrigger((prev) => !prev);
              }}
            >
              <Flex alignItems="center" justifyContent="center" gap="8px">
                Save
              </Flex>
            </Button>
          )}
        </Flex>
      </MotionFlex>
    </Flex>
  );
};

export default WorkExperienceField;
