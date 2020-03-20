import React, { FC, useCallback, useTransition } from "react";
import { LevelSelectComponent } from "~/components/LevelSelect";
import { LevelDoc } from "~/db/level";
import { Level } from "~/problems/levels";
import { Fetcher } from "~/util/Fetcher";
import { useAppActions } from "../App/logic";
import { ServiceWorkerState } from "../App/registerServiceWorker";

export const LevelSelect: FC<{
  clearedLevelsFetcher: Fetcher<LevelDoc[]>;
  serviceWorkerState: Fetcher<ServiceWorkerState>;
}> = ({ clearedLevelsFetcher, serviceWorkerState }) => {
  const [startTransition] = useTransition();
  const { goToLevel } = useAppActions();
  const onSelect = useCallback(
    (level: Level) => {
      startTransition(() => {
        goToLevel(level);
      });
    },
    [goToLevel],
  );

  return (
    <>
      <LevelSelectComponent
        onSelect={onSelect}
        clearedLevelsFetcher={clearedLevelsFetcher}
        serviceWorkerState={serviceWorkerState}
      />
    </>
  );
};
