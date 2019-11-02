import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { sourceCodeFontFamily } from "../../design/font";
import { Problem } from "../../problems/problemDefinition/problem";
import { Hole } from "./Hole";

interface Props {
  problem: Problem;
}

export const ProblemDisplay: FC<Props> = ({ problem }) => {
  const { holes, texts } = problem;
  const result: React.ReactChild[] = [];
  for (let i = 0; i <= holes.length; i++) {
    result.push(<Fragment key={`text-${i}`}>{texts[i]}</Fragment>);
    if (holes[i]) {
      result.push(<Hole key={`hole-${i}`} hole={holes[i]} />);
    }
  }
  return <ProblemDisplayWrapper>{result}</ProblemDisplayWrapper>;
};

const ProblemDisplayWrapper = styled.div`
  line-height: 1.2;
  font-family: ${sourceCodeFontFamily};
`;
