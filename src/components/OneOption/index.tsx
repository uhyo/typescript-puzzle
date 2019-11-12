import React, { FC } from "react";
import { Option } from "../../problems/options";
import { BlankHole } from "../Hole";
import { OneOptionBase, TypeOption } from "./OneOptionBase";

export const OneOption: FC<{
  option: Option;
  focused?: boolean;
  className?: string;
  onClick?: () => void;
}> = ({ option, focused, className, onClick }) => {
  switch (option.type) {
    case "type": {
      return (
        <TypeOption
          className={className}
          onClick={onClick}
          kind={option.kind}
          focused={!!focused}
        >
          {option.value}
        </TypeOption>
      );
    }
    case "union": {
      return (
        <OneOptionBase onClick={onClick} focused={!!focused} openHeight>
          <BlankHole short /> | <BlankHole short />
        </OneOptionBase>
      );
    }
  }
};
