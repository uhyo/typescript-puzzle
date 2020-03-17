import { HoleValue } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { RemoteCompiler } from "~/ts-compiler";
import { Fetcher } from "~/util/Fetcher";
import { FirstCell } from "~/util/firstCell";
import { generateStateManagenentTools } from "~/util/states";
import { AnswerState, setHoleContent } from "./answer";
import { checkAnswer, CheckState } from "./check";
import { getInitialFocus, getNextFocus } from "./focus";

export type StageState = {
  readonly problem: Problem;
  readonly answer: AnswerState;
  readonly focus: string | undefined;
  readonly check?: Fetcher<CheckState>;
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
  remoteCompiler: RemoteCompiler;
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
  getActions(setState, init) {
    return {
      holeSelect(holeId: string) {
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
              check: undefined,
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
        const checkResultCell = new FirstCell<
          Fetcher<CheckState> | undefined
        >();
        setState(state => {
          const { focus, problem } = state;
          if (focus === undefined) {
            return state;
          }
          const answer = setHoleContent(
            state.problem,
            state.answer,
            focus,
            option,
          );
          return {
            ...state,
            answer,
            focus: getNextFocus(problem, answer, focus),
            check: checkResultCell.get(() =>
              checkAnswer(state.problem, answer, init.remoteCompiler),
            ),
          };
        });
      },
    };
  },
});

export { AnswerState };
