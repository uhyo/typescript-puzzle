import React, { FC } from "react";
import styled from "styled-components";
import { lightGrayBackgroundColor } from "../../design/color";
import { smallRoundedBoxRadius } from "../../design/length";
import { ProblemHole } from "../../problems/problemDefinition";

export const OpenHole: FC<{
  hole: ProblemHole;
}> = () => {
  return <HoleSpan />;
};

const HoleSpan = styled.span`
  display: inline-block;
  background-color: ${lightGrayBackgroundColor};
  border-radius: ${smallRoundedBoxRadius};
  width: 8ex;
  height: 1.2em;
  vertical-align: bottom;
`;
