import { HoleValue } from "~/problems/options";
import { subHoleIds } from "~/problems/options/subHoleIds";
import { Problem } from "~/problems/problemDefinition/problem";
import { AnswerState } from "./logic";

/**
 * Generates all existing holeIds.
 */
export function* allHoleIds(problem: Problem, state: AnswerState) {
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
