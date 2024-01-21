"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Verify({ params }: { params: { token: string } }) {
  const router = useRouter();

  useEffect(() => {
    fetch(
      ` http://ec2-18-193-109-186.eu-central-1.compute.amazonaws.com:8000/auth/verify-account/${params.token}`
    ).then(() => {
      router.push("/");
    });
  }, [router, params.token]);

  return <h1>Redirecting...</h1>;
}
