"use client";

import Image from "next/image";
import cn from "classnames";
import { PostcardCardProps } from "./PostcardCard.types";
import styles from "./PostcardCard.module.css";

export default function PostcardCard(props: PostcardCardProps) {
  const { postcard, index, isOwner, onDelete, onUpdate } = props;

  const formatted = new Date(postcard.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <article
        className={cn(styles.card)}
        style={{ animationDelay: `${index * 0.07}s` }}
      >
        <div className={styles.imagePanel}>
          <div className={styles.avatarWrapper}>
            <Image
              src={postcard.avatarSrc}
              alt={postcard.avatarLabel}
              width={72}
              height={72}
              className={styles.avatarImg}
              unoptimized
            />
          </div>
          <span className={styles.avatarLabel}>{postcard.avatarLabel}</span>
          {isOwner && <span className={styles.ownerBadge}>You</span>}
        </div>

        <div className={styles.body}>
          <span className={styles.indexBadge}>
            #{String(index + 1).padStart(2, "0")}
          </span>
          <h2 className={styles.title}>{postcard.title}</h2>
          <div className={styles.divider} />
          <p className={styles.content}>{postcard.content}</p>
          <div className={styles.footer}>
            <span className={styles.date}>{formatted}</span>
            {postcard.ownerName && (
              <span className={styles.ownerName}>by {postcard.ownerName}</span>
            )}
          </div>

          <svg className={styles.stamp} viewBox="0 0 40 40" fill="none">
            <rect
              x="2"
              y="2"
              width="36"
              height="36"
              rx="4"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <path
              d="M20 10L22 16L28 16L23 20L25 26L20 22L15 26L17 20L12 16L18 16Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className={styles.actions}>
          <button
            className={cn(styles.actionBtn, styles.editBtn)}
            onClick={() => {}}
            title="Edit postcard"
            aria-label="Edit postcard"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M11 2l3 3-9 9H2v-3l9-9z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={cn(styles.actionBtn, styles.deleteBtn)}
            onClick={() => {}}
            title="Delete postcard"
            aria-label="Delete postcard"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </article>
    </>
  );
}
