import styles from "./page.module.css";
import CreationalModal from "./_components/workspace-creational-modal/workspace-creational-modal.component";

export default function Workspaces() {
  return (
    <div className={styles["workspace-page"]}>
      <div className={styles["modal-container"]}>
        <CreationalModal />
      </div>
    </div>
  );
}
