import React, { FC } from "react";
import { Problem } from "../../problems/problemDefinition/problem";

interface Props {
  problem: Problem;
}

export const ProblemDisplay: FC<Props> = ({ problem }) => {
  return <>{problem.texts.join("")}</>;
};
