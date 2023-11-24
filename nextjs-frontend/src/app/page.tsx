"use client";

import SignInForm from "./_components/sign-in-form/sign-in-form.component";
import SignUpForm from "./_components/sign-up-form/sign-up-form.component";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [isSignInHidden, setIsSignInHidden] = useState(false);

  const toggleIsSignInHidden = () => setIsSignInHidden(!isSignInHidden);

  return (
    <div className={styles["home-page"]}>
      <div className={styles["page-body"]}>
        <h1 style={{ color: "white" }}>ScrumBan</h1>
        {isSignInHidden ? (
          <SignUpForm toggleIsSignInHidden={toggleIsSignInHidden} />
        ) : (
          <SignInForm toggleIsSignInHidden={toggleIsSignInHidden} />
        )}
      </div>
    </div>
  );
}
