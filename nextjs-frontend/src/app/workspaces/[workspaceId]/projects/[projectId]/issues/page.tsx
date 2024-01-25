"use client";

import PanelHeader from "@/app/workspaces/_components/panel-header/panel-header.component";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";
import { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import IssueCreationalModal from "@/app/workspaces/_components/issue-creational-modal/issue-creational-modal.component";
import IssuesBoard from "@/app/_components/issues-board/issues-board.component";
import StateCreationalModal from "@/app/workspaces/_components/state-creational-modal/state-creational-modal.component";
import { IssueProps, StateProps } from "@/app/types/types";

export default function Issues() {
  const pathname = usePathname();
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const workspaceId = useMemo(
    () =>
      parseInt(
        pathname.split("/")[
          pathname.split("/").findIndex((chunk) => chunk === "workspaces") + 1
        ]
      ),
    [pathname]
  );
  const projectId = useMemo(
    () =>
      parseInt(
        pathname.split("/")[
          pathname.split("/").findIndex((chunk) => chunk === "projects") + 1
        ]
      ),
    [pathname]
  );
  const [projectIssues, setProjectIssues] = useState<IssueProps[]>([]);
  const [filteredIssues, setFilteredIssues] =
    useState<IssueProps[]>(projectIssues);
  const [states, setStates] = useState<StateProps[]>([]);

  useEffect(() => {
    const getWorkspaceStates = async () => {
      const response = await fetch(
        `https://scrumban.site:8000/workspaces/${workspaceId}/states`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const workspaceStates = await response.json();
        setStates(workspaceStates);
      }
    };

    getWorkspaceStates();
  }, [workspaceId]);

  useEffect(() => {
    setFilteredIssues(projectIssues);
  }, [projectIssues]);

  useEffect(() => {
    const fetchProjectIssues = async () => {
      const response = await fetch(
        `https://scrumban.site:8000/workspaces/${workspaceId}/projects/${projectId}/issues`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const issues = await response.json();
        setProjectIssues(issues);
        setFilteredIssues(issues);
      }
    };

    fetchProjectIssues();
  }, [projectId, workspaceId]);

  const issueRemovalHandler = async (issueId: number) => {
    await fetch(
      `https://scrumban.site:8000/workspaces/${workspaceId}/projects/${projectId}/issues/${issueId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    setProjectIssues(
      projectIssues.filter((issue) => issue.issue_id !== issueId)
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
      `https://scrumban.site:8000/workspaces/${workspaceId}/projects/${projectId}/issues/${issueId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updateIssueDto }),
      }
    );
    if (response.ok) {
      const updatedIssue = (await response.json()) as IssueProps;
      const updatedIssues: IssueProps[] = projectIssues.filter(
        (issue) => issue.issue_id !== updatedIssue.issue_id
      );
      updatedIssues.push(updatedIssue);
      setProjectIssues(updatedIssues);
      setFilteredIssues(updatedIssues);
    }
  };

  const onIssueCreateHandler = (issue: IssueProps) =>
    setProjectIssues((prev) => [...prev].concat(issue));

  const changeUpdatedIssue = (issue: IssueProps) =>
    setProjectIssues((prev) =>
      prev.map((current_issue) =>
        current_issue.issue_id === issue.issue_id ? issue : current_issue
      )
    );

  return (
    <Fragment>
      <PanelHeader
        inputPlaceholder="Type to filter project issues..."
        creationalButtonText="Create Project Issue"
        onInputChangeHandler={(event: ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value;
          setFilteredIssues(
            projectIssues.filter((issue) =>
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
        changeUpdatedIssue={changeUpdatedIssue}
      />
      {isIssueModalOpen ? (
        <Fragment>
          <div className={styles["dark-overlay"]} />
          <div className={styles["creational-modal-container"]}>
            <IssueCreationalModal
              workspaceId={workspaceId}
              project_id={projectId}
              onIssueCreateHandler={onIssueCreateHandler}
              onCancelHandler={(shouldStateModalOpen: boolean) => {
                setIsIssueModalOpen(false);
                setIsStateModalOpen(shouldStateModalOpen);
              }}
            />
          </div>
        </Fragment>
      ) : null}
      {isStateModalOpen ? (
        <Fragment>
          <div className={styles["dark-overlay"]} />
          <div className={styles["creational-modal-container"]}>
            <StateCreationalModal
              workspaceId={workspaceId}
              onCancelHandler={() => setIsStateModalOpen(false)}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
