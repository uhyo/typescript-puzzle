import React, { FC } from "react";
import { separateArrayWith } from "~/util/separateArrayWith";
import { Option, OptionOfType } from "../../problems/options";
import { OneOptionBase, TypeOption as TypeOptionOrig } from "./OneOptionBase";

type OneOptionProps<T extends Option["type"]> = {
  option: OptionOfType<T>;
  focused?: boolean;
  className?: string;
  holeId: string;
  onHoleClick?: (holeId: string) => void;
};

export const TypeOption: FC<OneOptionProps<"type">> = ({
  option,
  focused,
  className,
  holeId,
  onHoleClick,
}) => {
  const onClick = onHoleClick && (() => onHoleClick(holeId));
  return (
    <TypeOptionOrig
      className={className}
      onClick={onClick}
      kind={option.kind}
      focused={!!focused}
    >
      {option.value}
    </TypeOptionOrig>
  );
};

export const UnionOption: FC<OneOptionProps<"union">> = ({
  option,
  focused,
  className,
  holeId,
  onHoleClick,
  children,
}) => {
  const onClick = onHoleClick && (() => onHoleClick(holeId));
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
