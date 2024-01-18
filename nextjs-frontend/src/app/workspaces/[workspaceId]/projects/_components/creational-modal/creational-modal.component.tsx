"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./creational-modal.module.css";
import { useRouter } from "next/navigation";

type ProjectParams = {
  project_name: string;
  project_description: string;
  project_access: "public" | "private";
};

const initialProjectData: ProjectParams = {
  project_name: "",
  project_description: "",
  project_access: "private",
};

export default function CreationalModal({
  workspace_id,
  onCancelHandler,
}: {
  workspace_id: number;
  onCancelHandler: Function;
}) {
  const router = useRouter();
  const [projectData, setProjectData] =
    useState<ProjectParams>(initialProjectData);

  const setWorkspaceInputData = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createNewProject = async (event: MouseEvent<HTMLButtonElement>) => {
    const response = await fetch(
      `http://localhost:8000/workspaces/${workspace_id}/projects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...projectData,
        }),
      }
    );
    if (response.ok) {
      const project = await response.json();
      if (project?.project_id) {
        router.push(
          `/workspaces/${workspace_id}/projects/${project.project_id}/issues`
        );
      }
    }
  };

  return (
    <div className={styles["modal-container"]}>
      <div
        className={styles["modal-container-header"]}
        onClick={() => onCancelHandler()}
      >
        <p className={styles["modal-container-close"]}>&#x2715;</p>
      </div>
      <h1 className={styles["heading"]}>Create Project</h1>
      <div className={styles["input-container"]}>
        <input
          type="text"
          name="project_name"
          className={styles["modal-input"]}
          onChange={setWorkspaceInputData}
          placeholder="Enter your project name..."
        ></input>
        <input
          type="text"
          name="project_description"
          className={styles["modal-input"]}
          onChange={setWorkspaceInputData}
          placeholder="Enter your project description..."
        ></input>
        <select
          className={styles["modal-input"]}
          onChange={(e) => {
            const value = e.currentTarget.value as "public" | "private";
            setProjectData((prev) => ({
              ...prev,
              project_access: value,
            }));
          }}
        >
          <option selected disabled>
            Enter your project access...
          </option>
          <option value="public">public</option>
          <option value="private">private</option>
        </select>
        <button
          className={styles["default-button"]}
          onClick={(e) => createNewProject(e)}
        >
          create new project
        </button>
      </div>
    </div>
  );
}
