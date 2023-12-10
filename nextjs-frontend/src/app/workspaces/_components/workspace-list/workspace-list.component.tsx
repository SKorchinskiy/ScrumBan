"use client";

import styles from "./workspace-list.module.css";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import CreationalModal from "../workspace-creational-modal/workspace-creational-modal.component";

type Workspace = {
  workspace_id: number;
  workspace_name: string;
  workspace_owner: number;
};

export default function WorkspaceList({
  workspace_id,
}: {
  workspace_id: number;
}) {
  const router = useRouter();
  const [currentWorkspace, setCurrentWorkspace] =
    useState<number>(workspace_id);
  const [isWorkspaceListOpen, setWorkspaceListOpen] = useState(false);
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>([]);
  const [isCreationalModalOpen, setIsCreationalModalOpen] = useState(false);

  const toggleWorkspaceListOpen = () =>
    setWorkspaceListOpen(!isWorkspaceListOpen);

  useEffect(() => {
    const fetchUserWorkspaces = async () => {
      const response = await fetch("http://localhost:3000/workspaces", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const workspaces = await response.json();
        setWorkspaceList(workspaces);
      }
    };

    fetchUserWorkspaces();
  }, []);

  return (
    <Fragment>
      <div className={styles["workspace"]} onClick={toggleWorkspaceListOpen}>
        <span>
          <span className={styles["current-workspace"]}>
            {currentWorkspace
              ? workspaceList.find(
                  (workspace) => workspace.workspace_id == currentWorkspace
                )?.workspace_name ||
                workspaceList[0]?.workspace_name ||
                "no workspace"
              : workspaceList[0]?.workspace_name || "no workspace"}
          </span>
        </span>
      </div>
      {isWorkspaceListOpen ? (
        <div className={styles["workspace-list-container-outer"]}>
          <div className={styles["workspace-list-container-inner"]}>
            <p className={styles["workspace-list-title"]}>Workspaces</p>
            <div className={styles["workspace-list"]}>
              {workspaceList.map((workspace) => (
                <div
                  key={workspace.workspace_id}
                  className={styles["workspace"]}
                  onClick={() => {
                    toggleWorkspaceListOpen();
                    setCurrentWorkspace(workspace.workspace_id);
                    router.push(
                      `/workspaces/${workspace.workspace_id}/dashboard`
                    );
                  }}
                >
                  <span className={styles["workspace-title"]}>
                    {workspace.workspace_name}
                  </span>
                </div>
              ))}
            </div>
            <div
              className={styles["workspace-creational-button"]}
              onClick={() => setIsCreationalModalOpen(true)}
            >
              <span>+ Create Workspace</span>
            </div>
          </div>
        </div>
      ) : null}
      {isCreationalModalOpen ? (
        <Fragment>
          <div className={styles["dark-overlay"]} />
          <div className={styles["modal-container"]}>
            <CreationalModal
              onCancelHandler={() => setIsCreationalModalOpen(false)}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
