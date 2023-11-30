"use client";

import styles from "./page.module.css";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";
import { WorkspaceProject } from "../page";
import { WorkspaceState } from "../../_components/sidebar/sidebar.component";
import IssueCreationalModal from "../../_components/creational-modal/issue-creational-modal.component";

type IssueProps = {
  issue_id: string;
  issue_title: string;
  issue_description: string;
  issue_priority: string;
};

export default function Issues() {
  const router = useRouter();
  const pathname = usePathname();
  const workspaceId = useMemo(() => {
    const workspacePos = pathname.split("/").indexOf("workspaces");
    return pathname.split("/")[workspacePos + 1];
  }, [pathname]);

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [workspaceProjects, setWorkspaceProjects] = useState<
    WorkspaceProject[]
  >([]);
  const [workspaceIssues, setWorkspaceIssues] = useState<IssueProps[]>([]);
  const [filteredIssues, setFilteredIssues] =
    useState<IssueProps[]>(workspaceIssues);
  const [workspaceStates, setWorkspaceStates] = useState<WorkspaceState[]>([]);

  useEffect(() => {
    const fetchWorkspaceIssues = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/issues`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const issues = await response.json();
        setWorkspaceIssues(issues);
        setFilteredIssues(issues);
      }
    };

    fetchWorkspaceIssues();
  }, []);

  useEffect(() => {
    const fetchWorkspaceProject = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/projects`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const projects = await response.json();
        setWorkspaceProjects(projects);
      }
    };

    fetchWorkspaceProject();
  }, []);

  useEffect(() => {
    const fetchWorkspaceStates = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/states`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const states = await response.json();
        setWorkspaceStates(states);
      }
    };

    fetchWorkspaceStates();
  }, []);

  return (
    <Fragment>
      <div className={styles["issues"]}>
        <div className={styles["issues-container"]}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#2D2643",
              width: "100%",
              borderRadius: "10px 10px 0 0",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "50%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "50%",
                  color: "whitesmoke",
                }}
              >
                <div
                  style={{
                    marginRight: "50px",
                    backgroundColor: "#443C68",
                    padding: "10px",
                    borderRadius: "10px",
                    userSelect: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => router.back()}
                >
                  Back
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                style={{
                  width: "300px",
                  height: "30px",
                  color: "white",
                  background: "#443C68",
                  border: "none",
                  borderRadius: "5px",
                }}
                placeholder="Type to filter projects..."
                type="text"
                onChange={(event) => {
                  setFilteredIssues(
                    workspaceIssues.filter((issue) =>
                      issue.issue_title
                        .toLowerCase()
                        .includes(event.target.value)
                    )
                  );
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "50%",
                color: "whitesmoke",
              }}
            >
              <div
                style={{
                  marginRight: "50px",
                  backgroundColor: "#443C68",
                  padding: "10px",
                  borderRadius: "10px",
                  userSelect: "none",
                  cursor: "pointer",
                }}
                onClick={() => setIsIssueModalOpen(true)}
              >
                Create Issue
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              width: "100%",
              height: "100%",
            }}
          >
            {filteredIssues.map((issue) => (
              <div key={issue.issue_id} className={styles["specific-issue"]}>
                <div className={styles["specific-issue-details"]}>
                  <span style={{ color: "white" }}>{issue.issue_title}</span>
                </div>
                <div>
                  <p style={{ color: "whitesmoke" }}>
                    {issue.issue_description}
                  </p>
                </div>
                <div>
                  <p style={{ color: "whitesmoke" }}>{issue.issue_priority}</p>
                </div>
              </div>
            ))}
          </div>
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
              onCancelHandler={() => setIsIssueModalOpen(false)}
              projects={workspaceProjects}
              states={workspaceStates}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
