import React, { FC } from "react";
import styled from "styled-components";
import { lightGrayBorderColor, syntaxColor } from "../../design/color";
import { sourceCodeFontFamily } from "../../design/font";
import { smallRoundedBoxRadius } from "../../design/length";
import { Option } from "../../problems/options";

export const OneOption: FC<{
  option: Option;
  className?: string;
  onClick?: () => void;
}> = ({ option, className, onClick }) => (
  <OneOptionW className={className} onClick={onClick} type={option.type}>
    {option.value}
  </OneOptionW>
);

const OneOptionW = styled.code<{
  type: Option["type"];
}>`
  display: inline-block;
  font-family: ${sourceCodeFontFamily};
  border: 1px solid ${lightGrayBorderColor};
  padding: 3px;
  border-radius: ${smallRoundedBoxRadius};
  background-color: white;
  color: ${props => syntaxColor[props.type]};

  cursor: pointer;
  user-select: none;
`;
