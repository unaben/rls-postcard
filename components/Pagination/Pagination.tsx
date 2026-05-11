"use client";
import cn from "classnames";
import { PaginationProps } from "./Pagination.types";
import styles from "./Pagination.module.css";

export default function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onPageChange } = props;
  
  return (
    <div className={styles.root}>
      <button
        className={cn(styles.btn, { [styles.btnDisabled]: currentPage === 1 })}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg className={styles.arrow} viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8l4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Prev
      </button>

      <div className={styles.dots}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={cn(styles.dot, {
              [styles.active]: currentPage === i + 1,
            })}
            onClick={() => onPageChange(i + 1)}
            aria-label={`Go to page ${i + 1}`}
            aria-current={currentPage === i + 1 ? "page" : undefined}
          />
        ))}
      </div>

      <span className={styles.info}>
        {currentPage} / {totalPages}
      </span>

      <button
        className={cn(styles.btn, {
          [styles.btnDisabled]: currentPage === totalPages,
        })}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
        <svg className={styles.arrow} viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
