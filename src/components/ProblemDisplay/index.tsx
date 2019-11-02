import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { AnswerState } from "~/containers/Stage";
import { sourceCodeFontFamily } from "../../design/font";
import { Problem } from "../../problems/problemDefinition/problem";
import { FilledHole } from "./FilledHole";
import { OpenHole } from "./OpenHole";

interface Props {
  problem: Problem;
  answer: AnswerState;
}

export const ProblemDisplay: FC<Props> = ({ problem, answer }) => {
  const { holes, texts } = problem;
  const result: React.ReactChild[] = [];
  for (let i = 0; i <= holes.length; i++) {
    result.push(<Fragment key={`text-${i}`}>{texts[i]}</Fragment>);
    if (holes[i]) {
      const a = answer[i];
      if (a) {
        result.push(<FilledHole key={`filledhole-${i}`} content={a} />);
      } else {
        result.push(<OpenHole key={`openhole-${i}`} hole={holes[i]} />);
      }
    }
  }
  return <ProblemDisplayWrapper>{result}</ProblemDisplayWrapper>;
};

const ProblemDisplayWrapper = styled.div`
  line-height: 1.2;
  font-family: ${sourceCodeFontFamily};
`;
