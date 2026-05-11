"use client";

import { useState } from "react";
import PostcardForm from "@/components/PostcardForm/PostcardForm";
import styles from "./create.module.css";
import { PostcardFormValues } from "@/components/PostcardForm/PostcardForm.types";


export default function CreatePage() {
  const [submitting, setSubmitting] = useState(false);

 const handleSubmit = async(values: PostcardFormValues) => {
  setSubmitting(true)
 }

  return (
    <div className={styles.page}>

      <main className={styles.main}>
        <PostcardForm onSubmit={handleSubmit} loading={submitting}  />
      </main>
    </div>
  );
}
