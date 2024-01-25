"use client";

import styles from "./sidebar.module.css";
import { Fragment, useEffect, useMemo, useState } from "react";
import WorkspaceList from "../workspace-list/workspace-list.component";
import { usePathname, useRouter } from "next/navigation";
import IssueCreationalModal from "../issue-creational-modal/issue-creational-modal.component";
import ProjectRepresentation from "../project-representation/project-representation.component";
import StateCreationalModal from "../state-creational-modal/state-creational-modal.component";
import { WorkspaceProject } from "@/app/types/types";

export default function SideBar({ workspace_id }: { workspace_id: number }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isIssueCreationalModalOpen, setIsIssueCreationalModalOpen] =
    useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [workspaceProjects, setWorkspaceProjects] = useState<
    WorkspaceProject[]
  >([]);
  const workspaceId = useMemo(() => {
    const pathChunks = pathname.split("/");
    const workspaceChunkIndex = pathChunks.findIndex(
      (value) => value === "workspaces"
    );
    return pathChunks[workspaceChunkIndex + 1];
  }, [pathname]);

  const toggleIssueCreationalModalOpen = () =>
    setIsIssueCreationalModalOpen(!isIssueCreationalModalOpen);

  const toggleStateCreationalModal = () =>
    setIsStateModalOpen(!isStateModalOpen);

  useEffect(() => {
    const fetchUserProjects = async () => {
      const response = await fetch(
        `https://scrumban.site:8000/workspaces/${workspace_id}/projects`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const projects = await response.json();
        setWorkspaceProjects(projects);
      }
    };

    fetchUserProjects();
  }, [workspace_id]);

  return (
    <Fragment>
      <div className={styles["sidebar-container"]}>
        <div className={styles["sidebar"]}>
          <WorkspaceList workspace_id={workspace_id} />
          <div className={styles["general"]}>
            <div
              className={styles["general-option"]}
              onClick={() => toggleIssueCreationalModalOpen()}
            >
              <p>Create new Issue</p>
            </div>
            <div
              className={styles["general-option"]}
              onClick={() => toggleStateCreationalModal()}
            >
              <p>Create new State</p>
            </div>
            <div
              className={styles["general-option"]}
              onClick={() =>
                router.push(`/workspaces/${workspaceId}/dashboard`)
              }
            >
              <p>Dashboard</p>
            </div>
            <div
              className={styles["general-option"]}
              onClick={() => router.push(`/workspaces/${workspaceId}/projects`)}
            >
              <p>Projects</p>
            </div>
            <div
              className={styles["general-option"]}
              onClick={() => router.push(`/workspaces/${workspace_id}/issues`)}
            >
              <p>All Issues</p>
            </div>
          </div>
          <div className={styles["projects-container"]}>
            <h3 className={styles["projects-list-title"]}>Projects</h3>
            <div className={styles["projects-list"]}>
              {workspaceProjects.map((project) => (
                <ProjectRepresentation
                  key={project.project_id}
                  project={project}
                  workspaceId={workspace_id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isIssueCreationalModalOpen ? (
        <Fragment>
          <div className={styles["dark-layout"]} />
          <div className={styles["issue-modal-container"]}>
            <IssueCreationalModal
              workspaceId={workspace_id}
              onCancelHandler={(openStateModal: boolean) => {
                setIsStateModalOpen(openStateModal);
                setIsIssueCreationalModalOpen(false);
              }}
            />
          </div>
        </Fragment>
      ) : null}
      {isStateModalOpen ? (
        <Fragment>
          <div className={styles["dark-layout"]} />
          <div className={styles["state-modal-container"]}>
            <StateCreationalModal
              workspaceId={workspace_id}
              onCancelHandler={() => setIsStateModalOpen(false)}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
