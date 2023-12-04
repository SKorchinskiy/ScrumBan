import { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./sprint-creational-modal.module.css";

type SprintParams = {
  sprint_title: string;
  sprint_description: string;
  sprint_start_date: string;
  sprint_end_date: string;
};

const initialSprintData: SprintParams = {
  sprint_title: "",
  sprint_description: "",
  sprint_start_date: Date.toString(),
  sprint_end_date: Date.toString(),
};

type SprintCreationalModalProps = {
  workspaceId: string;
  projectId: string;
  onCancelHandler: () => void;
};

export default function SprintCreationalModal({
  workspaceId,
  projectId,
  onCancelHandler,
}: SprintCreationalModalProps) {
  const [sprintInfo, setSprintInfo] = useState<SprintParams>(initialSprintData);

  const setSprintInputData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSprintInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createNewSprint = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await fetch(
      `http://localhost:3000/workspaces/${workspaceId}/projects/${projectId}/sprints`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...sprintInfo }),
      }
    );
    onCancelHandler();
  };

  return (
    <div
      className={styles["modal-container"]}
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 20,
          right: 20,
          width: "10px",
          height: "10px",
          background: "rgba(24, 18, 41, 0.3)",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => onCancelHandler()}
      >
        <p
          style={{
            color: "white",
          }}
        >
          &#x2715;
        </p>
      </div>
      <h1 className={styles["heading"]}>Create Sprint</h1>
      <div className={styles["input-container"]}>
        <input
          type="text"
          name="sprint_title"
          className={styles["modal-input"]}
          onChange={setSprintInputData}
          placeholder="Enter your sprint name..."
        />
        <input
          type="text"
          name="sprint_description"
          className={styles["modal-input"]}
          onChange={setSprintInputData}
          placeholder="Enter your sprint description..."
        />
        <input
          type="date"
          name="sprint_start_date"
          className={styles["modal-input"]}
          onChange={setSprintInputData}
          placeholder="Enter sprint start date"
        />
        <input
          type="date"
          name="sprint_end_date"
          className={styles["modal-input"]}
          onChange={setSprintInputData}
          placeholder="Enter sprint end date"
        />
        <button
          className={styles["default-button"]}
          onClick={(e) => createNewSprint(e)}
        >
          create new sprint
        </button>
      </div>
    </div>
  );
}
