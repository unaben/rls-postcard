"use client";

import cn from "classnames";
import { ConfirmDialogProps } from "./ConfirmDialog.types";
import styles from "./ConfirmDialog.module.css";

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    title,
    message,
    confirmLabel = "Delete",
    onConfirm,
    onCancel,
    loading = false,
  } = props;
  
  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrap}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button
            className={cn(styles.cancel, { [styles.disabled]: loading })}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={cn(styles.confirm, { [styles.disabled]: loading })}
            onClick={onConfirm}
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
                Deleting…
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
