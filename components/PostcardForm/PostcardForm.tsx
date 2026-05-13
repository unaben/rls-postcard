"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";
import type { PostcardFormValues } from "./PostcardForm.types";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import { AVATARS } from "@/utils/constants";
import { useAuth } from "@/hooks/useAuth";
import { handleSubmit } from "./utils/handleSubmit";
import styles from "./PostcardForm.module.css";

export default function PostcardForm() {
  const router = useRouter();
  const { isAuthenticated, currentUserId, user, checked } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState<PostcardFormValues>({
    title: "",
    content: "",
    avatarId: AVATARS[0].id,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof PostcardFormValues, string>>
  >({});

  const submitArgs = {
    user,
    values,
    router,
    currentUserId,
    setIsSubmitting,
    setErrors,
  };

  useEffect(() => {
    if (checked && !isAuthenticated) router.replace("/");
  }, [checked, isAuthenticated, router]);

  if (!checked || !isAuthenticated) return null;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>New postcard</span>
        <h1 className={styles.title}>Craft your message</h1>
        <p className={styles.subtitle}>
          Pick an avatar, write your title and message.
        </p>
      </header>

      <form
        className={styles.form}
        onSubmit={(e) => handleSubmit(e, submitArgs)}
        noValidate
      >
        <div className={styles.field}>
          <AvatarPicker
            selected={values.avatarId}
            onChange={(id) => setValues({ ...values, avatarId: id })}
          />
          {errors.avatarId && (
            <span className={styles.errorMsg}>{errors.avatarId}</span>
          )}
        </div>

        <div className={styles.divider} />

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={cn(styles.input, { [styles.error]: !!errors.title })}
            placeholder="Give your postcard a title…"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            disabled={isSubmitting}
            maxLength={80}
          />
          <span className={styles.counter}>{values.title.length}/80</span>
          {errors.title && (
            <span className={styles.errorMsg}>{errors.title}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="content">
            Message
          </label>
          <textarea
            id="content"
            className={cn(styles.textarea, {
              [styles.error]: !!errors.content,
            })}
            placeholder="Write your postcard message here…"
            value={values.content}
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            disabled={isSubmitting}
            maxLength={400}
          />
          <span className={styles.counter}>{values.content.length}/400</span>
          {errors.content && (
            <span className={styles.errorMsg}>{errors.content}</span>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => router.push("/postcards")}
            disabled={isSubmitting}
          >
            View All
          </button>
          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className={styles.spinnerInline}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="40"
                    strokeDashoffset="15"
                    strokeLinecap="round"
                  />
                </svg>
                Sending…
              </>
            ) : (
              "Send Postcard"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
