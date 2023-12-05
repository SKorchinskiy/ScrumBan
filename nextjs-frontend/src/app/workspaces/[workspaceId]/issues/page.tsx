"use client";

import styles from "./page.module.css";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";
import IssueCreationalModal from "../../_components/creational-modal/issue-creational-modal.component";
import PanelHeader from "../../_components/panel-header/panel-header.component";
import IssuesBoard from "@/app/_components/issues-board/issues-board.component";

type StateProps = {
  state_id: number;
  state_name: string;
  state_color: string;
  workspace_id: number;
};

type ProjectProps = {
  project_id: number;
  project_name: string;
  project_description: string;
  workspace_id: number;
  project_access: string;
};

type IssueProps = {
  issue_id: number;
  issue_title: string;
  issue_description: string;
  issue_priority: "None" | "Low" | "Medium" | "High" | "Urgent";
  project: ProjectProps;
  issue_state: StateProps;
};

export default function Issues() {
  const pathname = usePathname();
  const workspaceId = useMemo(() => {
    const workspacePos = pathname.split("/").indexOf("workspaces");
    return parseInt(pathname.split("/")[workspacePos + 1]);
  }, [pathname]);

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [workspaceIssues, setWorkspaceIssues] = useState<IssueProps[]>([]);
  const [filteredIssues, setFilteredIssues] =
    useState<IssueProps[]>(workspaceIssues);

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

  return (
    <Fragment>
      <div className={styles["issues"]}>
        <div className={styles["issues-container"]}>
          <PanelHeader
            inputPlaceholder="Type to filter issues..."
            creationalButtonText="Create Issue"
            onInputChangeHandler={(event) => {
              setFilteredIssues(
                workspaceIssues.filter((issue) =>
                  issue.issue_title.toLowerCase().includes(event.target.value)
                )
              );
            }}
            creationalButtonHandler={() => setIsIssueModalOpen(true)}
          />
          <IssuesBoard issues={filteredIssues} />
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
              onCancelHandler={() => setIsIssueModalOpen(false)}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
