import { HoleValue } from "~/problems/options";
import { subHoleIds } from "~/problems/options/subHoleIds";
import { Problem } from "~/problems/problemDefinition/problem";
export type AnswerState = Partial<Record<string, HoleValue>>;

export const setHoleContent = (
  problem: Problem,
  state: AnswerState,
  holeId: string,
  content: HoleValue | undefined,
) => {
  const newState = { ...state, [holeId]: content };
  const result: AnswerState = {};
  for (const holeId of holeIds(problem, newState)) {
    result[holeId] = newState[holeId];
  }
  return result;
};

/**
 * Generates all existing holeIds.
 */
function* holeIds(problem: Problem, state: AnswerState) {
  for (let i = 0; i < problem.holes.length; i++) {
    const value = state[i];
    yield* rec(String(i), value);
  }

  function* rec(
    holeId: string,
    value: HoleValue | undefined,
  ): Generator<string, void> {
    yield holeId;
    if (value === undefined) {
      return;
    }
    for (const sub of subHoleIds(holeId, value)) {
      yield* rec(sub, state[sub]);
    }
  }
}
