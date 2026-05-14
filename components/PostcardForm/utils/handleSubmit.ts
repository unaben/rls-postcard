import { AVATARS } from "@/utils/constants";
import { savePostcard, generateId } from "@/utils/storage";
import type { HandleSubmitPostcardFormArgs } from "../PostcardForm.types";
import { validatePostcardForm } from "./validatePostcardForm";
import notify from "@/utils/notify";

export const handleSubmit = async (
  e: React.SyntheticEvent,
  args: HandleSubmitPostcardFormArgs
) => {
  e.preventDefault();

  const {
    currentUserId,
    router,
    setIsSubmitting,
    user,
    values,
    setErrors,
    checkUserCreatedPostCardLength,
  } = args;

  const isUserCreatedPostCardMoreThanFive = checkUserCreatedPostCardLength > 5;

  if (isUserCreatedPostCardMoreThanFive) {
    notify(
      "warning",
      "You've reached the 5 postcard limit. Delete one before creating a new one."
    );
    return;
  }

  if (!validatePostcardForm(values, setErrors)) return;

  setIsSubmitting(true);
  const avatar = AVATARS.find((a) => a.id === values.avatarId) ?? AVATARS[0];
  const emailPrefix = user?.email?.split("@")[0] ?? "Unknown";
  const ownerName =
    user?.user_metadata?.display_name ??
    emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

  try {
    await savePostcard({
      id: generateId(),
      title: values.title,
      content: values.content,
      avatarSrc: avatar.src,
      avatarLabel: avatar.label,
      ownerId: currentUserId,
      ownerName,
      createdAt: new Date().toISOString(),
    });
    router.push("/postcards");
  } catch (err) {
    console.error("Failed to save postcard:", (err as Error).message);
  } finally {
    setIsSubmitting(false);
  }
};
