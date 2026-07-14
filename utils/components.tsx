import Spacer from "@/components/ui/basic/Spacer";
import { memo } from "react";

export const createItemSeparator = (height?: number, width?: number) =>
  memo(() => <Spacer height={height} width={width} />);
