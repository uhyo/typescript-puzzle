import { TransitionStartFunction } from "react";
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
      selectOption(
        option: HoleValue,
        startTransition: TransitionStartFunction,
      ) {
        const checkResultCell = new FirstCell<
          Fetcher<CheckState> | undefined
        >();
        const answerFocusCell = new FirstCell<
          Pick<StageState, "answer" | "focus">
        >();
        const getNextAnswerFocus = (state: StageState) => {
          const { answer, focus, problem } = state;
          if (focus === undefined) {
            return {
              answer,
              focus,
            };
          }
          const nextAnswer = setHoleContent(
            state.problem,
            state.answer,
            focus,
            option,
          );
          const nextFocus = getNextFocus(problem, answer, focus);
          return {
            answer: nextAnswer,
            focus: nextFocus,
          };
        };
        setState(state => {
          const next = answerFocusCell.get(() => getNextAnswerFocus(state));
          return {
            ...state,
            ...next,
          };
        });
        startTransition(() => {
          setState(state => {
            const next = answerFocusCell.get(() => getNextAnswerFocus(state));
            return {
              ...state,
              ...next,
              check: checkResultCell.get(() =>
                checkAnswer(state.problem, next.answer, init.remoteCompiler),
              ),
            };
          });
        });
      },
    };
  },
});

export { AnswerState };
