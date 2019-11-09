import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { AnswerState, useStageActions } from "~/containers/Stage/logic";
import { sourceCodeFontFamily } from "../../../design/font";
import { Problem } from "../../../problems/problemDefinition/problem";
import { FilledHole } from "./FilledHole";
import { OpenHole } from "./OpenHole";

interface Props {
  problem: Problem;
  answer: AnswerState;
  focus: string | undefined;
}

export const ProblemDisplay: FC<Props> = ({ problem, answer, focus }) => {
  const { holeSelect } = useStageActions();

  const { holes, texts } = problem;
  const result: React.ReactChild[] = [];
  for (let i = 0; i <= holes.length; i++) {
    result.push(<Fragment key={`text-${i}`}>{texts[i]}</Fragment>);
    if (holes[i]) {
      const a = answer[i];
      const holeId = String(i);
      const onClickHandler = () => holeSelect(holeId);
      if (a) {
        result.push(
          <FilledHole
            key={`filledhole-${i}`}
            focused={holeId === focus}
            content={a}
            onClick={onClickHandler}
          />,
        );
      } else {
        result.push(
          <OpenHole
            key={`openhole-${i}`}
            focused={holeId === focus}
            hole={holes[i]}
            onClick={onClickHandler}
          />,
        );
      }
    }
  }
  return <ProblemDisplayWrapper>{result}</ProblemDisplayWrapper>;
};

const ProblemDisplayWrapper = styled.div`
  line-height: 1.2;
  font-family: ${sourceCodeFontFamily};
`;
