"use client";

import styles from "./page.module.css";
import { Fragment, useEffect, useState } from "react";
import { WorkspaceProject } from "../page";
import { useRouter } from "next/navigation";
import CreationalModal from "./_components/creational-modal/creational-modal.component";
import PanelHeader from "../../_components/panel-header/panel-header.component";

export default function Projects({
  params,
}: {
  params: { workspaceId: number };
}) {
  const [isCreationalModalOpen, setIsCreationalModalOpen] = useState(false);
  const router = useRouter();
  const [workspaceProjects, setWorkspaceProjects] = useState<
    WorkspaceProject[]
  >([]);
  const [filteredProjects, setFilteredProjects] =
    useState<WorkspaceProject[]>(workspaceProjects);

  const toggleCreationalModal = () =>
    setIsCreationalModalOpen(!isCreationalModalOpen);

  useEffect(() => {
    const fetchWorkspaceProjects = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${params.workspaceId}/projects`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const projects = await response.json();
        setWorkspaceProjects(projects);
        setFilteredProjects(projects);
      }
    };

    fetchWorkspaceProjects();
  }, [params.workspaceId]);

  return (
    <Fragment>
      <div className={styles["projects"]}>
        <div className={styles["projects-container"]}>
          <PanelHeader
            inputPlaceholder="Type to filter projects..."
            creationalButtonText="Create Project"
            onInputChangeHandler={(event) => {
              setFilteredProjects(
                workspaceProjects.filter((project) =>
                  project.project_name
                    .toLowerCase()
                    .includes(event.target.value)
                )
              );
            }}
            creationalButtonHandler={() => toggleCreationalModal()}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.project_id}
                className={styles["specific-project"]}
                onClick={() =>
                  router.push(
                    `/workspaces/${params.workspaceId}/projects/${project.project_id}`
                  )
                }
              >
                <div className={styles["specific-project-details"]}>
                  <span style={{ color: "white" }}>{project.project_name}</span>
                </div>
                <div>
                  <p style={{ color: "whitesmoke" }}>
                    {project.project_description}
                  </p>
                </div>
                <div>
                  <p style={{ color: "whitesmoke" }}>
                    {project.project_access}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isCreationalModalOpen ? (
        <Fragment>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
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
              workspace_id={params.workspaceId}
              onCancelHandler={() => setIsCreationalModalOpen(false)}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
