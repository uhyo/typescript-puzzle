import React, { FC } from "react";
import styled from "styled-components";
import { CheckState } from "~/containers/Stage/check";
import { AnswerState } from "~/containers/Stage/logic";
import { Level } from "~/definitions/stages/levels";
import { StageDefinition } from "~/stages/stageDefinition";
import { Fetcher } from "~/util/Fetcher";
import { PageWrapper } from "../PageWrapper";
import { OptionsDisplay } from "./OptionsDisplay";
import { QuestionDisplay } from "./QuestionDisplay";
import { StageHeader } from "./StageHeader";
import { StageMetadata } from "./StageMetadata";
import { StageNavigation } from "./StageNavigation";
import { StatusBar } from "./StatusBar";

export const StageComponent: FC<{
  level: Level;
  stageNumber: number;
  stage: StageDefinition;
  answer: AnswerState;
  focus: string | undefined;
  check?: Fetcher<CheckState>;
  onNext?: () => void;
  onQuitStage?: () => void;
  startCheckTransition: (callback: () => void) => void;
  isCheckLoading: boolean;
}> = ({
  level,
  stageNumber,
  stage,
  answer,
  focus,
  check,
  onNext,
  onQuitStage,
  startCheckTransition,
  isCheckLoading,
}) => {
  const { question, options } = stage;
  const checkState = check?.get();
  return (
    <>
      <StageHeader
        level={level}
        stageNumber={stageNumber}
        onQuitStage={onQuitStage}
      />
      <Wrapper>
        <div>
          <StageMetadata stage={stage} />
        </div>
        <div>
          <QuestionDisplay
            question={question}
            answer={answer}
            focus={focus}
            backgroundState={checkState}
          />
        </div>
        <div>
          <StatusBar isLoading={isCheckLoading} check={checkState} />
        </div>
        <div>
          <OptionsDisplay
            options={options}
            startCheckTransition={startCheckTransition}
          />
        </div>
        <div>
          <StageNavigation check={checkState} onNext={onNext} />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(PageWrapper)`
  & > div:nth-child(1) {
    flex: 1.5em 0 0;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-flow: column nowrap;
    flex: auto 1 0;
  }
`;
