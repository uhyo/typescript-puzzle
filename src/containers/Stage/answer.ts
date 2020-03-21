import { HoleValue } from "~/stages/holes/holeDefs";
import { Question } from "~/stages/questionDefinition/question";
import { allHoleIds } from "./holes";
export type AnswerState = Partial<Record<string, HoleValue>>;

export const setHoleContent = (
  question: Question,
  state: AnswerState,
  holeId: string,
  content: HoleValue | undefined,
) => {
  const newState = { ...state, [holeId]: content };
  const result: AnswerState = {};
  for (const holeId of allHoleIds(question, newState)) {
    result[holeId] = newState[holeId];
  }
  return result;
};
