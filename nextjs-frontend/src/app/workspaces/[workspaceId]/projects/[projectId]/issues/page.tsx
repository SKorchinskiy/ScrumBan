"use client";

import PanelHeader from "@/app/workspaces/_components/panel-header/panel-header.component";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";
import { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import IssueCreationalModal from "@/app/workspaces/_components/creational-modal/issue-creational-modal.component";

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
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const workspaceId = useMemo(
    () =>
      parseInt(
        pathname.split("/")[
          pathname.split("/").findIndex((chunk) => chunk === "workspaces") + 1
        ]
      ),
    [pathname]
  );
  const projectId = useMemo(
    () =>
      parseInt(
        pathname.split("/")[
          pathname.split("/").findIndex((chunk) => chunk === "projects") + 1
        ]
      ),
    [pathname]
  );
  const [projectIssues, setProjectIssues] = useState<IssueProps[]>([]);

  useEffect(() => {
    const fetchProjectIssues = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/projects/${projectId}/issues`,
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
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#392f53",
          width: "95%",
          height: "95%",
          borderRadius: "10px",
        }}
      >
        <PanelHeader
          inputPlaceholder="Type to filter project issues..."
          creationalButtonText="Create Project Issue"
          onInputChangeHandler={(event: ChangeEvent<HTMLInputElement>) => {}}
          creationalButtonHandler={() => setIsIssueModalOpen(true)}
        />
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
      {isIssueModalOpen ? (
        <Fragment>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <IssueCreationalModal
              workspaceId={workspaceId}
              project_id={projectId}
              onCancelHandler={() => setIsIssueModalOpen(false)}
            />
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}
