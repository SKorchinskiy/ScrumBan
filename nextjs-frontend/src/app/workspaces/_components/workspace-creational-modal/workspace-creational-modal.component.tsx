"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./workspace-creational-modal.module.css";
import { useRouter } from "next/navigation";

type WorkspaceParams = {
  workspace_name: string;
};

const initialWorkspaceData: WorkspaceParams = {
  workspace_name: "",
};

export default function CreationalModal({
  onCancelHandler,
}: {
  onCancelHandler?: Function;
}) {
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

  const createNewWorkspace = async (event: MouseEvent<HTMLButtonElement>) => {
    const response = await fetch("https://scrumban.site:8000/workspaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...workspaceInfo,
      }),
    });

    if (response.ok) {
      const workspace = await response.json();
      if (workspace?.workspace_id) {
        router.push(`/workspaces/${workspace.workspace_id}/dashboard`);
      }
    }
  };

  return (
    <div className={styles["modal-container"]}>
      {onCancelHandler ? (
        <div
          className={styles["modal-container-header"]}
          onClick={() => onCancelHandler()}
        >
          <p className={styles["modal-container-close"]}>&#x2715;</p>
        </div>
      ) : null}
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
