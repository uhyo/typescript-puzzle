import React, { FC, useState } from "react";
import { StageComponent } from "~/components/Stage";
import { Option, typeOption } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";

export type AnswerState = Partial<Record<string, Option>>;

export const Stage: FC<{
  problem: Problem;
  options: Option[];
}> = ({ problem, options }) => {
  const [answer, setAnswer] = useState({
    0: typeOption("string"),
  });

  return <StageComponent problem={problem} options={options} answer={answer} />;
};
