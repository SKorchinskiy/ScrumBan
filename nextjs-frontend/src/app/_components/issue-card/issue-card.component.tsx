import { IssueProps } from "@/app/types/types";
import styles from "./issue-card.module.css";
import { DragEventHandler } from "react";

export default function IssueCard({
  dragStartHandler,
  toggleIssueModalState,
  onIssueUpdateHandler,
  issueRemovalHandler,
  issue,
}: {
  dragStartHandler: DragEventHandler<HTMLDivElement>;
  toggleIssueModalState: Function;
  onIssueUpdateHandler: Function;
  issueRemovalHandler: Function;
  issue: IssueProps;
}) {
  return (
    <div
      key={issue.issue_id}
      id={`draggable-issue-${issue.issue_id}`}
      className={styles["draggable-issue"]}
      draggable
      onDragStart={dragStartHandler}
    >
      <div className={styles["issue-header"]}>
        <span
          className={styles["issue-modal-update"]}
          onClick={() => {
            toggleIssueModalState();
            onIssueUpdateHandler(issue);
          }}
        >
          &#9998;
        </span>
        <span
          className={styles["issue-modal-close"]}
          onClick={() => issueRemovalHandler(issue.issue_id)}
        >
          &#x2715;
        </span>
      </div>
      <div>
        <span className={styles["issue-data"]}>{issue.issue_title}</span>
      </div>
      <div>
        <p className={styles["issue-data"]}>{issue.issue_description}</p>
      </div>
      <div>
        <p className={styles["issue-data"]}>{issue.issue_priority}</p>
      </div>
    </div>
  );
}
