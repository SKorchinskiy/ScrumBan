import { useMemo } from "react";

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

type IssuesBoardProps = {
  issues: IssueProps[];
};

export default function IssuesBoard({ issues }: IssuesBoardProps) {
  const states: StateProps[] = useMemo(() => {
    const getUniqueIssueStates = () => {
      const duplicateStates = issues.map((issue) => issue.issue_state);
      duplicateStates.sort(
        (stateA, stateB) => stateA.state_id - stateB.state_id
      );
      let prevState = {} as StateProps;
      return duplicateStates.filter((state) => {
        const flag = prevState?.state_id !== state.state_id;
        prevState = state;
        return flag;
      });
    };

    return getUniqueIssueStates();
  }, [issues]);

  return (
    <div className="main">
      <div
        className="header"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${states.length}, 1fr)`,
          overflow: "scroll",
        }}
      >
        {states.map((state) => (
          <div key={state.state_id}>{state.state_name}</div>
        ))}
      </div>
      <div
        className="body"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${states.length}, 1fr)`,
        }}
      >
        {states.map((state) => (
          <div
            key={state.state_id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#443C68",
              margin: "10px",
              borderRadius: "10px",
              overflow: "scroll",
            }}
          >
            {issues
              .filter((issue) => issue.issue_state.state_id === state.state_id)
              .map((issue) => (
                <div
                  key={issue.issue_id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    backgroundColor: "#443c68",
                    width: "200px",
                    // height: "200px",
                    margin: "15px",
                    borderRadius: "10px",
                    padding: "5px",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
                    cursor: "pointer",
                    overflow: "scroll",
                  }}
                  draggable
                >
                  <div>
                    <span style={{ color: "white" }}>{issue.issue_title}</span>
                  </div>
                  <div>
                    <p style={{ color: "whitesmoke" }}>
                      {issue.issue_description}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "whitesmoke" }}>
                      {issue.issue_priority}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// .specific-issue {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-around;
//   background-color: #443c68;
//   width: 200px;
//   height: 200px;
//   margin: 15px;
//   border-radius: 10px;
//   padding: 5px;
//   box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
//   cursor: pointer;
// }

// .specific-issue-details {
//   textalign: center;
//   backgroundcolor: #4d3c77;
//   borderradius: 3px;
//   width: 90%;
//   boxshadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
//   padding: 3px;
// }
