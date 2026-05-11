"use client";

import { useState } from "react";
import cn from "classnames";
import type { LoginFormProps, LoginFormValues } from "./LoginForm.types";
import { MOCK_USERS } from "@/utils/constants";
import { validate } from "./utils/validate";
import styles from "./LoginForm.module.css";

const initialState = { email: "", password: "" };

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [values, setValues] = useState<LoginFormValues>(initialState);
  const [errors, setErrors] = useState<Partial<LoginFormValues>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validate(values, setErrors)) return;

    setLoading(true);
    setAuthError("");

    try {
      onSuccess();
    } catch {
      setAuthError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Welcome back</span>
        <h1 className={styles.title}>Sign in to Postcards</h1>
        <p className={styles.subtitle}>
          Create and share beautiful postcards with the world.
        </p>
      </header>

      <div className={styles.hint}>
        <strong>Demo accounts —</strong>
        <ul className={styles.hintList}>
          {MOCK_USERS.map((u) => (
            <li key={u.userId}>
              <span className={styles.hintUser}>{u.displayName}:</span>{" "}
              {u.email} · {u.password}
            </li>
          ))}
        </ul>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={cn(styles.input, { [styles.error]: !!errors.email })}
            placeholder="user@example.com"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            disabled={loading}
          />
          {errors.email && (
            <span className={styles.errorMsg}>{errors.email}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={cn(styles.input, { [styles.error]: !!errors.password })}
            placeholder="••••••••"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            disabled={loading}
          />
          {errors.password && (
            <span className={styles.errorMsg}>{errors.password}</span>
          )}
        </div>

        {authError && <span className={styles.errorMsg}>{authError}</span>}

        <button type="submit" className={styles.submit} disabled={loading}>
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
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
