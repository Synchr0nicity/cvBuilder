"use client";
import { Flex, Field, Input } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import DraggableHeader from "./DraggableHeader";
import { useForm, useWatch } from "react-hook-form";
import { PersonalInfo, personalInfoAtom } from "@/atoms/resumeAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import debounce from "lodash/debounce";

const MotionFlex = motion(Flex);

const PersonalInfoField = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const personalInfo = useAtomValue(personalInfoAtom);
  const setPersonalInfo = useSetAtom(personalInfoAtom);

  const { register, control } = useForm<PersonalInfo>({
    defaultValues: personalInfo,
  });

  const watchedField = useWatch({ control });

  const debouncedSetField = useMemo(
    () =>
      debounce((data: PersonalInfo) => {
        setPersonalInfo(data);
      }, 300),
    [setPersonalInfo],
  );

  useEffect(() => {
    if (!watchedField) return;

    debouncedSetField(watchedField as PersonalInfo);

    return () => {
      debouncedSetField.cancel();
    };
  }, [watchedField, debouncedSetField]);

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
        icon="fa-user"
        section="Personal Info"
      />
      <form>
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
          <Flex alignItems="center" gap="16px">
            <Field.Root width="100%">
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Field.Label fontSize="11px" fontWeight="500" color="#64748B">
                  First Name
                </Field.Label>
                {/* {error.password && (
                          <Text mb="0" fontSize="12px" color="red">
                            {error.password}
                          </Text>
                        )} */}
              </Flex>

              <Input
                {...register("firstName")}
                bg="
            #F4F6F8"
                border="solid 1px #E2E8F0"
                borderRadius="8px"
                width="100%"
                color="black"
                type={"text"}
                placeholder="Alex"
              />
            </Field.Root>
            <Field.Root width="100%">
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Field.Label fontSize="11px" fontWeight="500" color="#64748B">
                  Last Name
                </Field.Label>
                {/* {error.password && (
                          <Text mb="0" fontSize="12px" color="red">
                            {error.password}
                          </Text>
                        )} */}
              </Flex>

              <Input
                {...register("lastName")}
                bg="
            #F4F6F8"
                border="solid 1px #E2E8F0"
                borderRadius="8px"
                width="100%"
                color="black"
                type={"text"}
                placeholder="Morgan"
              />
            </Field.Root>
          </Flex>
          <Field.Root width="100%">
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Field.Label fontSize="11px" fontWeight="500" color="#64748B">
                Professional Title
              </Field.Label>
              {/* {error.password && (
                          <Text mb="0" fontSize="12px" color="red">
                            {error.password}
                          </Text>
                        )} */}
            </Flex>

            <Input
              {...register("profession")}
              bg="
            #F4F6F8"
              border="solid 1px #E2E8F0"
              borderRadius="8px"
              width="100%"
              color="black"
              type={"text"}
              placeholder="Senior Product Designer"
            />
          </Field.Root>
          <Flex alignItems="center" gap="16px">
            <Field.Root width="100%">
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Field.Label fontSize="11px" fontWeight="500" color="#64748B">
                  Email
                </Field.Label>
                {/* {error.password && (
                          <Text mb="0" fontSize="12px" color="red">
                            {error.password}
                          </Text>
                        )} */}
              </Flex>

              <Input
                {...register("email")}
                bg="
            #F4F6F8"
                border="solid 1px #E2E8F0"
                borderRadius="8px"
                width="100%"
                color="black"
                type={"text"}
                placeholder="alexdesigns@gmail.com"
              />
            </Field.Root>
            <Field.Root width="100%">
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Field.Label fontSize="11px" fontWeight="500" color="#64748B">
                  Phone
                </Field.Label>
                {/* {error.password && (
                          <Text mb="0" fontSize="12px" color="red">
                            {error.password}
                          </Text>
                        )} */}
              </Flex>

              <Input
                {...register("phone")}
                bg="
            #F4F6F8"
                border="solid 1px #E2E8F0"
                borderRadius="8px"
                width="100%"
                color="black"
                type={"tel"}
                placeholder="+1 (555) 123-4567"
              />
            </Field.Root>
          </Flex>
        </MotionFlex>
      </form>
    </Flex>
  );
};

export default PersonalInfoField;
