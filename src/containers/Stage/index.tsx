import React, { FC, useCallback, useTransition } from "react";
import { StageComponent } from "~/components/Stage";
import { Level } from "~/problems/levels";
import { HoleValue } from "~/problems/options";
import { Problem } from "~/problems/problemDefinition/problem";
import { RemoteCompiler } from "~/ts-compiler";
import { useAppActions } from "../App/logic";
import { useStageState } from "./logic";

export const Stage: FC<{
  compiler: RemoteCompiler;
  level: Level;
  stageNumber: number;
  problem: Problem;
  options: HoleValue[];
}> = ({ compiler, level, stageNumber, problem, options }) => {
  const [{ answer, focus, check }, Provider] = useStageState({
    problem,
    remoteCompiler: compiler,
  });
  const [startTransition] = useTransition();
  const { goToNext, goToTop } = useAppActions();

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
        check={check}
        onNext={goToNext2}
        onQuitStage={quitStage}
      />
    </Provider>
  );
};
