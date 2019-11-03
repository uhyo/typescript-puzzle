import { Option } from "~/problems/options";
import { ProblemHole } from "~/problems/problemDefinition";
import { Problem } from "~/problems/problemDefinition/problem";
import { AnswerState } from "./logic";

/**
 * Check whether given answer is correct.
 */
export const checkAnswer = (problem: Problem, answer: AnswerState): boolean => {
  return problem.holes.every((hole, i) => holeMatchesAnswer(hole, answer[i]));
};

const holeMatchesAnswer = (hole: ProblemHole, answer: Option | undefined) => {
  switch (hole.type) {
    case "type": {
      return answer?.type === "type" && hole.answer === answer.value;
    }
  }
};
