import { HoleValue } from "~/stages/holes/holeDefs";
import { subHoleIds } from "~/stages/holes/subHoleIds";
import { Question } from "~/stages/questionDefinition/question";
import { AnswerState } from "./logic";

/**
 * Generates all existing holeIds.
 */
export function* allHoleIds(question: Question, state: AnswerState) {
  for (let i = 0; i < question.holes.length; i++) {
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
