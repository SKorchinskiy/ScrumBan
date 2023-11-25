"use client";

import styles from "./workspace-list.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Workspace = {
  workspace_id: number;
  workspace_name: string;
  workspace_owner: number;
};

export default function WorkspaceList() {
  const router = useRouter();
  const [isWorkspaceListOpen, setWorkspaceListOpen] = useState(false);
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>([]);

  const toggleWorkspaceListOpen = () =>
    setWorkspaceListOpen(!isWorkspaceListOpen);

  useEffect(() => {
    const fetchUserWorkspaces = async () => {
      const response = await fetch("http://localhost:3000/workspaces", {
        method: "GET",
        credentials: "include",
      });
      const workspaces = await response.json();
      console.log(workspaces);
      setWorkspaceList(workspaces);
    };

    fetchUserWorkspaces();
  }, []);

  return !isWorkspaceListOpen ? (
    <div className={styles["workspace"]} onClick={toggleWorkspaceListOpen}>
      <span>
        {workspaceList.length
          ? workspaceList[0].workspace_name
          : "no workspace"}
      </span>
    </div>
  ) : (
    workspaceList.map((workspace) => (
      <div
        key={workspace.workspace_id}
        className={styles["workspace"]}
        onClick={() => router.push(`/workspaces/${workspace.workspace_id}`)}
      >
        <span>{workspace.workspace_name}</span>
      </div>
    ))
  );
}
