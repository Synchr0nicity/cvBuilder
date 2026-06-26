"use client";
import { Flex, Field, Input } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import DraggableHeader from "./DraggableHeader";
import { useForm, useWatch } from "react-hook-form";
import { PersonalInfo, personalInfoAtom } from "@/atoms/resumeAtoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import debounce from "lodash/debounce";
import { useParams } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { updatePersonalInfo } from "../../../actions";

const MotionFlex = motion(Flex);

const PersonalInfoField = () => {
  const params = useParams();
  const resumeId = params.id as string;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [personalInfo, setPersonalInfo] = useAtom(personalInfoAtom);
  const saveToastId = "personal-info-save";

  const {
    register,
    control,
    reset,
    formState: { isDirty },
  } = useForm<PersonalInfo>({
    defaultValues: personalInfo ?? {},
  });

  useEffect(() => {
    if (!personalInfo) return;

    reset(personalInfo, { keepDirty: false });
  }, [personalInfo, reset]);

  const watchedField = useWatch({ control });

  const debouncedSave = useMemo(
    () =>
      debounce(async (data: Partial<PersonalInfo>) => {
        try {
          toaster.create({
            id: saveToastId,
            title: "Saving",
            type: "loading",
          });

          await updatePersonalInfo(resumeId, data);

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
        }
      }, 800),
    [resumeId],
  );

  useEffect(() => {
    if (!isDirty) return;
    if (!watchedField) return;

    setPersonalInfo((prev) => ({
      ...prev,
      ...watchedField,
    }));

    debouncedSave(watchedField);
  }, [watchedField, setPersonalInfo, debouncedSave, isDirty]);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
      toaster.dismiss(saveToastId);
    };
  }, [debouncedSave]);

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
