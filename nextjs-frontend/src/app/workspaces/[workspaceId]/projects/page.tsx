"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { WorkspaceProject } from "../page";
import { useRouter } from "next/navigation";

export default function Projects({
  params,
}: {
  params: { workspaceId: number };
}) {
  const router = useRouter();
  const [workspaceProjects, setWorkspaceProjects] = useState<
    WorkspaceProject[]
  >([]);

  useEffect(() => {
    const fetchWorkspaceProjects = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${params.workspaceId}/projects`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const projects = await response.json();
      setWorkspaceProjects(projects);
    };

    fetchWorkspaceProjects();
  }, [params.workspaceId]);

  return (
    <div className={styles["projects"]}>
      <div className={styles["projects-container"]}>
        {workspaceProjects.map((project) => (
          <div
            key={project.project_id}
            className={styles["specific-project"]}
            onClick={() =>
              router.push(
                `/workspaces/${params.workspaceId}/projects/${project.project_id}`
              )
            }
          >
            <div className={styles["specific-project-details"]}>
              <span style={{ color: "white" }}>{project.project_name}</span>
            </div>
            <div>
              <p style={{ color: "whitesmoke" }}>
                {project.project_description}
              </p>
            </div>
            <div>
              <p style={{ color: "whitesmoke" }}>{project.project_access}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
