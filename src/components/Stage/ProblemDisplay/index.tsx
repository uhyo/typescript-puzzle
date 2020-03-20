import React, { FC, Fragment, useCallback, useMemo } from "react";
import styled from "styled-components";
import { getInnermostHole } from "~/containers/Hole/getInnermostHole";
import { Hole } from "~/containers/Hole/HoleContainer";
import { HoleContext } from "~/containers/Hole/HoleContext";
import { CheckState } from "~/containers/Stage/check";
import { AnswerState, useStageActions } from "~/containers/Stage/logic";
import { lightGrayBackgroundColor } from "~/design/color";
import { largeRoundedBoxRadius } from "~/design/length";
import {
  problemSourceCodeFontSize,
  sourceCodeFontFamily,
} from "../../../design/font";
import { Problem } from "../../../problems/problemDefinition/problem";
import { BackGround } from "../Background";

interface Props {
  problem: Problem;
  answer: AnswerState;
  focus: string | undefined;
  backgroundState?: CheckState;
}

export const ProblemDisplay: FC<Props> = ({
  problem,
  answer,
  focus,
  backgroundState,
}) => {
  const { holeSelect } = useStageActions();

  const holeContextValue = useMemo(
    () => ({
      holeValues: answer,
      focus,
    }),
    [answer, focus],
  );

  const clickHandler = useCallback(
    (e: React.SyntheticEvent) => {
      const holeId = getInnermostHole(e.target as Node);
      if (holeId) {
        holeSelect(holeId);
      }
    },
    [holeSelect],
  );

  const { holes, texts } = problem;
  const result: React.ReactChild[] = [];
  for (let i = 0; i <= holes.length; i++) {
    result.push(<Fragment key={`text-${i}`}>{texts[i]}</Fragment>);
    if (holes[i]) {
      const holeId = String(i);
      result.push(<Hole key={`hole-${holeId}`} holeId={holeId} />);
    }
  }
  return (
    <HoleContext.Provider value={holeContextValue}>
      <ProblemDisplayWrapper>
        <Container>
          <BackGround state={backgroundState} />
          <ProblemDisplayInner>
            <ProblemProgram onClick={clickHandler}>{result}</ProblemProgram>
          </ProblemDisplayInner>
        </Container>
      </ProblemDisplayWrapper>
    </HoleContext.Provider>
  );
};

const ProblemDisplayWrapper = styled.div`
  flex: auto 1 0;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  height: 100%;
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
  font-size: ${problemSourceCodeFontSize};
  z-index: 1;
`;

const ProblemProgram = styled.div`
  height: 100%;
  overflow-y: auto;
`;
