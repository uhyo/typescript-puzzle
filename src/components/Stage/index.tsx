import React, { FC } from "react";
import { AnswerState } from "~/containers/Stage/logic";
import { Option } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { OptionsDisplay } from "../OptionsDisplay";
import { ProblemDisplay } from "../ProblemDisplay";
import { StageNavigation } from "../StageNavigation";

export const StageComponent: FC<{
  problem: Problem;
  options: Option[];
  answer: AnswerState;
  focus: string | undefined;
  answerIsCorrect: boolean;
  onHoleSelect?: (holeId: string) => void;
  onOptionSelect?: (optionIndex: number) => void;
  onNext?: () => void;
}> = ({
  problem,
  options,
  answer,
  focus,
  answerIsCorrect,
  onHoleSelect,
  onOptionSelect,
  onNext,
}) => {
  return (
    <>
      <ProblemDisplay
        problem={problem}
        answer={answer}
        focus={focus}
        onHoleSelect={onHoleSelect}
      />
      <OptionsDisplay options={options} onOptionSelect={onOptionSelect} />
      <StageNavigation answerIsCorrect={answerIsCorrect} onNext={onNext} />
    </>
  );
};
