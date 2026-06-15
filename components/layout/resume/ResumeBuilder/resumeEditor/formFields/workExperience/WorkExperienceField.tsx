"use client";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import DraggableHeader from "../DraggableHeader";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const WorkExperienceField = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      ></MotionFlex>
    </Flex>
  );
};

export default WorkExperienceField;
