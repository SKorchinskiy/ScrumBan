"use client";
import { FormFrame } from "../form-frame/form-frame.component";
import styles from "./sign-up-form.module.css";
import { ChangeEvent, MouseEvent, useState } from "react";

type SignUpFormProps = {
  toggleIsSignInHidden: () => void;
};

type UserSignUpData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  display_name: string;
};

const initialUserSignUpData: UserSignUpData = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  display_name: "",
};

export default function SignUpForm({ toggleIsSignInHidden }: SignUpFormProps) {
  const [isNextSubform, setIsNextSubform] = useState(false);
  const [userInfo, setUserInfo] = useState<UserSignUpData>(
    initialUserSignUpData
  );

  const setUserInputData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registerUser = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetch(
      "http://ec2-18-193-109-186.eu-central-1.compute.amazonaws.com:8000/auth/sign-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...userInfo,
        }),
      }
    );
  };

  return (
    <form className={styles["sign-up-form"]}>
      <div className={styles["form-header"]}>
        <h2
          className={styles["inactive-heading"]}
          onClick={() => toggleIsSignInHidden()}
        >
          Sign in
        </h2>
        <h2 className={styles["active-heading"]}>Sign up</h2>
      </div>
      <div className={styles["form-body"]}>
        <div className={styles["body-input"]}>
          <div className={styles["input-container"]}>
            {isNextSubform ? (
              <>
                <input
                  type="text"
                  className={styles["sign-up-input"]}
                  name="first_name"
                  value={userInfo.first_name}
                  onChange={setUserInputData}
                  placeholder="Enter your first name..."
                ></input>
                <input
                  type="text"
                  className={styles["sign-up-input"]}
                  name="last_name"
                  value={userInfo.last_name}
                  onChange={setUserInputData}
                  placeholder="Enter your last name..."
                ></input>
                <input
                  type="text"
                  className={styles["sign-up-input"]}
                  name="display_name"
                  value={userInfo.display_name}
                  onChange={setUserInputData}
                  placeholder="Enter name to display..."
                ></input>
                <button
                  className={styles["default-button"]}
                  onClick={(e) => registerUser(e)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <input
                  type="email"
                  className={styles["sign-up-input"]}
                  name="email"
                  value={userInfo.email}
                  onChange={setUserInputData}
                  placeholder="Enter your email address..."
                ></input>
                <input
                  type="password"
                  className={styles["sign-up-input"]}
                  name="password"
                  value={userInfo.password}
                  onChange={setUserInputData}
                  placeholder="Enter your password..."
                ></input>
                <button
                  className={styles["default-button"]}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsNextSubform(true);
                  }}
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
        <FormFrame />
      </div>
    </form>
  );
}
