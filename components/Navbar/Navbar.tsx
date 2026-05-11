"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isCreatePage = pathname.includes("/create");
  const isPostcardsPage = pathname.includes("/postcards");

  return (
    <>
      {(isCreatePage || isPostcardsPage) && (
        <nav className={styles.nav}>
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
          <div className={styles.actions}>
            {isPostcardsPage && (
              <button
                className={styles.navBtnAccent}
                onClick={() => router.push("/create")}
              >
                + New
              </button>
            )}
            {isCreatePage && (
              <button
                className={styles.navBtn}
                onClick={() => router.push("/postcards")}
              >
                View all
              </button>
            )}
            <button className={styles.btnGhost} onClick={() => {}}>
              Sign out
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
