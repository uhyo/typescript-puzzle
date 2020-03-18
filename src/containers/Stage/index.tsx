import React, {
  FC,
  Suspense,
  useCallback,
  useEffect,
  useTransition,
} from "react";
import { StageComponent } from "~/components/Stage";
import { SUSPENSE_CONFIG } from "~/design/suspenseConfig";
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
  const [startPageTransition] = useTransition(SUSPENSE_CONFIG);
  const [startCheckTransition, checkIsLoading] = useTransition(SUSPENSE_CONFIG);
  const { goToNext, goToTop } = useAppActions();

  console.log("rerendered");
  useEffect(() => {
    console.log("renren");
  });

  const goToNext2 = useCallback(() => {
    startPageTransition(() => {
      goToNext();
    });
  }, [goToNext]);

  const quitStage = useCallback(() => {
    startPageTransition(() => {
      goToTop();
    });
  }, [goToTop]);

  return (
    <Provider>
      <Suspense fallback={<p>loading</p>}>
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
          startCheckTransition={startCheckTransition}
          isCheckLoading={checkIsLoading}
        />
      </Suspense>
    </Provider>
  );
};
