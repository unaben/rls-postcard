"use client";

import PostcardForm from "@/components/PostcardForm/PostcardForm";
import styles from "./create.module.css";

export default function CreatePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PostcardForm />
      </main>
    </div>
  );
}
