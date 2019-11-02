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
  onHoleSelect?: (holeId: string) => void;
}

export const ProblemDisplay: FC<Props> = ({
  problem,
  answer,
  onHoleSelect,
}) => {
  const { holes, texts } = problem;
  const result: React.ReactChild[] = [];
  for (let i = 0; i <= holes.length; i++) {
    result.push(<Fragment key={`text-${i}`}>{texts[i]}</Fragment>);
    if (holes[i]) {
      const a = answer[i];
      const holeId = String(i);
      const onClickHandler = onHoleSelect && (() => onHoleSelect(holeId));
      if (a) {
        result.push(
          <FilledHole
            key={`filledhole-${i}`}
            onClick={onClickHandler}
            content={a}
          />,
        );
      } else {
        result.push(
          <OpenHole
            key={`openhole-${i}`}
            onClick={onClickHandler}
            hole={holes[i]}
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
