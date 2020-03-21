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
  questionSourceCodeFontSize,
  sourceCodeFontFamily,
} from "../../../design/font";
import { Question } from "../../../stages/questionDefinition/question";
import { BackGround } from "../Background";
import { formatQuestion } from "./formatQuestion";

interface Props {
  question: Question;
  answer: AnswerState;
  focus: string | undefined;
  backgroundState?: CheckState;
}

export const QuestionDisplay: FC<Props> = ({
  question,
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

  const questionPart = useMemo<React.ReactChild[]>(() => {
    const { holes, texts } = question;
    const cleanedTexts = formatQuestion(texts);
    const result: React.ReactChild[] = [];
    for (let i = 0; i <= holes.length; i++) {
      result.push(<Fragment key={`text-${i}`}>{cleanedTexts[i]}</Fragment>);
      if (holes[i]) {
        const holeId = String(i);
        result.push(<Hole key={`hole-${holeId}`} holeId={holeId} />);
      }
    }
    return result;
  }, [question]);

  return (
    <HoleContext.Provider value={holeContextValue}>
      <QuestionDisplayWrapper>
        <div>
          <BackGround state={backgroundState} />
          <QuestionDisplayInner>
            <code onClick={clickHandler}>{questionPart}</code>
          </QuestionDisplayInner>
        </div>
      </QuestionDisplayWrapper>
    </HoleContext.Provider>
  );
};

const QuestionDisplayWrapper = styled.div`
  flex: auto 1 0;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  height: 100%;

  & > div {
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
  }
`;

const QuestionDisplayInner = styled.div`
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
  font-size: ${questionSourceCodeFontSize};
  z-index: 1;

  & > code {
    display: block;
    height: 100%;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-all;
    font-family: ${sourceCodeFontFamily};
  }
`;
