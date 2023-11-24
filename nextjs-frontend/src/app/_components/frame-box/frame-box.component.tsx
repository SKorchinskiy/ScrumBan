import styles from "./frame-box.module.css";

type FrameBoxProps = {
  style?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
};

export function FrameBox(props: FrameBoxProps) {
  return (
    <div
      className={styles["frame-box"]}
      style={{
        ...props.style,
      }}
    />
  );
}
