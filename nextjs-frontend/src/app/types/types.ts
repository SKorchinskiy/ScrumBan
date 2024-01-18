export type WorkspaceState = {
  state_id: number;
  workspace_id: number;
  state_name: string;
  state_color: string;
};

export type WorkspaceStats = {
  countOfActivities: number;
  createdAt: string;
};

export type WorkspaceProject = {
  project_id: number;
  project_name: string;
  project_description: string;
  workspace_id: number;
  project_access: "public" | "private";
  sprints: Iterable<any>;
  labels: Iterable<any>;
  states: Iterable<any>;
  issues: Iterable<any>;
};

export type ProjectProps = {
  project_id: number;
  project_name: string;
  project_description: string;
  workspace_id: number;
  project_access: string;
};

export type StateProps = {
  state_id: number;
  state_name: string;
  state_color: string;
  workspace_id: number;
};

export type IssueParams = {
  issue_title: string;
  issue_description: string;
  issue_priority: "None" | "Low" | "Medium" | "High" | "Urgent";
  issue_state_id: number;
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

export type IssuesBoardProps = {
  workspaceId: number;
  issues: IssueProps[];
  states: StateProps[];
  handleIssueChange: (issueId: number, newStateColumnId: number) => void;
  issueRemovalHandler: (issueId: number) => void;
  changeUpdatedIssue: Function;
};

export type SprintProps = {
  sprint_id: number;
  sprint_title: string;
  sprint_description: string;
  sprint_start_date: string;
  sprint_end_date: string;
};
