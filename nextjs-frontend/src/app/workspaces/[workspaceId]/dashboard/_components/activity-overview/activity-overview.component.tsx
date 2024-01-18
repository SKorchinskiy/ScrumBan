"use client";

import { ProjectProps } from "@/app/types/types";
import styles from "./activity-overview.module.css";
import { useRouter } from "next/navigation";

type ActivityOverviewProps = {
  projects: ProjectProps[];
  workspaceId: number;
};

export default function ActivityOverview({
  projects,
  workspaceId,
}: ActivityOverviewProps) {
  const router = useRouter();

  return (
    <div className={styles["activity-board"]}>
      <div className={styles["activity-overview"]}>
        <div
          className={styles["activity-overview-item"]}
          onClick={() => router.push(`/workspaces/${workspaceId}/issues`)}
        >
          <span>All issues</span>
        </div>
        {projects.map((project) => (
          <div
            key={project.project_id}
            className={styles["activity-overview-item"]}
            onClick={() =>
              router.push(
                `/workspaces/${workspaceId}/projects/${project.project_id}/issues`
              )
            }
          >
            <span>{project.project_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
