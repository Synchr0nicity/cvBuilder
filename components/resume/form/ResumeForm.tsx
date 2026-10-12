import { Flex } from "@chakra-ui/react";
import PersonalInfoField from "./formFields/PersonalInfoField";
import SummaryField from "./formFields/SummaryField";
import WorkExperienceField from "./formFields/workExperience/WorkExperienceField";
import { useResumeStore } from "@/components/lib/resume.store";
import { FormProvider, useForm } from "react-hook-form";
import { Resume } from "@/components/lib/resume.z";
import { useEffect } from "react";
import { AutoSave } from "./components/AutoSave";

const ResumeEditor = () => {
  const resume = useResumeStore((s) => s.resume);

  const emptyResume: Resume = {
    title: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    summary: "",
    workExperiences: [],
  };

  const form = useForm<Resume>({
    defaultValues: resume ?? emptyResume,
    mode: "onChange",
  });

  const { reset } = form;

  useEffect(() => {
    if (resume) reset(resume);
  }, [resume, reset]);

  return (
    <FormProvider {...form}>
      <Flex
        className="resume-builder-editor"
        minH="0"
        overflowY="auto"
        p="16px"
        height="100%"
        bg="#FFFFFF"
        flex={1}
        borderRight="solid 1px #E2E8F0"
        flexDir="column"
        gap="20px"
      >
        <PersonalInfoField />
        <SummaryField />
        <WorkExperienceField />
        <AutoSave />
      </Flex>
    </FormProvider>
  );
};

export default ResumeEditor;
