"use client";

import styles from "./activity-graph.module.css";
import BoxShapedDay from "../box-shaped-day/box-shaped-day.component";
import { useEffect, useState } from "react";
import { WorkspaceStats } from "@/app/types/types";

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
        `http://ec2-18-193-109-186.eu-central-1.compute.amazonaws.com:8000/workspaces/${workspaceId}/stats/${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data: WorkspaceStats[] = await response.json();
        setYearWorkspaceStats(
          data.sort((a: WorkspaceStats, b: WorkspaceStats) => {
            if (a.createdAt == b.createdAt) return 0;
            if (a.createdAt < b.createdAt) return -1;
            return 1;
          })
        );
      }
    };

    fetchWorkspaceStats();
  }, [workspaceId]);

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
