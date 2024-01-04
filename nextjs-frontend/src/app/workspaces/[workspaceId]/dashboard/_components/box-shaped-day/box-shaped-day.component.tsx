import styles from "./box-shaped-day.module.css";

type BoxShapedDayProps = {
  isActive: boolean;
  date: string;
};

export default function BoxShapedDay({ isActive, date }: BoxShapedDayProps) {
  return (
    <div
      className={styles["box-shaped-day"]}
      style={{
        backgroundColor: isActive ? "#3E76FE" : "#171717",
      }}
      title={date}
    ></div>
  );
}
