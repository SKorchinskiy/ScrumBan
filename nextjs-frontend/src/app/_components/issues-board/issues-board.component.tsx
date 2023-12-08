"use client";

import { DragEvent, useEffect, useState } from "react";
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
    <div
      className="main"
      style={{
        overflow: "scroll",
      }}
    >
      <div
        className="header"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${states.length}, 1fr)`,
        }}
      >
        {states.map((state) => (
          <div
            key={state.state_id}
            style={{
              display: "flex",
              justifyContent: "center",
              minWidth: "300px",
              margin: "10px",
              color: "whitesmoke",
              fontWeight: "bold",
            }}
          >
            {state.state_name.toUpperCase()}
          </div>
        ))}
      </div>
      <div
        className="body"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${states.length}, 1fr)`,
        }}
      >
        {states.map((state) => (
          <div
            key={state.state_id}
            id={`droppable-state-${state.state_id}`}
            className="issue-column"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#443C68",
              margin: "10px",
              borderRadius: "10px",
              overflow: "scroll",
              minWidth: "300px",
            }}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
          >
            {issues
              .filter((issue) => issue.issue_state.state_id === state.state_id)
              .map((issue) => (
                <div
                  key={issue.issue_id}
                  id={`draggable-issue-${issue.issue_id}`}
                  className="draggable-issue"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    backgroundColor: "#443c68",
                    width: "200px",
                    margin: "15px",
                    borderRadius: "10px",
                    padding: "5px",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
                    cursor: "pointer",
                    overflow: "scroll",
                  }}
                  draggable
                  onDragStart={dragStartHandler}
                >
                  <div
                    className="issue-header"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#CAA8F5",
                        margin: "5px",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setIsIssueUpdateOpen((prev) => !prev);
                        setIssueToUpdate(issue);
                      }}
                    >
                      &#9998;
                    </span>
                    <span
                      style={{
                        backgroundColor: "#CAA8F5",
                        margin: "5px",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                      onClick={() => issueRemovalHandler(issue.issue_id)}
                    >
                      &#x2715;
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "white" }}>{issue.issue_title}</span>
                  </div>
                  <div>
                    <p style={{ color: "whitesmoke" }}>
                      {issue.issue_description}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "whitesmoke" }}>
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
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
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
