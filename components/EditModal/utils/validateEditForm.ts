import { Dispatch, SetStateAction } from "react";

export const validateEditForm = (
  title: string,
  content: string,
  setErrors: Dispatch<
    SetStateAction<{
      title?: string;
      content?: string;
    }>
  >
) => {
  const err: { title?: string; content?: string } = {};
  if (!title.trim()) err.title = "Title is required";
  else if (title.length > 80) err.title = "Max 80 characters";
  if (!content.trim()) err.content = "Message is required";
  else if (content.length > 400) err.content = "Max 400 characters";
  setErrors(err);
  return Object.keys(err).length === 0;
};
