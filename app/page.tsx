"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm/LoginForm";
import styles from "./homePage.module.css";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className={styles.page}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <svg className={styles.brandIcon} viewBox="0 0 32 32" fill="none">
            <rect
              x="2"
              y="6"
              width="28"
              height="20"
              rx="3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M2 10l14 9 14-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.brandName}>Postcards</span>
        </div>

        <div className={styles.hero}>
          <span className={styles.heroTag}>Digital postcard studio</span>
          <h1 className={styles.heroTitle}>
            Words that
            <br />
            <em>travel far</em>
          </h1>
          <p className={styles.heroSub}>
            Craft beautiful postcards and share your thoughts with a personal
            touch. Choose your avatar, write your message, and send it to the
            world.
          </p>
        </div>

        <div className={styles.decorGrid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={styles.decorCard} />
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <LoginForm onSuccess={() => router.push("/create")} />
      </div>
    </main>
  );
}
