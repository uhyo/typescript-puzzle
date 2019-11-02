import React, { FC } from "react";
import { AnswerState } from "~/containers/Stage";
import { Option } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { OptionsDisplay } from "../OptionsDisplay";
import { ProblemDisplay } from "../ProblemDisplay";

export const StageComponent: FC<{
  problem: Problem;
  options: Option[];
  answer: AnswerState;
}> = ({ problem, options, answer }) => {
  return (
    <>
      <ProblemDisplay problem={problem} answer={answer} />
      <OptionsDisplay options={options} />
    </>
  );
};