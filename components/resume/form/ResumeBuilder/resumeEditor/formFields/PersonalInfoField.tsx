"use client";
import { Flex, Field, Input, Button } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import DraggableHeader from "./DraggableHeader";
import { useForm, useWatch } from "react-hook-form";
import debounce from "lodash/debounce";
import { useParams } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { PersonalInfo, personalInfoSchema } from "../../../lib/resume";
import { useResumeStore } from "@/components/lib/resume.store";
import { updatePersonalInfo } from "../../../lib/actions";

const MotionFlex = motion(Flex);

const PersonalInfoField = () => {
  const params = useParams();
  const resumeId = params.id as string;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const saveToastId = "personal-info-save";
  const resume = useResumeStore((s) => s.resume);
  const setPersonalInfo = useResumeStore((s) => s.setPersonalInfo);

  const personalInfo = useMemo(() => resume?.personalInfo, [resume]);

  const {
    register,
    reset,
    control,
    formState: { isDirty },
  } = useForm<PersonalInfo>({
    // resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: personalInfo?.firstName ?? "",
      lastName: personalInfo?.lastName ?? "",
      phone: personalInfo?.phone ?? "",
      email: personalInfo?.email ?? "",
      profession: personalInfo?.profession ?? "",
    },
  });

  useEffect(() => {
    if (personalInfo) {
      reset({
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        phone: personalInfo.phone,
        email: personalInfo.email,
        profession: personalInfo.profession,
      });
    }
  }, [personalInfo, reset]);

  // useEffect(() => {
  //   if (!personalInfo) return;

  //   reset(personalInfo, { keepDirty: false });
  // }, [personalInfo, reset]);

  // const onSubmit = async (data: PersonalInfo) => {
  //   await updatePersonalInfo(resume?.id ?? "", data);
  //   console.log("personal info data being submitted", data);
  // };

  const watchedField = useWatch({ control });

  const debouncedSave = useMemo(
    () =>
      debounce(async (data: PersonalInfo) => {
        const currentPersonalInfo = personalInfo;
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
          setPersonalInfo({
            firstName: currentPersonalInfo?.firstName ?? "",
            lastName: currentPersonalInfo?.lastName,
            phone: currentPersonalInfo?.phone,
            email: currentPersonalInfo?.email,
            profession: currentPersonalInfo?.profession,
          });
        }
      }, 800),
    [personalInfo, resumeId, setPersonalInfo],
  );

  useEffect(() => {
    if (!isDirty) return;
    if (!watchedField) return;

    const result = personalInfoSchema.safeParse(watchedField);

    if (!result.success) return;

    // const newData = {
    //   ...watchedField,
    //   firstName: watchedField.firstName ?? "",
    // };

    setPersonalInfo({ ...result.data });

    debouncedSave(result.data);
  }, [watchedField, setPersonalInfo, debouncedSave, isDirty]);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
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
          <Flex width="100%" alignItems="center" justifyContent="space-between">
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
      {/* <Button type="submit">SUBMIT</Button>
      </form> */}
    </Flex>
  );
};

export default PersonalInfoField;
