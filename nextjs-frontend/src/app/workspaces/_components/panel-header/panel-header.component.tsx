"use client";

import styles from "./panel-header.module.css";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

type PanelHeaderProps = {
  inputPlaceholder: string;
  creationalButtonText: string;
  onInputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  creationalButtonHandler: () => void;
};

export default function PanelHeader({
  inputPlaceholder,
  creationalButtonText,
  onInputChangeHandler,
  creationalButtonHandler,
}: PanelHeaderProps) {
  const router = useRouter();

  return (
    <div className={styles["panel-header"]}>
      <div className={styles["panel-header-left-side"]}>
        <div
          className={styles["panel-back-button"]}
          onClick={() => router.back()}
        >
          Back
        </div>
      </div>
      <div className={styles["panel-header-center"]}>
        <input
          className={styles["search-bar"]}
          placeholder={inputPlaceholder}
          type="text"
          onChange={onInputChangeHandler}
        />
      </div>
      <div className={styles["panel-header-right-side"]}>
        <div
          className={styles["issue-creational-button"]}
          onClick={() => creationalButtonHandler()}
        >
          {creationalButtonText}
        </div>
      </div>
    </div>
  );
}
