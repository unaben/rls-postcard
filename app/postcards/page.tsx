"use client";

import { useRouter } from "next/navigation";
import PostcardCard from "@/components/PostcardCard/PostcardCard";
import { Postcard } from "@/components/PostcardCard/PostcardCard.types";
import styles from "./postcards.module.css";

export default function PostcardsPage() {
  const router = useRouter();
  const postcards: Array<Postcard> = [];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <span className={styles.eyebrow}>Your collection</span>
          <h1 className={styles.pageTitle}>All Postcards</h1>
        </div>

        {postcards.length === 0 ? (
          <div className={styles.empty}>
            <svg className={styles.emptyIcon} viewBox="0 0 52 52" fill="none">
              <rect
                x="4"
                y="10"
                width="44"
                height="32"
                rx="4"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M4 18l22 14 22-14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <h2 className={styles.emptyTitle}>No postcards yet</h2>
            <p className={styles.emptySub}>
              Create your first postcard and it will appear here.
            </p>
            <button
              className={styles.emptyBtn}
              onClick={() => router.push("/create")}
            >
              Create postcard
            </button>
          </div>
        ) : (
          <>
            <div className={styles.list}>
              {postcards.map((postcard, i) => (
                <PostcardCard
                  key={postcard.id}
                  postcard={postcard}
                  index={0}
                  isOwner={true}
                  onDelete={() => {}}
                  onUpdate={() => {}}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
