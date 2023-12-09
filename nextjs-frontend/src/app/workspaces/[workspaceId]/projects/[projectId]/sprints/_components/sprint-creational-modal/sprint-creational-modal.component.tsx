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
    <div className={styles["modal-container"]}>
      <div
        className={styles["modal-container-header"]}
        onClick={() => onCancelHandler()}
      >
        <p className={styles["modal-container-close"]}>&#x2715;</p>
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
