"use client";

import IssuesBoard from "@/app/_components/issues-board/issues-board.component";
import styles from "./page.module.css";
import PanelHeader from "@/app/workspaces/_components/panel-header/panel-header.component";
import { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import IssueSelector from "../_components/issue-selector/issue-selector.component";
import { usePathname } from "next/navigation";

export type StateProps = {
  state_id: number;
  state_name: string;
  state_color: string;
  workspace_id: number;
};

export type ProjectProps = {
  project_id: number;
  project_name: string;
  project_description: string;
  workspace_id: number;
  project_access: string;
};

export type SprintProps = {
  sprint_id: number;
  sprint_title: string;
  sprint_description: string;
  sprint_start_date: string;
  sprint_end_date: string;
};

export type IssueProps = {
  issue_id: number;
  issue_title: string;
  issue_description: string;
  issue_priority: "None" | "Low" | "Medium" | "High" | "Urgent";
  project: ProjectProps;
  issue_state: StateProps;
  sprint: SprintProps | null;
};

export default function Sprint() {
  const pathname = usePathname();
  const workspaceId = useMemo(() => {
    const worksapceIdPos =
      pathname.split("/").findIndex((chunk) => chunk.includes("workspaces")) +
      1;
    return parseInt(pathname.split("/")[worksapceIdPos]);
  }, [pathname]);
  const projectId = useMemo(() => {
    const projectIdPos =
      pathname.split("/").findIndex((chunk) => chunk.includes("projects")) + 1;
    return parseInt(pathname.split("/")[projectIdPos]);
  }, [pathname]);
  const sprintId = useMemo(() => {
    const sprintIdPos =
      pathname.split("/").findIndex((chunk) => chunk.includes("sprints")) + 1;
    return parseInt(pathname.split("/")[sprintIdPos]);
  }, [pathname]);
  const [projectIssues, setProjectIssues] = useState<IssueProps[]>([]);
  const sprintIssues = useMemo(
    () =>
      projectIssues.filter(
        (issue) => issue.sprint && issue.sprint.sprint_id === sprintId
      ),
    [projectIssues, sprintId]
  );
  const [filteredIssues, setFilteredIssues] =
    useState<IssueProps[]>(sprintIssues);
  useState<IssueProps[]>(sprintIssues);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [states, setStates] = useState<StateProps[]>([]);

  useEffect(() => {
    const getWorkspaceStates = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/states`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const workspaceStates = await response.json();
      setStates(workspaceStates);
    };

    getWorkspaceStates();
  }, []);

  useEffect(() => {
    setFilteredIssues(
      projectIssues.filter(
        (issue) => issue.sprint && issue.sprint.sprint_id === sprintId
      )
    );
  }, [projectIssues, sprintId]);

  useEffect(() => {
    const fetchSprintIssues = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/projects/${projectId}/issues`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const issues: IssueProps[] = await response.json();
        setProjectIssues(issues);
      }
    };

    fetchSprintIssues();
  }, []);

  const issueRemovalHandler = async (issueId: number) => {
    await fetch(
      `http://localhost:3000/workspaces/${workspaceId}/projects/${projectId}/sprints/${sprintId}/issues/${issueId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    setProjectIssues(
      projectIssues.map((issue) => {
        if (issue.issue_id !== issueId) return issue;
        return {
          ...issue,
          sprint: null,
        };
      })
    );
  };

  const handleIssueChange = async (
    issueId: number,
    newStateColumnId: number
  ) => {
    const targetIssue = projectIssues.find(
      (issue) => issue.issue_id === issueId
    );
    if (!targetIssue || !newStateColumnId) return;
    const updateIssueDto = {
      issue_title: targetIssue.issue_title,
      issue_description: targetIssue.issue_description,
      issue_priority: targetIssue.issue_priority,
      issue_state_id: newStateColumnId,
    };
    const response = await fetch(
      `http://localhost:3000/workspaces/${workspaceId}/projects/${projectId}/issues/${issueId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updateIssueDto }),
      }
    );
    const updatedIssue = (await response.json()) as IssueProps;
    const updatedIssues: IssueProps[] = projectIssues.filter(
      (issue) => issue.issue_id !== updatedIssue.issue_id
    );
    updatedIssues.push(updatedIssue);
    setProjectIssues(updatedIssues);
    setFilteredIssues(
      updatedIssues.filter((issue) => issue.sprint?.sprint_id === sprintId)
    );
  };

  const issueUpdateHandler = async (sprintIssueIds: number[]) => {
    const addIssuesToSprint = projectIssues.filter(
      (projectIssue) =>
        sprintIssueIds.includes(projectIssue.issue_id) &&
        !sprintIssues
          .map((issue) => issue.issue_id)
          .includes(projectIssue.issue_id)
    );
    const removeIssuesFromSprint = sprintIssues.filter(
      (sprintIssue) => !sprintIssueIds.includes(sprintIssue.issue_id)
    );

    for await (let issue of addIssuesToSprint) {
      await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/projects/${projectId}/sprints/${sprintId}/issues/${issue.issue_id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    }

    for await (let issue of removeIssuesFromSprint) {
      await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/projects/${projectId}/sprints/${sprintId}/issues/${issue.issue_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
    }

    setIsIssueModalOpen(false);
  };

  return (
    <div className={styles["sprint-page"]}>
      <div className={styles["sprint-page-body"]}>
        <PanelHeader
          inputPlaceholder="Type to filter sprint issues..."
          creationalButtonText="Update Issues"
          onInputChangeHandler={(event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setFilteredIssues(
              sprintIssues.filter((issue) =>
                issue.issue_title.toLowerCase().includes(value)
              )
            );
          }}
          creationalButtonHandler={() => setIsIssueModalOpen(true)}
        />
        <IssuesBoard
          workspaceId={workspaceId}
          issues={filteredIssues}
          states={states}
          handleIssueChange={handleIssueChange}
          issueRemovalHandler={issueRemovalHandler}
        />
      </div>
      {isIssueModalOpen ? (
        <Fragment>
          <div className={styles["dark-overlay"]} />
          <div className={styles["issue-selector-container"]}>
            <IssueSelector
              issues={projectIssues}
              sprintIssues={sprintIssues}
              issueUpdateHandler={issueUpdateHandler}
            />
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}
