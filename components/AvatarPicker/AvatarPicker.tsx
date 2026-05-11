"use client";

import Image from "next/image";
import cn from "classnames";
import { AvatarPickerProps } from "./AvatarPicker.types";
import { AVATARS } from "@/utils/constants";
import styles from "./AvatarPicker.module.css";

export default function AvatarPicker(props: AvatarPickerProps) {
  const { selected, onChange } = props;
  
  return (
    <div className={styles.root}>
      <span className={styles.label}>Choose your avatar</span>
      <div className={styles.grid}>
        {AVATARS.map((avatar) => {
          const isSelected = avatar.id === selected;
          return (
            <button
              key={avatar.id}
              type="button"
              className={styles.option}
              onClick={() => onChange(avatar.id)}
              aria-label={`Select avatar ${avatar.label}`}
              aria-pressed={isSelected}
            >
              <div
                className={cn(styles.ring, { [styles.selected]: isSelected })}
              >
                <Image
                  src={avatar.src}
                  alt={avatar.label}
                  width={52}
                  height={52}
                  className={styles.img}
                  unoptimized
                />
              </div>
              <span
                className={cn(styles.name, {
                  [styles.selectedName]: isSelected,
                })}
              >
                {avatar.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
