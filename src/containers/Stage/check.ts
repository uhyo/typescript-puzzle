import { HoleValue } from "~/problems/options";
import { ProblemHole } from "~/problems/problemDefinition";
import { Problem } from "~/problems/problemDefinition/problem";
import { listHoles } from "./holes";
import { AnswerState } from "./logic";

export type AnswerCheck = "correct" | "wrong" | undefined;
/**
 * Check whether given answer is correct.
 */
export const checkAnswer = (
  problem: Problem,
  answer: AnswerState,
): AnswerCheck => {
  // first, check whether all holes are filled.
  if (listHoles(problem, answer).some(holeId => !answer[holeId])) {
    return undefined;
  }
  let correct = true;
  for (const [i, hole] of problem.holes.entries()) {
    const a = answer[i];
    if (!a) {
      return undefined;
    }
    if (!holeMatchesAnswer(hole, a)) {
      correct = false;
    }
  }
  return correct ? "correct" : "wrong";
};

const holeMatchesAnswer = (
  hole: ProblemHole,
  answer: HoleValue | undefined,
) => {
  switch (hole.type) {
    case "type": {
      return answer?.type === "type" && hole.answer === answer.value;
    }
  }
};
