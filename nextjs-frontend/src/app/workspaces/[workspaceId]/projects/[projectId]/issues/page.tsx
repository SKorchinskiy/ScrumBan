"use client";

import PanelHeader from "@/app/workspaces/_components/panel-header/panel-header.component";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";
import { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import IssueCreationalModal from "@/app/workspaces/_components/creational-modal/issue-creational-modal.component";
import IssuesBoard from "@/app/_components/issues-board/issues-board.component";
import StateCreationalModal from "@/app/workspaces/_components/creational-modal/state-creational-modal.component";

type StateProps = {
  state_id: number;
  state_name: string;
  state_color: string;
  workspace_id: number;
};

type ProjectProps = {
  project_id: number;
  project_name: string;
  project_description: string;
  workspace_id: number;
  project_access: string;
};

type IssueProps = {
  issue_id: number;
  issue_title: string;
  issue_description: string;
  issue_priority: "None" | "Low" | "Medium" | "High" | "Urgent";
  project: ProjectProps;
  issue_state: StateProps;
};

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
    setFilteredIssues(projectIssues);
  }, [projectIssues]);

  useEffect(() => {
    const fetchProjectIssues = async () => {
      const response = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/projects/${projectId}/issues`,
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
  }, []);

  const issueRemovalHandler = async (issueId: number) => {
    await fetch(
      `http://localhost:3000/workspaces/${workspaceId}/projects/${projectId}/issues/${issueId}`,
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
    setFilteredIssues(updatedIssues);
  };

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
          backgroundColor: "#392f53",
          width: "950px",
          height: "95%",
          borderRadius: "10px",
        }}
      >
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
        />
      </div>
      {isIssueModalOpen ? (
        <Fragment>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
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
            <IssueCreationalModal
              workspaceId={workspaceId}
              project_id={projectId}
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
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
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
            <StateCreationalModal
              workspaceId={workspaceId}
              onCancelHandler={() => setIsStateModalOpen(false)}
            />
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}
