import styles from "./activity-graph.module.css";
import BoxShapedDay from "../box-shaped-day/box-shaped-day.component";

export default function ActivityGraph() {
  return (
    <div className={styles["activity-graph"]}>
      <div className={styles["activity-board"]}>
        {Array.from(Array(180)).map((_, index) => (
          <BoxShapedDay
            key={index}
            isActive={false}
            date={new Date(Date.now() - (180 - (index + 1)) * 86400000)}
          />
        ))}
      </div>
    </div>
  );
}
