import { ReactNode } from "react";

export type ResizableBoxProps = {
  children: ReactNode;
  width?: number;
  height?: number;
  resizable?: boolean;
  className?: string;
};
