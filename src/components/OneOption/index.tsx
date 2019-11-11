import React, { FC } from "react";
import styled from "styled-components";
import {
  lightGrayBorderColor,
  mainBorderColor,
  syntaxColor,
} from "../../design/color";
import { sourceCodeFontFamily } from "../../design/font";
import { smallRoundedBoxRadius } from "../../design/length";
import { Option } from "../../problems/options";

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

const OneOptionW = styled.code<{
  type: Option["type"];
  focused: boolean;
}>`
  display: inline-block;
  font-family: ${sourceCodeFontFamily};
  border: 1px solid
    ${props => (props.focused ? mainBorderColor : lightGrayBorderColor)};
  padding: 3px;
  height: calc(1.2em + 8px);
  border-radius: ${smallRoundedBoxRadius};
  background-color: white;
  color: ${props => syntaxColor[props.type]};
  vertical-align: baseline;

  cursor: pointer;
  user-select: none;
`;
