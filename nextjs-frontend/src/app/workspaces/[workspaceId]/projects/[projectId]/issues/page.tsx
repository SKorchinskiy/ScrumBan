"use client";

import styles from "./page.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type IssueProps = {
  issue_id: number;
  issue_title: string;
  issue_description: string;
  issue_priority: string;
  issue_state: {
    state_id: number;
    state_name: string;
    state_color: string;
  };
  issue_labels: Iterable<any>;
};

export default function Issues() {
  const pathname = usePathname();
  const [projectIssues, setProjectIssues] = useState<IssueProps[]>([]);

  useEffect(() => {
    const fetchProjectIssues = async () => {
      const workspaceId =
        pathname.split("/").findIndex((chunk) => chunk === "workspaces") + 1;
      const projectId =
        pathname.split("/").findIndex((chunk) => chunk === "projects") + 1;
      const response = await fetch(
        `http://localhost:3000/workspaces/${
          pathname.split("/")[workspaceId]
        }/projects/${pathname.split("/")[projectId]}/issues`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const issues = await response.json();
        setProjectIssues(issues);
      }
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
          overflow: "scroll",
        }}
      >
        {projectIssues.map((issue) => (
          <div key={issue.issue_id} className={styles["issues-container"]}>
            <div className={styles["issue-details"]}>
              <p>{issue.issue_title}</p>
            </div>
            <div className={styles["issue-details"]}>
              <p>{issue.issue_description}</p>
            </div>
            <div className={styles["issue-details"]}>
              <p>{issue.issue_priority}</p>
            </div>
            <div className={styles["issue-details"]}>
              <p>{issue?.issue_state?.state_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
