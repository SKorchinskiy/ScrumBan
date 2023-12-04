"use client";

import styles from "./sidebar.module.css";
import { Fragment, useEffect, useState } from "react";
import WorkspaceList from "../workspace-list/workspace-list.component";
import { WorkspaceProject } from "../../[workspaceId]/page";
import { usePathname, useRouter } from "next/navigation";
import IssueCreationalModal from "../creational-modal/issue-creational-modal.component";
import ProjectRepresentation from "../project-representation/project-representation.component";
import StateCreationalModal from "../creational-modal/state-creational-modal.component";

export type WorkspaceState = {
  state_id: number;
  workspace_id: number | string;
  state_name: string;
  state_color: string;
};

export default function SideBar({ workspace_id }: { workspace_id: number }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isIssueCreationalModalOpen, setIsIssueCreationalModalOpen] =
    useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [workspaceProjects, setWorkspaceProjects] = useState<
    WorkspaceProject[]
  >([]);

  const toggleIssueCreationalModalOpen = () =>
    setIsIssueCreationalModalOpen(!isIssueCreationalModalOpen);

  useEffect(() => {
    const fetchUserProjects = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${workspace_id}/projects`,
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
  }, []);

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
            <div className={styles["general-option"]}>
              <p>Dashboard</p>
            </div>
            <div
              className={styles["general-option"]}
              onClick={() => {
                const pathChunks = pathname.split("/");
                const workspaceChunkIndex = pathChunks.findIndex(
                  (value) => value === "workspaces"
                );
                if (workspaceChunkIndex !== pathChunks.length - 1) {
                  router.push(
                    `/workspaces/${
                      pathChunks[workspaceChunkIndex + 1]
                    }/projects`
                  );
                }
              }}
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
            <h3 style={{ margin: "0px", color: "white" }}>Projects</h3>
            <div
              className={styles["projects-list"]}
              style={{ padding: "10px" }}
            >
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
          <div
            style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
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
          <div
            style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
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
            <StateCreationalModal
              workspaceId={workspace_id}
              onCancelHandler={() => {
                setIsStateModalOpen(false);
              }}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
