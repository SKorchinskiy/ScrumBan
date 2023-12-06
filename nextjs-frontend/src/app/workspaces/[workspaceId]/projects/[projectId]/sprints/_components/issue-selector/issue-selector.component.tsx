import { useState } from "react";
import { IssueProps } from "../../[sprintId]/page";

type IssueSelectorProps = {
  issues: IssueProps[];
  sprintIssues: IssueProps[];
  issueUpdateHandler: (_: number[]) => void;
};

export default function IssueSelector({
  issues,
  sprintIssues,
  issueUpdateHandler,
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
    <div
      style={{
        backgroundColor: "#443C68",
        padding: "50px",
        color: "white",
        borderRadius: "10px",
        boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.8)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px",
          fontWeight: "bold",
          textTransform: "uppercase",
          textShadow: "2px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        Choose issues to add / remove
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          overflow: "scroll",
          height: "300px",
          boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        {issues.map((issue) => (
          <div
            key={issue.issue_id}
            onClick={(e) => toggleIssueInclusion(issue)}
            style={{
              background: selectedIssues.includes(issue.issue_id)
                ? "#373053"
                : "rgba(131, 126, 150)",
              cursor: "pointer",
              userSelect: "none",
              padding: "15px",
              borderRadius: "5px",
              margin: "10px",
              boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h3>{issue.issue_title}</h3>
          </div>
        ))}
      </div>
      <div
        style={{
          border: 0,
          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
          borderRadius: "5px",
          padding: "20px",
          color: "white",
          backgroundColor: "#3e76fe",
          fontWeight: "bold",
          marginTop: "20px",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "center",
          width: "90%",
          userSelect: "none",
          cursor: "pointer",
        }}
        onClick={() => {
          issueUpdateHandler(selectedIssues);
        }}
      >
        Update sprint issues
      </div>
    </div>
  );
}
