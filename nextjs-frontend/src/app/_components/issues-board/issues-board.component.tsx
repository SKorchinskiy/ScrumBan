"use client";

import styles from "./issue-board.module.css";
import { DragEvent, useState } from "react";
import IssueUpdateModal from "../issue-update-modal/issue-update-modal.component";

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

type IssuesBoardProps = {
  workspaceId: number;
  issues: IssueProps[];
  states: StateProps[];
  handleIssueChange: (issueId: number, newStateColumnId: number) => void;
  issueRemovalHandler: (issueId: number) => void;
};

export default function IssuesBoard({
  workspaceId,
  issues,
  states,
  handleIssueChange,
  issueRemovalHandler,
}: IssuesBoardProps) {
  const [draggedIssueId, setDraggedIssueId] = useState<number>(0);
  const [lastEnteredColumnId, setLastEnteredColumnId] = useState<number>(0);
  const [isIssueUpdateOpen, setIsIssueUpdateOpen] = useState(false);
  const [issueToUpdate, setIssueToUpdate] = useState<IssueProps>();

  function dragStartHandler(event: DragEvent<HTMLDivElement>) {
    const idText = (event.target as HTMLDivElement).id;
    setDraggedIssueId(parseInt(idText.split("-")[2]));
  }

  function dragOverHandler(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const targetColumnTextId = (event.target as HTMLDivElement).id;
    if (!targetColumnTextId.includes("droppable-state")) return;
    const columnId = parseInt(targetColumnTextId.split("-")[2]);
    setLastEnteredColumnId(columnId);
  }

  async function dropHandler(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    handleIssueChange(draggedIssueId, lastEnteredColumnId);
  }

  const onCancelHandler = () => {
    setIsIssueUpdateOpen(false);
  };

  return (
    <div className={styles["issue-board"]}>
      <div
        className={styles["issue-board-header"]}
        style={{ gridTemplateColumns: `repeat(${states.length}, 1fr)` }}
      >
        {states.map((state) => (
          <div key={state.state_id} className={styles["state-column"]}>
            {state.state_name.toUpperCase()}
          </div>
        ))}
      </div>
      <div
        className={styles["issue-board-body"]}
        style={{ gridTemplateColumns: `repeat(${states.length}, 1fr)` }}
      >
        {states.map((state) => (
          <div
            key={state.state_id}
            id={`droppable-state-${state.state_id}`}
            className={styles["droppable-state-column"]}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
          >
            {issues
              .filter((issue) => issue.issue_state.state_id === state.state_id)
              .map((issue) => (
                <div
                  key={issue.issue_id}
                  id={`draggable-issue-${issue.issue_id}`}
                  className={styles["draggable-issue"]}
                  draggable
                  onDragStart={dragStartHandler}
                >
                  <div className={styles["issue-header"]}>
                    <span
                      className={styles["issue-modal-update"]}
                      onClick={() => {
                        setIsIssueUpdateOpen((prev) => !prev);
                        setIssueToUpdate(issue);
                      }}
                    >
                      &#9998;
                    </span>
                    <span
                      className={styles["issue-modal-close"]}
                      onClick={() => issueRemovalHandler(issue.issue_id)}
                    >
                      &#x2715;
                    </span>
                  </div>
                  <div>
                    <span className={styles["issue-data"]}>
                      {issue.issue_title}
                    </span>
                  </div>
                  <div>
                    <p className={styles["issue-data"]}>
                      {issue.issue_description}
                    </p>
                  </div>
                  <div>
                    <p className={styles["issue-data"]}>
                      {issue.issue_priority}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      {isIssueUpdateOpen && issueToUpdate ? (
        <div>
          <div className={styles["dark-overlay"]} />
          <div className={styles["issue-update-modal-container"]}>
            <IssueUpdateModal
              workspaceId={workspaceId}
              issue={issueToUpdate}
              onCancelHandler={onCancelHandler}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
