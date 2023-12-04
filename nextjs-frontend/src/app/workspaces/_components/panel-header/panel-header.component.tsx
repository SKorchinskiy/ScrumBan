"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

type PanelHeaderProps = {
  inputPlaceholder: string;
  creationalButtonText: string;
  onInputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  creationalButtonHandler: () => void;
};

export default function PanelHeader({
  inputPlaceholder,
  creationalButtonText,
  onInputChangeHandler,
  creationalButtonHandler,
}: PanelHeaderProps) {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#2D2643",
        width: "100%",
        borderRadius: "10px 10px 0 0",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "50%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "50%",
            color: "whitesmoke",
          }}
        >
          <div
            style={{
              marginRight: "50px",
              backgroundColor: "#443C68",
              padding: "10px",
              borderRadius: "10px",
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => router.back()}
          >
            Back
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          style={{
            width: "300px",
            height: "30px",
            color: "white",
            background: "#443C68",
            border: "none",
            borderRadius: "5px",
          }}
          placeholder={inputPlaceholder}
          type="text"
          onChange={onInputChangeHandler}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "50%",
          color: "whitesmoke",
        }}
      >
        <div
          style={{
            marginRight: "50px",
            backgroundColor: "#443C68",
            padding: "10px",
            borderRadius: "10px",
            userSelect: "none",
            cursor: "pointer",
          }}
          onClick={() => creationalButtonHandler()}
        >
          {creationalButtonText}
        </div>
      </div>
    </div>
  );
}
