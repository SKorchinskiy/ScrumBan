"use client";

import styles from "./sidebar.module.css";
import { useEffect } from "react";
import WorkspaceList from "../workspace-list/workspace-list.component";
import { WorkspaceProject } from "../../[workspaceId]/page";
import { usePathname, useRouter } from "next/navigation";

export default function SideBar({
  projects,
}: {
  projects: WorkspaceProject[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUserProjects = async () => {
      await fetch("http://localhost:3000/");
    };

    fetchUserProjects();
  }, []);

  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles["sidebar"]}>
        <WorkspaceList />
        <div className={styles["general"]}>
          <div className={styles["general-option"]}>
            <p>Create new Issue</p>
          </div>
          <div className={styles["general-option"]}>
            <p>Dashboard</p>
          </div>
          <div
            className={styles["general-option"]}
            onClick={() => {
              const pathChunks = pathname.split("/");
              const workspaceChunkIndex = pathChunks.findIndex(
                (value) => value === "workspaces"
              );
              if (workspaceChunkIndex !== pathChunks.length - 1) {
                router.push(
                  `/workspaces/${pathChunks[workspaceChunkIndex + 1]}/projects`
                );
              }
            }}
          >
            <p>Projects</p>
          </div>
          <div className={styles["general-option"]}>
            <p>All Issues</p>
          </div>
        </div>
        <div className={styles["projects-container"]}>
          <h3 style={{ margin: "0px" }}>Projects</h3>
          <div className={styles["projects-list"]} style={{ padding: "10px" }}>
            {projects?.length
              ? projects.map((project) => (
                  <div
                    key={project.project_id}
                    className={styles["project-representation"]}
                    onClick={() =>
                      router.push(
                        `/workspaces/${project.workspace_id}/projects/${project.project_id}`
                      )
                    }
                  >
                    <p>{project.project_name}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
