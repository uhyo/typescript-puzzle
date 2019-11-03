import { Option, typeOption } from "~/problems/options";
import { AnswerState, setHoleContent } from "./answer";

export type StageState = {
  answer: AnswerState;
  focus: string | undefined;
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

export const initialState: StageState = {
  answer: {
    0: typeOption("string"),
  },
  focus: undefined,
};

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
      const { focus } = state;
      const { option } = action;
      if (focus === undefined) {
        return state;
      }
      return {
        ...state,
        answer: setHoleContent(state.answer, focus, option),
        focus: undefined,
      };
    }
  }
};

export { AnswerState };
