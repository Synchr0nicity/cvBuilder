import { Flex, Box, ButtonGroup, Text } from "@chakra-ui/react";
import React from "react";

type FormFieldProps = {
  icon: string;
  section: string;
};

const FormField = ({ icon, section }: FormFieldProps) => {
  return (
    <Flex
      className="formField-container"
      border="solid 1px #E2E8F0"
      borderRadius="12px"
      w="100%"
      flexDir="column"
    >
      <Flex
        p="12px"
        w="100%"
        justifyContent="space-between"
        borderBottom="solid 1px #E2E8F0"
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
        <Box color="#64748B" p="0" m="0">
          <i className="fa-solid fa-chevron-up fa-xs"></i>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FormField;
