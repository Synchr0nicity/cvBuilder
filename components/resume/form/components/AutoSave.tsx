"use client";

import { Resume } from "@/components/lib/resume.z";
import { useCallback, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export function AutoSave() {
  const { control } = useFormContext<Resume>();

  const values = useWatch({ control });

  const initialRef = useEffect(() => {}, [values]);

  return null;
}
