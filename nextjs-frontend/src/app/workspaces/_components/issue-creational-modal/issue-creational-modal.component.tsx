"use client";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import styles from "./issue-creational-modal.module.css";
import {
  IssueParams,
  IssueProps,
  WorkspaceProject,
  WorkspaceState,
} from "@/app/types/types";

const initialIssueData: IssueParams = {
  issue_title: "",
  issue_description: "",
  issue_priority: "None",
  issue_state_id: 0,
};

type IssueCreationalModalProps = {
  workspaceId: number;
  onCancelHandler: Function;
  onIssueCreateHandler?: Function;
} & { project_id?: number };

export default function IssueCreationalModal({
  workspaceId,
  onCancelHandler,
  onIssueCreateHandler,
  project_id,
}: IssueCreationalModalProps) {
  const [projects, setProjects] = useState<WorkspaceProject[]>([]);
  const [states, setStates] = useState<WorkspaceState[]>([]);
  const [projectId, setProjectId] = useState<number>(project_id || 0);
  const [issueInfo, setIssueInfo] = useState<IssueParams>(initialIssueData);

  useEffect(() => {
    const fetchWorkspaceProject = async () => {
      const response = await fetch(
        `https://scrumban.site:8000/workspaces/${workspaceId}/projects`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const projects = await response.json();
        setProjects(projects);
      }
    };

    fetchWorkspaceProject();
  }, [workspaceId]);

  useEffect(() => {
    const fetchWorkspaceStates = async () => {
      const response = await fetch(
        `https://scrumban.site:8000/workspaces/${workspaceId}/states`,
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

  const createNewIssue = async (event: MouseEvent<HTMLButtonElement>) => {
    const response = await fetch(
      `https://scrumban.site:8000/workspaces/${workspaceId}/projects/${projectId}/issues`,
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
    if (response.ok && onIssueCreateHandler) {
      const issue = (await response.json()) as IssueProps;
      onIssueCreateHandler(issue);
    }
    onCancelHandler(false);
  };

  return (
    <div className={styles["modal-container"]}>
      <div
        className={styles["issue-modal-close"]}
        onClick={() => onCancelHandler(false)}
      >
        <p className={styles["issue-close-sign"]}>&#x2715;</p>
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
          onChange={(event) => {
            if (event.target.selectedOptions[0].value == "create")
              onCancelHandler(true);
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
            <option key={state.state_id} value={state.state_id}>
              {state.state_name}
            </option>
          ))}
          <option value="create">+ Create new issue state</option>
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
            <option
              key={project.project_id}
              value={project.project_id}
              selected={projectId === project.project_id}
            >
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
