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
          <div className={styles["projects-list"]}>
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
                  <span className={styles["project-data"]}>
                    {project.project_name}
                  </span>
                </div>
                <div>
                  <p className={styles["project-data"]}>
                    {project.project_description}
                  </p>
                </div>
                <div>
                  <p className={styles["project-data"]}>
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
          <div className={styles["dark-overlay"]} />
          <div className={styles["creational-modal-container"]}>
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
