import { Dispatch, SetStateAction } from "react";
import type { PostcardFormValues } from "../PostcardForm.types";

export const validate = (
  values: PostcardFormValues,
  setErrors: Dispatch<
    SetStateAction<Partial<Record<keyof PostcardFormValues, string>>>
  >
): boolean => {
  const err: Partial<Record<keyof PostcardFormValues, string>> = {};
  if (!values.title.trim()) err.title = "Title is required";
  else if (values.title.length > 80) err.title = "Max 80 characters";
  if (!values.content.trim()) err.content = "Content is required";
  else if (values.content.length > 400) err.content = "Max 400 characters";
  if (!values.avatarId) err.avatarId = "Please select an avatar";
  setErrors(err);
  return Object.keys(err).length === 0;
};
