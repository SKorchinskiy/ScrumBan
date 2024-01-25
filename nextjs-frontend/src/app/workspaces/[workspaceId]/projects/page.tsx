"use client";

import styles from "./page.module.css";
import { Fragment, useEffect, useState } from "react";
import CreationalModal from "./_components/creational-modal/creational-modal.component";
import PanelHeader from "../../_components/panel-header/panel-header.component";
import ProjectList from "./_components/project-list/project-list.component";
import { WorkspaceProject } from "@/app/types/types";

export default function Projects({
  params,
}: {
  params: { workspaceId: number };
}) {
  const [isCreationalModalOpen, setIsCreationalModalOpen] = useState(false);
  const [workspaceProjects, setWorkspaceProjects] = useState<
    WorkspaceProject[]
  >([]);
  const [filteredProjects, setFilteredProjects] =
    useState<WorkspaceProject[]>(workspaceProjects);

  const toggleCreationalModal = () =>
    setIsCreationalModalOpen(!isCreationalModalOpen);

  const projectRemovalHandler = async (projectId: number) => {
    await fetch(
      `https://scrumban.site:8000/workspaces/${params.workspaceId}/projects/${projectId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    setWorkspaceProjects((currentProjects) =>
      currentProjects.filter((project) => +project.project_id !== +projectId)
    );
  };

  useEffect(() => {
    setFilteredProjects(workspaceProjects);
  }, [workspaceProjects]);

  useEffect(() => {
    const fetchWorkspaceProjects = async () => {
      const response = await fetch(
        `https://scrumban.site:8000/workspaces/${params.workspaceId}/projects`,
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
      <PanelHeader
        inputPlaceholder="Type to filter projects..."
        creationalButtonText="Create Project"
        onInputChangeHandler={(event) => {
          setFilteredProjects(
            workspaceProjects.filter((project) =>
              project.project_name.toLowerCase().includes(event.target.value)
            )
          );
        }}
        creationalButtonHandler={() => toggleCreationalModal()}
      />
      <ProjectList
        projects={filteredProjects}
        projectRemovalHandler={projectRemovalHandler}
      />
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
