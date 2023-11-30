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
}: {
  workspace_id: number;
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

  const createNewProject = (event: MouseEvent<HTMLButtonElement>) => {
    fetch(`http://localhost:3000/workspaces/${workspace_id}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...projectData,
      }),
    }).then((response) =>
      response.json().then((project) => {
        if (project?.project_id) {
          router.push(
            `/workspaces/${workspace_id}/projects/${project.project_id}`
          );
        }
      })
    );
  };

  return (
    <div className={styles["modal-container"]}>
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
        <input
          type="text"
          name="project_access"
          className={styles["modal-input"]}
          onChange={setWorkspaceInputData}
          placeholder="Enter your project access..."
        ></input>
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
