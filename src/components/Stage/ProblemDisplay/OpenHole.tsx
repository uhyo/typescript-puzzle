import React, { FC } from "react";
import styled from "styled-components";
import {
  lightGrayBackgroundColor,
  mainBorderColor,
} from "../../../design/color";
import { ProblemHole } from "../../../problems/problemDefinition";
import { Hole } from "../Hole";

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

const HoleSpan = styled(Hole)<{
  focused: boolean;
}>`
  width: 8ex;
  background-color: ${lightGrayBackgroundColor};
  border-color: ${props => (props.focused ? mainBorderColor : "transparent")};
`;

const Invisible = styled.span`
  visibility: hidden;
`;
