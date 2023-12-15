"use client";

import { ChangeEvent, useState } from "react";
import styles from "./state-creational-modal.module.css";

type StateProps = {
  state_name: string;
  state_color: string;
};

const initialStateData: StateProps = {
  state_name: "",
  state_color: "#ffffff",
};

type StateModalProps = {
  workspaceId: number;
  onCancelHandler: () => void;
};

export default function StateCreationalModal({
  workspaceId,
  onCancelHandler,
}: StateModalProps) {
  const [stateInfo, setStateInfo] = useState<StateProps>(initialStateData);

  const setStateInputData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStateInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createNewState = async () => {
    await fetch(`http://localhost:8000/workspaces/${workspaceId}/states`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...stateInfo }),
    });
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
      <h1 className={styles["heading"]}>Create State</h1>
      <div className={styles["input-container"]}>
        <input
          type="text"
          name="state_name"
          className={styles["modal-input"]}
          onChange={setStateInputData}
          placeholder="Enter your state name..."
        />
        <input
          type="color"
          defaultValue={initialStateData.state_color}
          name="state_color"
          className={styles["modal-input"]}
          onChange={setStateInputData}
          placeholder="Enter your issue description..."
        />
        <button
          className={styles["default-button"]}
          onClick={(e) => {
            createNewState();
            onCancelHandler();
          }}
        >
          create new state
        </button>
      </div>
    </div>
  );
}
