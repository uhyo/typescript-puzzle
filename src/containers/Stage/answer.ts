import { Option } from "~/problems/options";
export type AnswerState = Partial<Record<string, Option>>;

export const setHoleContent = (
  state: AnswerState,
  holeId: string,
  content: Option | undefined,
) => ({
  ...state,
  [holeId]: content,
});
