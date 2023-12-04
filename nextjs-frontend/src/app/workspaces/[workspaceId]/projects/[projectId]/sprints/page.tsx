"use client";

import { usePathname, useRouter } from "next/navigation";
import { WorkspaceProject } from "../../../page";
import styles from "./page.module.css";
import { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import PanelHeader from "@/app/workspaces/_components/panel-header/panel-header.component";
import SprintCreationalModal from "./_components/sprint-creational-modal/sprint-creational-modal.component";

type SprintProps = {
  sprint_id: number;
  sprint_title: string;
  sprint_description: string;
  sprint_start_date: string;
  sprint_end_date: string;
  project: WorkspaceProject;
};

export default function Sprints() {
  const router = useRouter();
  const pathname = usePathname();
  const workspaceId = useMemo(
    () =>
      pathname.split("/")[
        pathname.split("/").findIndex((chunk) => chunk === "workspaces") + 1
      ],
    [pathname]
  );
  const projectId = useMemo(
    () =>
      pathname.split("/")[
        pathname.split("/").findIndex((chunk) => chunk === "projects") + 1
      ],
    [pathname]
  );
  const [projectSprints, setProjectSprints] = useState<SprintProps[]>([]);
  const [filterProjectSprints, setFilteredProjectSprints] =
    useState<SprintProps[]>(projectSprints);
  const [isCreationalModalOpen, setIsCreationalModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjectSprints = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/projects/${projectId}/sprints`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const sprints = await response.json();
      setProjectSprints(sprints);
      setFilteredProjectSprints(sprints);
    };

    fetchProjectSprints();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "scroll",
          backgroundColor: "#392f53",
          width: "95%",
          height: "95%",
          borderRadius: "10px",
        }}
      >
        <PanelHeader
          inputPlaceholder="Type to filter sprints..."
          creationalButtonText="Create Sprint"
          onInputChangeHandler={(event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setFilteredProjectSprints(
              projectSprints.filter((sprint) =>
                sprint.sprint_title.toLowerCase().includes(value)
              )
            );
          }}
          creationalButtonHandler={() => setIsCreationalModalOpen(true)}
        />
        <div
          style={{
            backgroundColor: "#392F53",
            width: "95%",
            height: "95%",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              backgroundColor: "#39375B",
              margin: "15px",
              borderRadius: "10px 10px 0px 0px",
              padding: "5px",
              color: "whitesmoke",
              letterSpacing: "1px",
            }}
          >
            <div
              style={{
                backgroundColor: "#745C97",
                border: "1px solid rgba(0, 0, 0, 0.3)",
              }}
            >
              <p style={{ textAlign: "center" }}>Sprint Title</p>
            </div>
            <div
              style={{
                backgroundColor: "#745C97",
                border: "1px solid rgba(0, 0, 0, 0.3)",
              }}
            >
              <p style={{ textAlign: "center" }}>Sprint Description</p>
            </div>
            <div
              style={{
                backgroundColor: "#745C97",
                border: "1px solid rgba(0, 0, 0, 0.3)",
              }}
            >
              <p style={{ textAlign: "center" }}>Start Date</p>
            </div>
            <div
              style={{
                backgroundColor: "#745C97",
                border: "1px solid rgba(0, 0, 0, 0.3)",
              }}
            >
              <p style={{ textAlign: "center" }}>End Date</p>
            </div>
          </div>
          {filterProjectSprints.map((sprint) => (
            <div
              key={sprint.sprint_id}
              className={styles["sprints-container"]}
              onClick={() =>
                router.push(
                  `/workspaces/${workspaceId}/projects/${projectId}/sprints/${sprint.sprint_id}`
                )
              }
            >
              <div className={styles["sprint-details"]}>
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  {sprint.sprint_title}
                </p>
              </div>
              <div className={styles["sprint-details"]}>
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  {sprint.sprint_description}
                </p>
              </div>
              <div className={styles["sprint-details"]}>
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  {sprint.sprint_start_date}
                </p>
              </div>
              <div className={styles["sprint-details"]}>
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  {sprint.sprint_end_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isCreationalModalOpen ? (
        <Fragment>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <SprintCreationalModal
              workspaceId={workspaceId}
              projectId={projectId}
              onCancelHandler={() => setIsCreationalModalOpen(false)}
            />
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}
