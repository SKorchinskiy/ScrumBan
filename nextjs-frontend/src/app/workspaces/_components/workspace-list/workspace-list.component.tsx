"use client";

import styles from "./workspace-list.module.css";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import CreationalModal from "../creational-modal/creational-modal.component";

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
          <span style={{ userSelect: "none" }}>
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
        <div
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              margin: "5px",
              padding: "10px",
              position: "absolute",
              backgroundColor: "#2D2643",
              left: 0,
              right: 0,
              top: 0,
              height: "270px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              overflow: "scroll",
              borderRadius: "10px",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <p style={{ color: "whitesmoke", userSelect: "none" }}>
              Workspaces
            </p>
            <div
              style={{
                height: "150px",
                overflow: "scroll",
              }}
            >
              {workspaceList.map((workspace) => (
                <div
                  key={workspace.workspace_id}
                  className={styles["workspace"]}
                  onClick={() => {
                    toggleWorkspaceListOpen();
                    setCurrentWorkspace(workspace.workspace_id);
                    router.push(`/workspaces/${workspace.workspace_id}`);
                  }}
                >
                  <span style={{ userSelect: "none" }}>
                    {workspace.workspace_name}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                bottom: "20px",
                color: "whitesmoke",
                textAlign: "center",
                backgroundColor: "#241E35",
                padding: "10px",
                borderRadius: "10px",
                width: "80%",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
                cursor: "pointer",
                userSelect: "none",
                fontSize: "14px",
              }}
              onClick={() => setIsCreationalModalOpen(true)}
            >
              <span>+ Create Workspace</span>
            </div>
          </div>
        </div>
      ) : null}
      {isCreationalModalOpen ? (
        <Fragment>
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
              translate: "-50% -50%",
            }}
          >
            <CreationalModal
              onCancelHandler={() => {
                setIsCreationalModalOpen(false);
              }}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
