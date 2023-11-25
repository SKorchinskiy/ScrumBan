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

export default function Workspace() {
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
          backgroundColor: "#392F53",
          width: "95%",
          height: "95%",
          borderRadius: "10px",
        }}
      />
    </div>
  );
}
