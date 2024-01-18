import { IssueProps } from "@/app/types/types";
import styles from "./issue-selector.module.css";
import { useState } from "react";

type IssueSelectorProps = {
  issues: IssueProps[];
  sprintIssues: IssueProps[];
  issueUpdateHandler: (_: number[]) => void;
  toggleIssueSelectorOpen: Function;
};

export default function IssueSelector({
  issues,
  sprintIssues,
  issueUpdateHandler,
  toggleIssueSelectorOpen,
}: IssueSelectorProps) {
  const [selectedIssues, setSelectedIssues] = useState<number[]>(
    sprintIssues.map((issue) => issue.issue_id)
  );

  const toggleIssueInclusion = (issue: IssueProps) => {
    const alreadyExists: boolean =
      selectedIssues.findIndex(
        (currentIssueId) => currentIssueId === issue.issue_id
      ) !== -1;

    if (alreadyExists) {
      setSelectedIssues(
        selectedIssues.filter(
          (currentIssueId) => currentIssueId !== issue.issue_id
        )
      );
    } else {
      const newSelectedIssues = [...selectedIssues];
      newSelectedIssues.push(issue.issue_id);
      setSelectedIssues(newSelectedIssues);
    }
  };

  return (
    <div className={styles["issue-selector"]}>
      <div className={styles["selector-header"]}>
        Choose issues to add / remove
        <div
          className={styles["issue-header"]}
          onClick={() => toggleIssueSelectorOpen()}
        >
          <p className={styles["issue-close-sign"]}>&#x2715;</p>
        </div>
      </div>
      <div className={styles["project-issues"]}>
        {issues.map((issue) => (
          <div
            key={issue.issue_id}
            onClick={(e) => toggleIssueInclusion(issue)}
            className={styles["specific-project-issue"]}
            style={{
              background: selectedIssues.includes(issue.issue_id)
                ? "#373053"
                : "rgba(131, 126, 150)",
            }}
          >
            <h3>{issue.issue_title}</h3>
          </div>
        ))}
      </div>
      <div
        className={styles["sprint-update-button"]}
        onClick={() => issueUpdateHandler(selectedIssues)}
      >
        Update sprint issues
      </div>
    </div>
  );
}
