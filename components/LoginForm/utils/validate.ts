import { Dispatch, SetStateAction } from "react";
import type { LoginFormValues } from "../LoginForm.types";

export const validate = (values: LoginFormValues, setErrors: Dispatch<SetStateAction<Partial<LoginFormValues>>>): boolean => {
    const e: Partial<LoginFormValues> = {};
    if (!values.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email)) e.email = "Enter a valid email";
    if (!values.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };