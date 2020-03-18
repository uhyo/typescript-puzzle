import React, { FC } from "react";
import styled from "styled-components";
import { CheckState } from "~/containers/Stage/check";
import { AnswerState } from "~/containers/Stage/logic";
import { Level } from "~/problems/levels";
import { HoleValue } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { Fetcher } from "~/util/Fetcher";
import { PageWrapper } from "../PageWrapper";
import { OptionsDisplay } from "./OptionsDisplay";
import { ProblemDisplay } from "./ProblemDisplay";
import { StageHeader } from "./StageHeader";
import { StageNavigation } from "./StageNavigation";
import { StatusBar } from "./StatusBar";

export const StageComponent: FC<{
  level: Level;
  stageNumber: number;
  problem: Problem;
  options: HoleValue[];
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
  problem,
  options,
  answer,
  focus,
  check,
  onNext,
  onQuitStage,
  startCheckTransition,
  isCheckLoading,
}) => {
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
          <ProblemDisplay
            problem={problem}
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
    flex: auto 1 0;
    padding: 1.5em 0 0;
  }
`;
