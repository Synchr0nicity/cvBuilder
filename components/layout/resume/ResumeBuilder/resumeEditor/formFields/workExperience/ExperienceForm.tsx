"use client";
import { WorkExperience } from "@/atoms/resumeAtoms";
import { Experience } from "@/types/resume";
import { Field, Flex, Input, NumberInput } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

const ExperienceForm = ({
  trigger,
  onSubmit,
}: {
  trigger: boolean;
  onSubmit: (d: Experience) => void;
}) => {
  const {
    control,
    register,
    formState: { isDirty },
    handleSubmit,
  } = useForm<Experience>({
    defaultValues: {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      location: "",
    },
  });

  const watchedField = useWatch({ control });

  useEffect(() => {
    if (!isDirty || !watchedField || !trigger) {
      return;
    }

    handleSubmit(onSubmit)();
  }, [trigger, handleSubmit, onSubmit, isDirty, watchedField]);

  return (
    <form>
      <Flex alignItems="center" gap="16px">
        <Field.Root width="100%">
          <Flex width="100%" alignItems="center" justifyContent="space-between">
            <Field.Label fontSize="11px" fontWeight="500" color="#64748B">
              Job Title
            </Field.Label>
            {/* {error.password && (
                              <Text mb="0" fontSize="12px" color="red">
                                {error.password}
                              </Text>
                            )} */}
          </Flex>

          <Input
            {...register("jobTitle")}
            bg="
                #F4F6F8"
            border="solid 1px #E2E8F0"
            borderRadius="8px"
            width="100%"
            color="black"
            type={"text"}
            placeholder="Lead UI/UX Designer"
          />
        </Field.Root>
        <Field.Root width="100%">
          <Flex width="100%" alignItems="center" justifyContent="space-between">
            <Field.Label fontSize="11px" fontWeight="500" color="#64748B">
              Company
            </Field.Label>
            {/* {error.password && (
                              <Text mb="0" fontSize="12px" color="red">
                                {error.password}
                              </Text>
                            )} */}
          </Flex>

          <Input
            {...register("company")}
            bg="
                #F4F6F8"
            border="solid 1px #E2E8F0"
            borderRadius="8px"
            width="100%"
            color="black"
            type={"text"}
            placeholder="TechCorp Solutions"
          />
        </Field.Root>
      </Flex>
      <Field.Root width="100%">
        <Flex width="100%" alignItems="center" justifyContent="space-between">
          <Field.Label fontSize="11px" fontWeight="500" color="#64748B">
            Location
          </Field.Label>
          {/* {error.password && (
                              <Text mb="0" fontSize="12px" color="red">
                                {error.password}
                              </Text>
                            )} */}
        </Flex>

        <Input
          {...register("location")}
          bg="
                #F4F6F8"
          border="solid 1px #E2E8F0"
          borderRadius="8px"
          width="100%"
          color="black"
          type={"text"}
          placeholder="San Francisco, CA"
        />
      </Field.Root>
      <Flex alignItems="center" gap="16px">
        <Field.Root width="100%">
          <Flex width="100%" alignItems="center" justifyContent="space-between">
            <Field.Label fontSize="11px" fontWeight="500" color="#64748B">
              Start Date
            </Field.Label>
            {/* {error.password && (
                              <Text mb="0" fontSize="12px" color="red">
                                {error.password}
                              </Text>
                            )} */}
          </Flex>

          <Input
            type="text"
            {...register("startDate")}
            bg="#F4F6F8"
            border="solid 1px #E2E8F0"
            borderRadius="8px"
            width="100%"
            color="black"
            placeholder="Jan 2021"
          />
        </Field.Root>
        <Field.Root width="100%">
          <Flex width="100%" alignItems="center" justifyContent="space-between">
            <Field.Label fontSize="11px" fontWeight="500" color="#64748B">
              End Date
            </Field.Label>
            {/* {error.password && (
                              <Text mb="0" fontSize="12px" color="red">
                                {error.password}
                              </Text>
                            )} */}
          </Flex>

          <Input
            {...register("endDate")}
            bg="
                #F4F6F8"
            border="solid 1px #E2E8F0"
            borderRadius="8px"
            width="100%"
            color="black"
            type={"text"}
            placeholder="Present"
          />
        </Field.Root>
      </Flex>
    </form>
  );
};

export default ExperienceForm;
