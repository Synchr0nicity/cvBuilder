import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";

const DraggableHeader = ({
  isCollapsed,
  setIsCollapsed,
  section,
  icon,
}: {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  section: string;
  icon: string;
}) => {
  return (
    <Flex
      p="12px"
      w="100%"
      justifyContent="space-between"
      borderBottom={isCollapsed ? "none" : "solid 1px #E2E8F0"}
      bg="#F4F6F880"
      alignItems="flex-start"
    >
      <Flex
        width="100%"
        gap="8px"
        alignItems="center"
        //   justifyContent="center"
      >
        <Box color="#E2E8F0">
          <i className="fa-solid fa-grip-vertical"></i>
        </Box>
        <Box color="#4F46E5B2">
          <i className={`fa-solid ${icon}`}></i>
        </Box>
        <Text mb="0" fontSize="14px" fontWeight="600">
          {section}
        </Text>
      </Flex>
      <Box
        color="#64748B"
        p="0"
        m="0"
        onClick={() => setIsCollapsed((prev) => !prev)}
        cursor="pointer"
        transition="transform .15s ease-in-out"
        transform={isCollapsed ? "rotate(180deg)" : "rotate(0deg"}
      >
        <i className="fa-solid fa-chevron-up fa-xs"></i>
      </Box>
    </Flex>
  );
};

export default DraggableHeader;
