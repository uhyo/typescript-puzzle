import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { AnswerCheck } from "~/containers/Stage/check";
import { AnswerState, useStageActions } from "~/containers/Stage/logic";
import { lightGrayBackgroundColor } from "~/design/color";
import { largeRoundedBoxRadius } from "~/design/length";
import { sourceCodeFontFamily, sourceCodeFontSize } from "../../../design/font";
import { Problem } from "../../../problems/problemDefinition/problem";
import { BackGround } from "../Background";
import { FilledHole } from "./FilledHole";
import { OpenHole } from "./OpenHole";

interface Props {
  problem: Problem;
  answer: AnswerState;
  focus: string | undefined;
  backgroundState?: AnswerCheck;
}

export const ProblemDisplay: FC<Props> = ({
  problem,
  answer,
  focus,
  backgroundState,
}) => {
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
      <Container>
        <BackGround state={backgroundState} />
        <ProblemDisplayInner>
          <ProblemProgram>{result}</ProblemProgram>
        </ProblemDisplayInner>
      </Container>
    </ProblemDisplayWrapper>
  );
};

const ProblemDisplayWrapper = styled.div`
  flex: auto 1 0;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;

  padding: 1.5em 0;
`;

const Container = styled.div`
  position: relative;
  flex: auto 1 1;
  display: flex;
  flex-flow: nowrap column;
  overflow: hidden;
  position: relative;
  height: 100%;
  isolation: isolate;
  border: 1px solid ${lightGrayBackgroundColor};
  border-radius: ${largeRoundedBoxRadius};
`;

const ProblemDisplayInner = styled.div`
  flex: auto 1 1;
  padding: 6px 8px;
  background-image: repeating-linear-gradient(
    60deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.02) 10px,
    rgba(0, 0, 0, 0.02) 20px
  );
  line-height: 1.2;
  font-family: ${sourceCodeFontFamily};
  font-size: ${sourceCodeFontSize};
  z-index: 1;
`;

const ProblemProgram = styled.div`
  height: 100%;
  overflow-y: auto;
`;
