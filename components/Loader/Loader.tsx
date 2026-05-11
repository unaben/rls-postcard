import { LoaderProps } from "./Loader.types";
import styles from "./Loader.module.css";

export default function Loader(props: LoaderProps) {
  const { message = "Loading…", fullScreen = false } = props;

  const spinner = (
    <>
      <svg
        className={styles.svgSpinner}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.track}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
        <circle
          className={styles.arc}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      <span className={styles.message}>{message}</span>
    </>
  );

  if (fullScreen) {
    return <div className={styles.overlay}>{spinner}</div>;
  }

  return <div className={styles.inline}>{spinner}</div>;
}
