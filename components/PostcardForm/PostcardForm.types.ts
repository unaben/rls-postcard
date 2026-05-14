import type { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface PostcardFormValues {
  title: string;
  content: string;
  avatarId: string;
}

export interface PostcardFormProps {
  onSubmit: (values: PostcardFormValues) => Promise<void>;
  loading: boolean;
}

export type HandleSubmitPostcardFormArgs = {
  user: User | null;
  values: PostcardFormValues;
  router: AppRouterInstance;
  currentUserId: string;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setErrors: Dispatch<
    SetStateAction<Partial<Record<keyof PostcardFormValues, string>>>
  >;
  checkUserCreatedPostCardLength: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
