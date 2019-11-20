import React, { FC } from "react";
import { Option, OptionOfType } from "../../problems/options";
import { BlankHole } from "../Hole";
import { OneOptionBase, TypeOption as TypeOptionOrig } from "./OneOptionBase";

type OneOptionProps<T extends Option["type"]> = {
  option: OptionOfType<T>;
  focused?: boolean;
  className?: string;
  onClick?: () => void;
};

export const TypeOption: FC<OneOptionProps<"type">> = ({
  option,
  focused,
  className,
  onClick,
}) => {
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
  onClick,
}) => {
  return (
    <OneOptionBase
      className={className}
      onClick={onClick}
      focused={!!focused}
      openHeight
    >
      <BlankHole short /> | <BlankHole short />
    </OneOptionBase>
  );
};
