import styles from "./form-frame.module.css";
import { FrameBox } from "../frame-box/frame-box.component";

export function FormFrame() {
  const sides = ["top", "right", "bottom", "left"];
  return (
    <div className={styles["form-frame"]}>
      <div className={styles["form-frame-container"]}>
        {sides.map((side, index) => (
          <div key={index} className={styles[`box-container-${side}`]}>
            {Array.from(Array(3)).map((_, index) => (
              <FrameBox key={index} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
