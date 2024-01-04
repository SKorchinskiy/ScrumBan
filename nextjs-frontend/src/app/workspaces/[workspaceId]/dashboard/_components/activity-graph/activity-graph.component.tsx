"use client";

import styles from "./activity-graph.module.css";
import BoxShapedDay from "../box-shaped-day/box-shaped-day.component";
import { useEffect, useState } from "react";

export type WorkspaceStats = {
  countOfActivities: number;
  createdAt: string;
};

export default function ActivityGraph({
  workspaceId,
}: {
  workspaceId: number;
}) {
  const [yearWorkspaceStats, setYearWorkspaceStats] = useState<
    WorkspaceStats[]
  >([]);

  useEffect(() => {
    const fetchWorkspaceStats = async () => {
      const limit = 365;
      const response = await fetch(
        `http://localhost:8000/workspaces/${workspaceId}/stats/${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data: WorkspaceStats[] = await response.json();
      setYearWorkspaceStats(
        data.sort((a: WorkspaceStats, b: WorkspaceStats) => {
          if (a.createdAt == b.createdAt) return 0;
          if (a.createdAt < b.createdAt) return -1;
          return 1;
        })
      );
    };

    fetchWorkspaceStats();
  }, []);

  return (
    <div className={styles["activity-graph"]}>
      <div className={styles["activity-board"]}>
        {Array.from(Array(180)).map((_, index) => {
          const date = new Date(Date.now() - (180 - (index + 1)) * 86400000)
            .toISOString()
            .split("T")[0];
          const active = yearWorkspaceStats.reduce(
            (acc, element: WorkspaceStats) => acc || element.createdAt === date,
            false
          );
          return <BoxShapedDay key={index} isActive={active} date={date} />;
        })}
      </div>
    </div>
  );
}
