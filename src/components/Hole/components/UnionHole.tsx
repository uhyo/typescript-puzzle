import React, { FC } from "react";
import { separateArrayWith } from "~/util/separateArrayWith";
import { OneHoleKindProps } from "./OneHoleKindProps";
import { OneOptionBase } from "./OneOptionBase";

export const UnionHole: FC<OneHoleKindProps<"union">> = ({
  holeId,
  focused,
  className,
  children,
}) => {
  return (
    <OneOptionBase
      data-holeid={holeId}
      className={className}
      focused={!!focused}
      openHeight
    >
      {separateArrayWith(React.Children.toArray(children), " | ")}
    </OneOptionBase>
  );
};
