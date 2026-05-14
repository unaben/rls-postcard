import { useState } from "react";
import cn from "classnames";
import copy from "copy-to-clipboard";
import type { ClickableFieldProps } from "./ClickableField.types";
import styles from "./ClickableField.module.css";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const ClickableField = ({ text, id, type }: ClickableFieldProps) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleCopy = async (text: string, fieldKey: string) => {
    const success = await copy(text);
    if (success) {
      setCopyStatus(fieldKey);
      setTimeout(() => setCopyStatus(null), 1500);
    }
  };

  const fieldKey = `${id}-${type}`;
  const isCopied = copyStatus === fieldKey;

  const fieldToCopy = capitalizeFirstLetter(fieldKey.split("-").pop() ?? "");

  return (
    <span
      className={cn(styles.container, { [styles.copied]: isCopied })}
      onClick={() => handleCopy(text, fieldKey)}
    >
      {isCopied ? `${fieldToCopy} copied!` : text}
    </span>
  );
};

export default ClickableField;
