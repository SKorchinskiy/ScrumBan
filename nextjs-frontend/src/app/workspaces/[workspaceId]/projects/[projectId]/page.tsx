import SideBar from "@/app/workspaces/_components/sidebar/sidebar.component";
import { Fragment } from "react";

export default function Project() {
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#392F53",
            width: "95%",
            height: "95%",
            borderRadius: "10px",
          }}
        />
      </div>
    </Fragment>
  );
}
