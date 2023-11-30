"use client";

import styles from "./page.module.css";
import { Fragment, useEffect, useState } from "react";
import { WorkspaceProject } from "../page";
import { useRouter } from "next/navigation";
import CreationalModal from "./_components/creational-modal/creational-modal.component";

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
          <div
            style={{
              display: "flex",
              backgroundColor: "#2D2643",
              width: "100%",
              borderRadius: "10px 10px 0 0",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "50%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "50%",
                  color: "whitesmoke",
                }}
              >
                <div
                  style={{
                    marginRight: "50px",
                    backgroundColor: "#443C68",
                    padding: "10px",
                    borderRadius: "10px",
                    userSelect: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => router.back()}
                >
                  Back
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                style={{
                  width: "300px",
                  height: "30px",
                  color: "white",
                  background: "#443C68",
                  border: "none",
                  borderRadius: "5px",
                }}
                placeholder="Type to filter projects..."
                type="text"
                onChange={(event) => {
                  setFilteredProjects(
                    workspaceProjects.filter((project) =>
                      project.project_name
                        .toLowerCase()
                        .includes(event.target.value)
                    )
                  );
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "50%",
                color: "whitesmoke",
              }}
            >
              <div
                style={{
                  marginRight: "50px",
                  backgroundColor: "#443C68",
                  padding: "10px",
                  borderRadius: "10px",
                  userSelect: "none",
                  cursor: "pointer",
                }}
                onClick={() => toggleCreationalModal()}
              >
                Create Project
              </div>
            </div>
          </div>
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
            <CreationalModal workspace_id={params.workspaceId} />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
