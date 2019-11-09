import React, { FC } from "react";
import { AnswerState } from "~/containers/Stage/logic";
import { Level } from "~/problems/levels";
import { Option } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { PageWrapper } from "../PageWrapper";
import { OptionsDisplay } from "./OptionsDisplay";
import { ProblemDisplay } from "./ProblemDisplay";
import { StageHeader } from "./StageHeader";
import { StageNavigation } from "./StageNavigation";

export const StageComponent: FC<{
  level: Level;
  stageNumber: number;
  problem: Problem;
  options: Option[];
  answer: AnswerState;
  focus: string | undefined;
  answerIsCorrect: boolean;
  onNext?: () => void;
  onQuitStage?: () => void;
}> = ({
  level,
  stageNumber,
  problem,
  options,
  answer,
  focus,
  answerIsCorrect,
  onNext,
  onQuitStage,
}) => {
  return (
    <Wrapper>
      <StageHeader
        level={level}
        stageNumber={stageNumber}
        onQuitStage={onQuitStage}
      />
      <ProblemDisplay problem={problem} answer={answer} focus={focus} />
      <OptionsDisplay options={options} />
      <StageNavigation answerIsCorrect={answerIsCorrect} onNext={onNext} />
    </Wrapper>
  );
};

const Wrapper = PageWrapper;
