"use client";

import styles from "./page.module.css";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";
import IssueCreationalModal from "../../_components/issue-creational-modal/issue-creational-modal.component";
import PanelHeader from "../../_components/panel-header/panel-header.component";
import IssuesBoard from "@/app/_components/issues-board/issues-board.component";
import { IssueProps, StateProps } from "@/app/types/types";

export default function Issues() {
  const pathname = usePathname();
  const workspaceId = useMemo(() => {
    const workspacePos = pathname.split("/").indexOf("workspaces");
    return parseInt(pathname.split("/")[workspacePos + 1]);
  }, [pathname]);

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [workspaceIssues, setWorkspaceIssues] = useState<IssueProps[]>([]);
  const [filteredIssues, setFilteredIssues] =
    useState<IssueProps[]>(workspaceIssues);
  const [states, setStates] = useState<StateProps[]>([]);

  useEffect(() => {
    const getWorkspaceStates = async () => {
      const response = await fetch(
        `http://ec2-18-193-109-186.eu-central-1.compute.amazonaws.com:8000/workspaces/${workspaceId}/states`,
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
    setFilteredIssues(workspaceIssues);
  }, [workspaceIssues]);

  useEffect(() => {
    const fetchWorkspaceIssues = async () => {
      const response = await fetch(
        `http://ec2-18-193-109-186.eu-central-1.compute.amazonaws.com:8000/workspaces/${workspaceId}/issues`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const issues = await response.json();
        setWorkspaceIssues(issues);
        setFilteredIssues(issues);
      }
    };

    fetchWorkspaceIssues();
  }, [workspaceId]);

  const issueRemovalHandler = async (issueId: number) => {
    await fetch(
      `http://ec2-18-193-109-186.eu-central-1.compute.amazonaws.com:8000/workspaces/${workspaceId}/issues/${issueId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    setWorkspaceIssues(
      workspaceIssues.filter((issue) => issue.issue_id !== issueId)
    );
  };

  const handleIssueChange = async (
    issueId: number,
    newStateColumnId: number
  ) => {
    const targetIssue = workspaceIssues.find(
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
      `http://ec2-18-193-109-186.eu-central-1.compute.amazonaws.com:8000/workspaces/${workspaceId}/projects/${targetIssue.project.project_id}/issues/${issueId}`,
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
      const updatedIssues: IssueProps[] = workspaceIssues.filter(
        (issue) => issue.issue_id !== updatedIssue.issue_id
      );
      updatedIssues.push(updatedIssue);
      setWorkspaceIssues(updatedIssues);
      setFilteredIssues(updatedIssues);
    }
  };

  const onIssueCreateHandler = (issue: IssueProps) =>
    setWorkspaceIssues((prev) => [...prev].concat([issue]));

  const changeUpdatedIssue = (issue: IssueProps) =>
    setWorkspaceIssues((prev) =>
      prev.map((current_issue) =>
        current_issue.issue_id === issue.issue_id ? issue : current_issue
      )
    );

  return (
    <Fragment>
      <PanelHeader
        inputPlaceholder="Type to filter issues..."
        creationalButtonText="Create Issue"
        onInputChangeHandler={(event) => {
          setFilteredIssues(
            workspaceIssues.filter((issue) =>
              issue.issue_title.toLowerCase().includes(event.target.value)
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
              onCancelHandler={() => setIsIssueModalOpen(false)}
              onIssueCreateHandler={onIssueCreateHandler}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
