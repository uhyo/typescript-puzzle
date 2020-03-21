import React, { FC, Suspense, useCallback, useTransition } from "react";
import { StageComponent } from "~/components/Stage";
import { Level } from "~/definitions/stages/levels";
import { SUSPENSE_CONFIG } from "~/design/suspenseConfig";
import { StageDefinition } from "~/stages/stageDefinition";
import { RemoteCompiler } from "~/ts-compiler";
import { useAppActions } from "../App/logic";
import { useStageState } from "./logic";

export const Stage: FC<{
  compiler: RemoteCompiler;
  level: Level;
  stageNumber: number;
  stage: StageDefinition;
}> = ({ compiler, level, stageNumber, stage }) => {
  const { question } = stage;

  const [{ answer, focus, check }, Provider] = useStageState({
    question,
    remoteCompiler: compiler,
  });
  const [startPageTransition] = useTransition(SUSPENSE_CONFIG);
  const [startCheckTransition, checkIsLoading] = useTransition(SUSPENSE_CONFIG);
  const { goToNext, goToTop } = useAppActions();

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
          stage={stage}
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
