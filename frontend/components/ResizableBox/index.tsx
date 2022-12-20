import React from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";
import { ResizableBoxProps } from "./types";
import styles from "./style.module.scss";

const ResizableBox = ({
  children,
  width = 600,
  height = 300,
  resizable = true,
  className = "",
}: ResizableBoxProps) => {
  return (
    <div className={styles["resizable-box"]}>
      {resizable ? (
        <ReactResizableBox width={width} height={height}>
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
            className={className}
          >
            {children}
          </div>
        </ReactResizableBox>
      ) : (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          className={className}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ResizableBox;
