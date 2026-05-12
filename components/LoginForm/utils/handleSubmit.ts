import { signIn } from "@/utils/auth";
import type { handleSubmitArgs } from "../LoginForm.types";

export const handleSubmit = async (
  e: React.SyntheticEvent,
  args: handleSubmitArgs
) => {
  const {
    router,
    setAuthError,
    setErrors,
    setLoading,
    setValues,
    validate,
    values,
  } = args;

  e.preventDefault();
  if (!validate(values, setErrors)) return;

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
