"use client";

import styles from "./issue-board.module.css";
import { DragEvent, useState } from "react";
import IssueUpdateModal from "../issue-update-modal/issue-update-modal.component";
import IssueCard from "../issue-card/issue-card.component";
import { IssueProps, IssuesBoardProps } from "@/app/types/types";

export default function IssuesBoard({
  workspaceId,
  issues,
  states,
  handleIssueChange,
  issueRemovalHandler,
  changeUpdatedIssue,
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

  const onCancelHandler = () => setIsIssueUpdateOpen(false);
  const toggleIssueModalState = () => setIsIssueUpdateOpen(!isIssueUpdateOpen);
  const onIssueUpdateHandler = (issue: IssueProps) => setIssueToUpdate(issue);

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
              .filter(
                (issue) => issue?.issue_state?.state_id === state.state_id
              )
              .map((issue) => (
                <IssueCard
                  key={issue.issue_id}
                  issue={issue}
                  dragStartHandler={dragStartHandler}
                  issueRemovalHandler={issueRemovalHandler}
                  toggleIssueModalState={toggleIssueModalState}
                  onIssueUpdateHandler={onIssueUpdateHandler}
                />
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
              changeUpdatedIssue={changeUpdatedIssue}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
