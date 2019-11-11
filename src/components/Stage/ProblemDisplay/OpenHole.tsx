import React, { FC } from "react";
import styled from "styled-components";
import {
  lightGrayBackgroundColor,
  mainBorderColor,
} from "../../../design/color";
import { smallRoundedBoxRadius } from "../../../design/length";
import { ProblemHole } from "../../../problems/problemDefinition";

export const OpenHole: FC<{
  hole: ProblemHole;
  focused?: boolean;
  onClick?: () => void;
}> = ({ focused, onClick }) => {
  return (
    <HoleSpan focused={!!focused} onClick={onClick}>
      <Invisible aria-hidden="true">x</Invisible>
    </HoleSpan>
  );
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
  height: calc(1.2em + 8px);
  padding: 3px;
  vertical-align: baseline;
  user-select: none;
`;

const Invisible = styled.span`
  visibility: hidden;
`;
