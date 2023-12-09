"use client";

import styles from "./project-representation.module.css";
import { WorkspaceProject } from "../../[workspaceId]/page";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectRepresentation({
  project,
  workspaceId,
}: {
  project: WorkspaceProject;
  workspaceId: number;
}) {
  const router = useRouter();
  const [areProjectDetailsOpen, setAreProjectDetailsOpen] = useState(false);

  const toggleAreProjectDetailsOpen = () =>
    setAreProjectDetailsOpen(!areProjectDetailsOpen);

  return (
    <Fragment>
      <div
        key={project.project_id}
        className={styles["project-representation"]}
        onClick={() => toggleAreProjectDetailsOpen()}
      >
        <p className={styles["project-name"]}>{project.project_name}</p>
      </div>
      {areProjectDetailsOpen ? (
        <div>
          <p
            className={styles["project-representation"]}
            onClick={() =>
              router.push(
                `/workspaces/${workspaceId}/projects/${project.project_id}/issues`
              )
            }
          >
            Issues
          </p>
          <p
            className={styles["project-representation"]}
            onClick={() =>
              router.push(
                `/workspaces/${workspaceId}/projects/${project.project_id}/sprints`
              )
            }
          >
            Sprints
          </p>
        </div>
      ) : null}
    </Fragment>
  );
}
