import { HoleValue } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { generateStateManagenentTools } from "~/util/states";
import { AnswerState, setHoleContent } from "./answer";
import { getInitialFocus, getNextFocus } from "./focus";

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
      option: HoleValue;
    };

type InitialStateParams = {
  problem: Problem;
};
export const getInitialState = ({
  problem,
}: InitialStateParams): StageState => ({
  problem,
  answer: {},
  focus: getInitialFocus(problem),
});

export const {
  useManagedState: useStageState,
  useActions: useStageActions,
} = generateStateManagenentTools({
  getInitialState,
  getActions(setState) {
    return {
      holeSelect(holeId: string) {
        console.log("holeSelect", holeId);
        setState(state => {
          if (state.answer[holeId]) {
            return {
              ...state,
              answer: setHoleContent(
                state.problem,
                state.answer,
                holeId,
                undefined,
              ),
              focus: holeId,
            };
          }
          if (state.focus === holeId) {
            return {
              ...state,
              focus: undefined,
            };
          } else {
            return {
              ...state,
              focus: holeId,
            };
          }
        });
      },
      selectOption(option: HoleValue) {
        setState(state => {
          const { focus, problem } = state;
          if (focus === undefined) {
            return state;
          }
          return {
            ...state,
            answer: setHoleContent(state.problem, state.answer, focus, option),
            focus: getNextFocus(problem, focus),
          };
        });
      },
    };
  },
});

export { AnswerState };
