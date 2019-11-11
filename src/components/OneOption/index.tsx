import React, { FC } from "react";
import styled from "styled-components";
import {
  lightGrayBorderColor,
  mainBorderColor,
  syntaxColor,
} from "../../design/color";
import { Option } from "../../problems/options";
import { Hole } from "../Stage/Hole";

export const OneOption: FC<{
  option: Option;
  focused?: boolean;
  className?: string;
  onClick?: () => void;
}> = ({ option, focused, className, onClick }) => (
  <OneOptionW
    className={className}
    onClick={onClick}
    type={option.type}
    focused={!!focused}
  >
    {option.value}
  </OneOptionW>
);

const OneOptionW = styled(Hole)<{
  type: Option["type"];
  focused: boolean;
}>`
  border-color: ${props =>
    props.focused ? mainBorderColor : lightGrayBorderColor};
  background-color: white;
  color: ${props => syntaxColor[props.type]};
  cursor: pointer;
`;
