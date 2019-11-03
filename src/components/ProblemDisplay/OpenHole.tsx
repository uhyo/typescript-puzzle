import React, { FC } from "react";
import styled from "styled-components";
import { lightGrayBackgroundColor, mainBorderColor } from "../../design/color";
import { smallRoundedBoxRadius } from "../../design/length";
import { ProblemHole } from "../../problems/problemDefinition";

export const OpenHole: FC<{
  hole: ProblemHole;
  focused?: boolean;
  onClick?: () => void;
}> = ({ focused, onClick }) => {
  return <HoleSpan focused={!!focused} onClick={onClick} />;
};

const HoleSpan = styled.span<{
  focused: boolean;
}>`
  display: inline-block;
  background-color: ${lightGrayBackgroundColor};
  border-radius: ${smallRoundedBoxRadius};
  border: 1px solid
    ${props => (props.focused ? mainBorderColor : "transparent")};
  width: 8ex;
  height: 1.2em;
  padding: 3px;
  vertical-align: middle;
  user-select: none;
`;
