"use client";

import { useRouter } from "next/navigation";
import { FormFrame } from "../form-frame/form-frame.component";
import styles from "./sign-in-form.module.css";
import { ChangeEvent, MouseEvent, useState } from "react";

type UserSignInProps = {
  toggleIsSignInHidden: () => void;
};

type UserSignInData = {
  email: string;
  password: string;
};

const initialUserSignInData: UserSignInData = {
  email: "",
  password: "",
};

export default function SignInForm({ toggleIsSignInHidden }: UserSignInProps) {
  const [userInfo, setUserInfo] = useState<UserSignInData>(
    initialUserSignInData
  );

  const router = useRouter();

  const setUserInputData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signUserIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const fetchUser = async (data: UserSignInData) => {
      const response = await fetch("https://scrumban.site:8000/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...data,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        if (user.accessToken) {
          const workspaces = await (
            await fetch("https://scrumban.site:8000/workspaces", {
              method: "GET",
              credentials: "include",
            })
          ).json();
          if (!workspaces?.length) {
            router.push("/workspaces");
          } else {
            router.push(`/workspaces/${workspaces[0].workspace_id}/dashboard`);
          }
        }
      }
    };

    fetchUser(userInfo);
  };

  return (
    <form className={styles["sign-in-form"]}>
      <div className={styles["form-header"]}>
        <h2 className={styles["active-heading"]}>Sign in</h2>
        <h2
          className={styles["inactive-heading"]}
          onClick={() => toggleIsSignInHidden()}
        >
          Sign up
        </h2>
      </div>
      <div className={styles["form-body"]}>
        <div className={styles["body-input"]}>
          <div className={styles["input-container"]}>
            <input
              type="email"
              name="email"
              className={styles["sign-in-input"]}
              onChange={setUserInputData}
              placeholder="Enter your email address..."
            ></input>
            <input
              type="password"
              name="password"
              className={styles["sign-in-input"]}
              onChange={setUserInputData}
              placeholder="Enter your password..."
            ></input>
            <button
              className={styles["default-button"]}
              onClick={(e) => signUserIn(e)}
            >
              Sign in
            </button>{" "}
          </div>
        </div>
        <FormFrame />
      </div>
    </form>
  );
}
