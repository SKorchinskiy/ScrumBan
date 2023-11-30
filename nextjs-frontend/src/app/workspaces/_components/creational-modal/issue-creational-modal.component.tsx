"use client";

import { ChangeEvent, Fragment, MouseEvent, useState } from "react";
import styles from "./issue-creational-modal.module.css";
import { usePathname, useRouter } from "next/navigation";
import { WorkspaceProject } from "../../[workspaceId]/page";
import { WorkspaceState } from "../sidebar/sidebar.component";

type IssueParams = {
  issue_title: string;
  issue_description: string;
  issue_priority: "None" | "Low" | "Medium" | "High" | "Urgent";
  issue_state_id: number;
};

const initialIssueData: IssueParams = {
  issue_title: "",
  issue_description: "",
  issue_priority: "None",
  issue_state_id: 0,
};

export default function IssueCreationalModal({
  projects,
  states,
  onCancelHandler,
}: {
  projects: WorkspaceProject[];
  states: WorkspaceState[];
  onCancelHandler: Function;
}) {
  const pathname = usePathname();
  const [projectId, setProjectId] = useState<number>();
  const [issueInfo, setIssueInfo] = useState<IssueParams>(initialIssueData);

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

  const createNewIssue = (event: MouseEvent<HTMLButtonElement>) => {
    const pathChunks = pathname.split("/");
    const workspaceChunkIndex = pathChunks.findIndex(
      (value) => value === "workspaces"
    );
    fetch(
      `http://localhost:3000/workspaces/${
        pathChunks[workspaceChunkIndex + 1]
      }/projects/${projectId}/issues`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...issueInfo,
        }),
      }
    );
    onCancelHandler();
  };

  return (
    <div
      className={styles["modal-container"]}
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 20,
          right: 20,
          width: "10px",
          height: "10px",
          background: "rgba(24, 18, 41, 0.3)",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => onCancelHandler()}
      >
        <p
          style={{
            color: "white",
          }}
        >
          &#x2715;
        </p>
      </div>
      <h1 className={styles["heading"]}>Create Issue</h1>
      <div className={styles["input-container"]}>
        <input
          type="text"
          name="issue_title"
          className={styles["modal-input"]}
          onChange={setIssueInputData}
          placeholder="Enter your issue name..."
        />
        <input
          type="text"
          name="issue_description"
          className={styles["modal-input"]}
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
          <option value="None">None</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
        <select
          name="issue_state"
          className={styles["modal-input"]}
          onChange={(event) =>
            setIssueInfo((prev) => ({
              ...prev,
              issue_state_id: parseInt(event.target.selectedOptions[0].value),
            }))
          }
        >
          <option value="" disabled selected>
            Select issue state
          </option>
          {states.map((state) => (
            <option key={state.state_id} value={state.state_id}>
              {state.state_name}
            </option>
          ))}
        </select>
        <select
          name="project_id"
          className={styles["modal-input"]}
          onChange={(event) =>
            setProjectId(parseInt(event.target.selectedOptions[0].value))
          }
        >
          <option value="" disabled selected>
            Select project
          </option>
          {projects.map((project) => (
            <option key={project.project_id} value={project.project_id}>
              {project.project_name}
            </option>
          ))}
        </select>
        <button
          className={styles["default-button"]}
          onClick={(e) => createNewIssue(e)}
        >
          create new issue
        </button>
      </div>
    </div>
  );
}
