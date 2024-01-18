"use client";

import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import styles from "./issue-update-modal.module.css";
import { IssueParams, IssueProps, WorkspaceState } from "@/app/types/types";

export default function IssueUpdateModal({
  issue,
  workspaceId,
  onCancelHandler,
  changeUpdatedIssue,
}: {
  issue: Partial<IssueProps>;
  workspaceId: number;
  onCancelHandler: Function;
  changeUpdatedIssue: Function;
} & { project_id?: number }) {
  const [states, setStates] = useState<WorkspaceState[]>([]);
  const issueId = useMemo(() => issue.issue_id, [issue]);
  const [issueInfo, setIssueInfo] = useState<IssueParams>({
    issue_title: issue.issue_title!,
    issue_description: issue.issue_description!,
    issue_priority: issue.issue_priority!,
    issue_state_id: issue.issue_state!.state_id,
  });

  useEffect(() => {
    const fetchWorkspaceStates = async () => {
      const response = await fetch(
        `http://localhost:8000/workspaces/${workspaceId}/states`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const states = await response.json();
        setStates(states);
      }
    };

    fetchWorkspaceStates();
  }, [workspaceId]);

  const setIssueInputData = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setIssueInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateIssue = async (event: MouseEvent<HTMLButtonElement>) => {
    const response = await fetch(
      `http://localhost:8000/workspaces/${workspaceId}/issues/${issueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...issueInfo,
        }),
      }
    );

    if (response.ok) {
      const issue = await response.json();
      changeUpdatedIssue(issue);
    }

    onCancelHandler();
  };

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["issue-header"]} onClick={() => onCancelHandler()}>
        <p className={styles["issue-close-sign"]}>&#x2715;</p>
      </div>
      <h1 className={styles["heading"]}>Update Issue</h1>
      <div className={styles["input-container"]}>
        <input
          type="text"
          name="issue_title"
          className={styles["modal-input"]}
          value={issueInfo.issue_title}
          onChange={setIssueInputData}
          placeholder="Enter your issue name..."
        />
        <input
          type="text"
          name="issue_description"
          className={styles["modal-input"]}
          value={issueInfo.issue_description}
          onChange={setIssueInputData}
          placeholder="Enter your issue description..."
        />
        <select
          className={styles["modal-input"]}
          name="issue_priority"
          onChange={setIssueInputData}
        >
          <option value="" disabled selected>
            Select issue priority
          </option>
          <option value="None" selected={issueInfo.issue_priority === "None"}>
            None
          </option>
          <option value="Low" selected={issueInfo.issue_priority === "Low"}>
            Low
          </option>
          <option
            value="Medium"
            selected={issueInfo.issue_priority === "Medium"}
          >
            Medium
          </option>
          <option value="High" selected={issueInfo.issue_priority === "High"}>
            High
          </option>
          <option
            value="Urgent"
            selected={issueInfo.issue_priority === "Urgent"}
          >
            Urgent
          </option>
        </select>
        <select
          name="issue_state"
          className={styles["modal-input"]}
          onChange={(event) => {
            if (event.target.selectedOptions[0].value == "update")
              onCancelHandler();
            setIssueInfo((prev) => ({
              ...prev,
              issue_state_id: parseInt(event.target.selectedOptions[0].value),
            }));
          }}
        >
          <option value="" disabled selected>
            Select issue state
          </option>
          {states.map((state) => (
            <option
              key={state.state_id}
              value={state.state_id}
              selected={issueInfo.issue_state_id === state.state_id}
            >
              {state.state_name}
            </option>
          ))}
          <option value="update">+ Update issue state</option>
        </select>
        <button
          className={styles["default-button"]}
          onClick={(e) => updateIssue(e)}
        >
          update issue
        </button>
      </div>
    </div>
  );
}
