import { WorkspaceProject } from "@/app/types/types";
import styles from "./project-card.module.css";
import { useRouter } from "next/navigation";

export default function ProjectCard({
  projectRemovalHandler,
  project,
}: {
  projectRemovalHandler: Function;
  project: WorkspaceProject;
}) {
  const router = useRouter();

  return (
    <div key={project.project_id} className={styles["specific-project"]}>
      <div className={styles["project-header"]}>
        <span
          className={styles["project-modal-close"]}
          onClick={() => projectRemovalHandler(project.project_id)}
        >
          &#x2715;
        </span>
      </div>
      <div
        className={styles["specific-project-details"]}
        onClick={() =>
          router.push(
            `/workspaces/${project.workspace_id}/projects/${project.project_id}/issues`
          )
        }
      >
        <span className={styles["project-data"]}>
          <b>{project.project_name}</b>
        </span>
        <div>
          <p className={styles["project-data"]}>
            <i>{project.project_description}</i>
          </p>
        </div>
        <div>
          <p className={styles["project-data"]}>
            <b>{project.project_access}</b>
          </p>
        </div>
      </div>
    </div>
  );
}
