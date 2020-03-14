import { HoleValue } from "~/problems/options";
export type AnswerState = Partial<Record<string, HoleValue>>;

export const setHoleContent = (
  state: AnswerState,
  holeId: string,
  content: HoleValue | undefined,
) => ({
  ...state,
  [holeId]: content,
});
