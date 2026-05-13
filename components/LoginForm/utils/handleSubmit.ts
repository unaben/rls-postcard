import { signIn } from "@/utils/auth";
import type { HandleSubmitLoginFormArgs } from "../LoginForm.types";
import { validateLoginForm } from "./validateLoginForm";

export const handleSubmit = async (
  e: React.SyntheticEvent,
  args: HandleSubmitLoginFormArgs
) => {
  const {
    router,
    setAuthError,
    setErrors,
    setLoading,
    setValues,
    values,
  } = args;

  e.preventDefault();
  if (!validateLoginForm(values, setErrors)) return;

  setLoading(true);
  setAuthError("");

  try {
    await signIn(values.email, values.password);
    router.push("/create");
    setValues({ email: "", password: "" });
  } catch {
    setAuthError("Invalid email or password.");
  } finally {
    setLoading(false);
  }
};
