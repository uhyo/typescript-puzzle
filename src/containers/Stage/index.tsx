import React, { FC, useCallback, useReducer } from "react";
import { StageComponent } from "~/components/Stage";
import { Option } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { getInitialState, reducer } from "./logic";

export const Stage: FC<{
  problem: Problem;
  options: Option[];
}> = ({ problem, options }) => {
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

  return (
    <StageComponent
      problem={problem}
      options={options}
      answer={answer}
      focus={focus}
      onHoleSelect={selectHole}
      onOptionSelect={selectOption}
    />
  );
};
