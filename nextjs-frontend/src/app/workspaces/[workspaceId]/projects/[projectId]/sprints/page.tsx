"use client";

import { usePathname } from "next/navigation";
import { WorkspaceProject } from "../../../page";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

type SprintProps = {
  sprint_id: number;
  sprint_title: string;
  sprint_description: string;
  sprint_start_date: string;
  sprint_end_date: string;
  project: WorkspaceProject;
};

export default function Sprints() {
  const pathname = usePathname();
  const [projectSprints, setProjectSprints] = useState<SprintProps[]>([]);

  useEffect(() => {
    const fetchProjectIssues = async () => {
      const workspaceId =
        pathname.split("/").findIndex((chunk) => chunk === "workspaces") + 1;
      const projectId =
        pathname.split("/").findIndex((chunk) => chunk === "projects") + 1;
      const response = await fetch(
        `http://localhost:3000/workspaces/${
          pathname.split("/")[workspaceId]
        }/projects/${pathname.split("/")[projectId]}/sprints`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const issues = await response.json();
      setProjectSprints(issues);
    };

    fetchProjectIssues();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#392F53",
          width: "95%",
          height: "95%",
          borderRadius: "10px",
        }}
      >
        {projectSprints.map((sprint) => (
          <div key={sprint.sprint_id} className={styles["sprints-container"]}>
            <div className={styles["sprint-details"]}>
              <p>{sprint.sprint_title}</p>
            </div>
            <div className={styles["sprint-details"]}>
              <p>{sprint.sprint_description}</p>
            </div>
            <div className={styles["sprint-details"]}>
              <p>{sprint.sprint_start_date}</p>
            </div>
            <div className={styles["sprint-details"]}>
              <p>{sprint.sprint_end_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
