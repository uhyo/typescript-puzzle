import React, { FC, useCallback, useEffect, useTransition } from "react";
import { ErrorBoundary } from "~/components/ErrorBoundary";
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

  console.log("rerendered");
  useEffect(() => {
    console.log("renren");
  });

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
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Provider>
  );
};
