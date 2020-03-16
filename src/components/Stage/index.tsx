import React, { FC } from "react";
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
        <ProblemDisplay
          problem={problem}
          answer={answer}
          focus={focus}
          backgroundState={checkState}
        />
        <OptionsDisplay options={options} />
        <StageNavigation
          answerIsCorrect={!!checkState?.status}
          onNext={onNext}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = PageWrapper;
