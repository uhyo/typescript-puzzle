import React, { FC } from "react";
import { separateArrayWith } from "~/util/separateArrayWith";
import { OneHoleKindProps } from "./OneHoleKindProps";
import { OneOptionBase } from "./OneOptionBase";

export const UnionHole: FC<OneHoleKindProps<"union">> = ({
  focused,
  className,
  onClick,
  children,
}) => {
  return (
    <OneOptionBase
      className={className}
      onClick={onClick}
      focused={!!focused}
      openHeight
    >
      {separateArrayWith(React.Children.toArray(children), " | ")}
    </OneOptionBase>
  );
};
