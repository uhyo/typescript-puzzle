import React, { FC, useCallback, useMemo, useTransition } from "react";
import { StageComponent } from "~/components/Stage";
import { Level } from "~/problems/levels";
import { HoleValue } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { RemoteCompiler } from "~/ts-compiler";
import { useAppActions } from "../App/logic";
import { checkAnswer } from "./check";
import { useStageState } from "./logic";

export const Stage: FC<{
  compiler: RemoteCompiler;
  level: Level;
  stageNumber: number;
  problem: Problem;
  options: HoleValue[];
}> = ({ compiler, level, stageNumber, problem, options }) => {
  const [{ answer, focus }, Provider] = useStageState({
    problem,
    remoteCompiler: compiler,
  });
  const [startTransition] = useTransition();
  const { goToNext, goToTop } = useAppActions();

  const answerCheck = useMemo(() => checkAnswer(problem, answer), [
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
        answerCheck={answerCheck}
        onNext={goToNext2}
        onQuitStage={quitStage}
      />
    </Provider>
  );
};
