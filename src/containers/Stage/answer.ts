import { HoleValue } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { allHoleIds } from "./holes";
export type AnswerState = Partial<Record<string, HoleValue>>;

export const setHoleContent = (
  problem: Problem,
  state: AnswerState,
  holeId: string,
  content: HoleValue | undefined,
) => {
  const newState = { ...state, [holeId]: content };
  const result: AnswerState = {};
  for (const holeId of allHoleIds(problem, newState)) {
    result[holeId] = newState[holeId];
  }
  return result;
};
