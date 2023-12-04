"use client";

import styles from "./page.module.css";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";
import IssueCreationalModal from "../../_components/creational-modal/issue-creational-modal.component";
import PanelHeader from "../../_components/panel-header/panel-header.component";

type IssueProps = {
  issue_id: string;
  issue_title: string;
  issue_description: string;
  issue_priority: string;
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
              workspaceId={workspaceId}
              onCancelHandler={() => setIsIssueModalOpen(false)}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
