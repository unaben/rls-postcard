import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type handleSubmitArgs = {
  validate(
    values: LoginFormValues,
    setErrors: Dispatch<SetStateAction<Partial<LoginFormValues>>>
  ): boolean;
  values: LoginFormValues;
  setErrors: Dispatch<SetStateAction<Partial<LoginFormValues>>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setAuthError: Dispatch<SetStateAction<string>>;
  router: AppRouterInstance;
  setValues: Dispatch<SetStateAction<LoginFormValues>>;
};

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSuccess: () => void;
}
