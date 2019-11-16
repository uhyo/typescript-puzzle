import { getSubHoles } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { AnswerState } from "./logic";

/**
 * List the holes existing now.
 */
export const listHoles = (problem: Problem, answer: AnswerState) => {
  const result: string[] = [];

  for (const [i, _] of problem.holes.entries()) {
    const holeId = String(i);
    result.push(holeId);

    addHole(holeId, answer, result);
  }

  return result;
};

const addHole = (holeId: string, answer: AnswerState, result: string[]) => {
  result.push(holeId);
  const option = answer[holeId];
  if (!option) {
    return;
  }

  for (const id of getSubHoles(option, holeId)) {
    addHole(id, answer, result);
  }
};
