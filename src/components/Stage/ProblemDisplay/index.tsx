import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { AnswerState, useStageActions } from "~/containers/Stage/logic";
import { lightGrayBackgroundColor } from "~/design/color";
import { largeRoundedBoxRadius } from "~/design/length";
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
  return (
    <ProblemDisplayWrapper>
      <ProblemDisplayInner>{result}</ProblemDisplayInner>
    </ProblemDisplayWrapper>
  );
};

const ProblemDisplayWrapper = styled.div`
  flex: auto 1 0;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  line-height: 1.2;
  font-family: ${sourceCodeFontFamily};
`;

const ProblemDisplayInner = styled.div`
  flex: auto 1 1;
  overflow-y: auto;
  margin: 1.5em 0;
  padding: 6px 8px;
  border: 1px solid ${lightGrayBackgroundColor};
  border-radius: ${largeRoundedBoxRadius};
  background-image: repeating-linear-gradient(
    60deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.02) 10px,
    rgba(0, 0, 0, 0.02) 20px
  );
`;
