"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./creational-modal.module.css";
import { useRouter } from "next/navigation";

type WorkspaceParams = {
  workspace_name: string;
};

const initialWorkspaceData: WorkspaceParams = {
  workspace_name: "",
};

export default function CreationalModal() {
  const router = useRouter();
  const [workspaceInfo, setWorkspaceInfo] =
    useState<WorkspaceParams>(initialWorkspaceData);

  const setWorkspaceInputData = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setWorkspaceInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createNewWorkspace = (event: MouseEvent<HTMLButtonElement>) => {
    fetch("http://localhost:3000/workspaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...workspaceInfo,
      }),
    }).then((response) =>
      response.json().then((workspace) => {
        if (workspace?.workspace_id) {
          router.push(`/workspaces/${workspace.workspace_id}`);
        }
      })
    );
  };

  return (
    <div className={styles["modal-container"]}>
      <h1 className={styles["heading"]}>Create Workspace</h1>
      <div className={styles["input-container"]}>
        <input
          type="text"
          name="workspace_name"
          className={styles["modal-input"]}
          onChange={setWorkspaceInputData}
          placeholder="Enter your workspace name..."
        ></input>
        <button
          className={styles["default-button"]}
          onClick={(e) => createNewWorkspace(e)}
        >
          create new workspace
        </button>
      </div>
    </div>
  );
}
