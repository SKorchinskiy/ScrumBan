import styles from "./page.module.css";

export type WorkspaceProject = {
  project_id: number;
  project_name: string;
  project_description: string;
  workspace_id: number;
  project_access: "public" | "private";
  sprints: Iterable<any>;
  labels: Iterable<any>;
  states: Iterable<any>;
  issues: Iterable<any>;
};

export default function Workspace() {
  return (
    <div className={styles["specific-workspace-container"]}>
      <div className={styles["specific-workspace-board"]} />
    </div>
  );
}
