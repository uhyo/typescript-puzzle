import { Option } from "~/problems/options";
import { ProblemHole } from "~/problems/problemDefinition";
import { Problem } from "~/problems/problemDefinition/problem";
import { AnswerState } from "./logic";

export type AnswerCheck = "correct" | "wrong" | undefined;
/**
 * Check whether given answer is correct.
 */
export const checkAnswer = (
  problem: Problem,
  answer: AnswerState,
): AnswerCheck => {
  let correct = true;
  for (const [i, hole] of problem.holes.entries()) {
    const a = answer[i];
    if (!a) {
      // this hole is not filled
      return undefined;
    }
    if (!holeMatchesAnswer(hole, a)) {
      correct = false;
    }
  }
  return correct ? "correct" : "wrong";
};

const holeMatchesAnswer = (hole: ProblemHole, answer: Option | undefined) => {
  switch (hole.type) {
    case "type": {
      return answer?.type === "type" && hole.answer === answer.value;
    }
  }
};
