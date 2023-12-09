import styles from "./page.module.css";
import { Fragment } from "react";

export default function Project() {
  return (
    <Fragment>
      <div className={styles["project-board-container"]}>
        <div className={styles["project-board"]} />
      </div>
    </Fragment>
  );
}
