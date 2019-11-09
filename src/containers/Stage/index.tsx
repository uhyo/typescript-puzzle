import React, {
  Dispatch,
  FC,
  useCallback,
  useMemo,
  useReducer,
  useTransition,
} from "react";
import { StageComponent } from "~/components/Stage";
import { Level } from "~/problems/levels";
import { Option } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { AppAction } from "../App/logic";
import { checkAnswer } from "./check";
import { getInitialState, reducer } from "./logic";

export const Stage: FC<{
  level: Level;
  stageNumber: number;
  problem: Problem;
  options: Option[];
  appDispatch: Dispatch<AppAction>;
}> = ({ level, stageNumber, problem, options, appDispatch }) => {
  const [{ answer, focus }, dispatch] = useReducer(
    reducer,
    { problem },
    getInitialState,
  );
  const [startTransition] = useTransition();

  const selectHole = useCallback((holeId: string) => {
    dispatch({
      type: "holeSelect",
      holeId,
    });
  }, []);

  const answerIsCorrect = useMemo(() => checkAnswer(problem, answer), [
    problem,
    answer,
  ]);

  const selectOption = useCallback(
    (optionIndex: number) => {
      const option = options[optionIndex];
      dispatch({
        type: "selectOption",
        option,
      });
    },
    [options],
  );

  const goToNext = useCallback(() => {
    startTransition(() => {
      appDispatch({
        type: "goToNext",
      });
    });
  }, [appDispatch]);

  const quitStage = useCallback(() => {
    startTransition(() => {
      appDispatch({
        type: "goToTop",
      });
    });
  }, [appDispatch]);

  return (
    <StageComponent
      level={level}
      stageNumber={stageNumber}
      problem={problem}
      options={options}
      answer={answer}
      focus={focus}
      answerIsCorrect={answerIsCorrect}
      onHoleSelect={selectHole}
      onOptionSelect={selectOption}
      onNext={goToNext}
      onQuitStage={quitStage}
    />
  );
};
