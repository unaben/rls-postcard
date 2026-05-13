"use client";

import { useState } from "react";
import cn from "classnames";
import { EditModalProps } from "./EditModal.types";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import { AVATARS } from "@/utils/constants";
import { Postcard } from "@/components/PostcardCard/PostcardCard.types";
import styles from "./EditModal.module.css";
import { validateEditForm } from "./utils/validateEditForm";

export default function EditModal(props: EditModalProps) {
  const { postcard, onSave, onClose, loading = false } = props;

  const currentAvatarId =
    AVATARS.find((a) => a.src === postcard.avatarSrc)?.id ?? AVATARS[0].id;

  const [title, setTitle] = useState(postcard.title);
  const [content, setContent] = useState(postcard.content);
  const [avatarId, setAvatarId] = useState(currentAvatarId);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {}
  );


  const handleSave = () => {
    if (!validateEditForm(title, content, setErrors)) return;
    const avatar = AVATARS.find((avatar) => avatar.id === avatarId) ?? AVATARS[0];
    const patch: Partial<Postcard> = {
      title: title.trim(),
      content: content.trim(),
      avatarSrc: avatar.src,
      avatarLabel: avatar.label,
    };
    onSave(patch);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.eyebrow}>Editing postcard</span>
            <h2 className={styles.title}>Update your card</h2>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <AvatarPicker selected={avatarId} onChange={setAvatarId} />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="edit-title">
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              className={cn(styles.input, { [styles.error]: !!errors.title })}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              maxLength={80}
            />
            <span className={styles.counter}>{title.length}/80</span>
            {errors.title && (
              <span className={styles.errorMsg}>{errors.title}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="edit-content">
              Message
            </label>
            <textarea
              id="edit-content"
              className={cn(styles.textarea, {
                [styles.error]: !!errors.content,
              })}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              maxLength={400}
            />
            <span className={styles.counter}>{content.length}/400</span>
            {errors.content && (
              <span className={styles.errorMsg}>{errors.content}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={cn(styles.cancelBtn, { [styles.disabled]: loading })}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={cn(styles.saveBtn, { [styles.disabled]: loading })}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
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
                  Saving…
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
