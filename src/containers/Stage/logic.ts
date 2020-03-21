import { TransitionStartFunction } from "react";
import { HoleValue } from "~/stages/holes";
import { Question } from "~/stages/questionDefinition/question";
import { RemoteCompiler } from "~/ts-compiler";
import { Fetcher } from "~/util/Fetcher";
import { FirstCell } from "~/util/firstCell";
import { generateStateManagenentTools } from "~/util/states";
import { AnswerState, setHoleContent } from "./answer";
import { checkAnswer, CheckState } from "./check";
import { getInitialFocus, getNextFocus } from "./focus";

export type StageState = {
  readonly question: Question;
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
  question: Question;
  remoteCompiler: RemoteCompiler;
};
export const getInitialState = ({
  question,
}: InitialStateParams): StageState => ({
  question,
  answer: {},
  focus: getInitialFocus(question),
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
                state.question,
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
          Pick<StageState, "answer" | "focus"> | undefined
        >();
        const getNextAnswerFocus = (state: StageState) => {
          const { answer, focus, question } = state;
          if (focus === undefined) {
            return undefined;
          }
          const nextAnswer = setHoleContent(question, answer, focus, option);
          const nextFocus = getNextFocus(question, nextAnswer, focus);
          return {
            answer: nextAnswer,
            focus: nextFocus,
          };
        };
        setState(state => {
          const next = answerFocusCell.get(() => getNextAnswerFocus(state));
          if (!next) {
            return state;
          }
          return {
            ...state,
            ...next,
          };
        });
        startTransition(() => {
          setState(state => {
            const next = answerFocusCell.get(() => getNextAnswerFocus(state));
            if (!next) {
              return state;
            }
            return {
              ...state,
              ...next,
              check: checkResultCell.get(() =>
                checkAnswer(state.question, next.answer, init.remoteCompiler),
              ),
            };
          });
        });
      },
    };
  },
});

export { AnswerState };
