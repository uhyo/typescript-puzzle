import React, { FC } from "react";
import { separateArrayWith } from "~/util/separateArrayWith";
import { OneHoleKindProps } from "./OneHoleKindProps";

export const UnionHole: FC<OneHoleKindProps<"union">> = ({ children }) => {
  return <>{separateArrayWith(React.Children.toArray(children), " | ")}</>;
};
