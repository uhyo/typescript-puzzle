import React, { Dispatch, FC, useCallback, useMemo, useReducer } from "react";
import { StageComponent } from "~/components/Stage";
import { Option } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { AppAction } from "../App/logic";
import { checkAnswer } from "./check";
import { getInitialState, reducer } from "./logic";

export const Stage: FC<{
  problem: Problem;
  options: Option[];
  appDispatch: Dispatch<AppAction>;
}> = ({ problem, options, appDispatch }) => {
  const [{ answer, focus }, dispatch] = useReducer(
    reducer,
    { problem },
    getInitialState,
  );

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
    appDispatch({
      type: "goToNext",
    });
  }, [appDispatch]);

  return (
    <StageComponent
      problem={problem}
      options={options}
      answer={answer}
      focus={focus}
      answerIsCorrect={answerIsCorrect}
      onHoleSelect={selectHole}
      onOptionSelect={selectOption}
      onNext={goToNext}
    />
  );
};
