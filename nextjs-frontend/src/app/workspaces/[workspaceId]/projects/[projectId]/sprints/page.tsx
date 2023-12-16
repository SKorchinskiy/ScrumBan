"use client";

import { usePathname, useRouter } from "next/navigation";
import { WorkspaceProject } from "../../page";
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
        `http://localhost:8000/workspaces/${workspaceId}/projects/${projectId}/sprints`,
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
    <div className={styles["sprint-page"]}>
      <div className={styles["sprint-page-body"]}>
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
        <div className={styles["sprint-table"]}>
          <div className={styles["sprint-table-header"]}>
            <div className={styles["table-header-column"]}>
              <p className={styles["table-column-name"]}>Sprint Title</p>
            </div>
            <div className={styles["table-header-column"]}>
              <p className={styles["table-column-name"]}>Sprint Description</p>
            </div>
            <div className={styles["table-header-column"]}>
              <p className={styles["table-column-name"]}>Start Date</p>
            </div>
            <div className={styles["table-header-column"]}>
              <p className={styles["table-column-name"]}>End Date</p>
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
                <p className={styles["sprint-details-data"]}>
                  {sprint.sprint_title}
                </p>
              </div>
              <div className={styles["sprint-details"]}>
                <p className={styles["sprint-details-data"]}>
                  {sprint.sprint_description}
                </p>
              </div>
              <div className={styles["sprint-details"]}>
                <p className={styles["sprint-details-data"]}>
                  {sprint.sprint_start_date}
                </p>
              </div>
              <div className={styles["sprint-details"]}>
                <p className={styles["sprint-details-data"]}>
                  {sprint.sprint_end_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isCreationalModalOpen ? (
        <Fragment>
          <div className={styles["dark-overlay"]} />
          <div className={styles["creational-modal-container"]}>
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
