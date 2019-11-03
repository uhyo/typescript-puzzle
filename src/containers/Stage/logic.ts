import { Option, typeOption } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { AnswerState, setHoleContent } from "./answer";
import { getNextFocus } from "./focus";

export type StageState = {
  readonly problem: Problem;
  readonly answer: AnswerState;
  readonly focus: string | undefined;
};

export type StageAction =
  | {
      type: "holeSelect";
      holeId: string;
    }
  | {
      type: "selectOption";
      option: Option;
    };

type InitialStateParams = {
  problem: Problem;
};
export const getInitialState = ({
  problem,
}: InitialStateParams): StageState => ({
  problem,
  answer: {
    0: typeOption("string"),
  },
  focus: undefined,
});

export const reducer = (state: StageState, action: StageAction): StageState => {
  switch (action.type) {
    case "holeSelect": {
      const { holeId } = action;
      if (state.answer[holeId]) {
        return {
          ...state,
          answer: setHoleContent(state.answer, holeId, undefined),
          focus: holeId,
        };
      }
      if (state.focus === action.holeId) {
        return {
          ...state,
          focus: undefined,
        };
      } else {
        return {
          ...state,
          focus: action.holeId,
        };
      }
    }
    case "selectOption": {
      const { focus, problem } = state;
      const { option } = action;
      if (focus === undefined) {
        return state;
      }
      return {
        ...state,
        answer: setHoleContent(state.answer, focus, option),
        focus: getNextFocus(problem, focus),
      };
    }
  }
};

export { AnswerState };
