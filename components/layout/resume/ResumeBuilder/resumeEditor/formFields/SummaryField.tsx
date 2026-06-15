"use client";
import { Field, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import DraggableHeader from "./DraggableHeader";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const PersonalInfoField = () => {
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
          />
        </Field.Root>
      </MotionFlex>
    </Flex>
  );
};

export default PersonalInfoField;
