import React, { FC, useCallback, useMemo, useTransition } from "react";
import { StageComponent } from "~/components/Stage";
import { Level } from "~/problems/levels";
import { Option } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { useAppActions } from "../App/logic";
import { checkAnswer } from "./check";
import { useStageState } from "./logic";

export const Stage: FC<{
  level: Level;
  stageNumber: number;
  problem: Problem;
  options: Option[];
}> = ({ level, stageNumber, problem, options }) => {
  const [{ answer, focus }, Provider] = useStageState({ problem });
  const [startTransition] = useTransition();
  const { goToNext, goToTop } = useAppActions();

  const answerIsCorrect = useMemo(() => checkAnswer(problem, answer), [
    problem,
    answer,
  ]);

  const goToNext2 = useCallback(() => {
    startTransition(() => {
      goToNext();
    });
  }, [goToNext]);

  const quitStage = useCallback(() => {
    startTransition(() => {
      goToTop();
    });
  }, [goToTop]);

  return (
    <Provider>
      <StageComponent
        level={level}
        stageNumber={stageNumber}
        problem={problem}
        options={options}
        answer={answer}
        focus={focus}
        answerIsCorrect={answerIsCorrect}
        onNext={goToNext2}
        onQuitStage={quitStage}
      />
    </Provider>
  );
};
