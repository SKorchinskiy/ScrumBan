"use client";

import styles from "./page.module.css";
import ActivityGraph from "./_components/activity-graph/activity-graph.component";
import ActivityOverview from "./_components/activity-overview/activity-overview.component";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ProjectProps } from "@/app/types/types";

export default function Dashboard() {
  const [workspaceProjects, setWorkspaceProjects] = useState<ProjectProps[]>(
    []
  );
  const pathname = usePathname();
  const currentHour = useMemo(
    () => parseInt(new Date(Date.now()).toTimeString().split(":")[0]),
    []
  );
  const dayPeriod = useMemo(
    () =>
      currentHour < 12 && currentHour >= 5
        ? "morning"
        : currentHour >= 12 && currentHour < 18
        ? "afternoon"
        : "evening",
    [currentHour]
  );
  const workspaceId = useMemo(() => {
    const pathChunks = pathname.split("/");
    const workspaceIndex = pathChunks.findIndex((chunk) =>
      chunk.includes("workspaces")
    );
    return parseInt(pathChunks[workspaceIndex + 1]);
  }, [pathname]);

  useEffect(() => {
    const fetchWOrkspaceProjects = async () => {
      const response = await fetch(
        `http://localhost:8000/workspaces/${workspaceId}/projects`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const projects = await response.json();
        setWorkspaceProjects(projects);
      }
    };

    fetchWOrkspaceProjects();
  }, [workspaceId]);

  return (
    <div className={styles["specific-workspace-container"]}>
      <div className={styles["specific-workspace-board"]}>
        <h1 className={styles["user-greeting"]}>Good {dayPeriod}, dear user</h1>
        <ActivityOverview
          projects={workspaceProjects}
          workspaceId={workspaceId}
        />
        <ActivityGraph workspaceId={workspaceId} />
      </div>
    </div>
  );
}
