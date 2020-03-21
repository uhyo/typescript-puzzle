import React, { FC, useCallback, useTransition } from "react";
import { LevelSelectComponent } from "~/components/LevelSelect";
import { LevelDoc } from "~/db/level";
import { Level } from "~/definitions/stages/levels";
import { Fetcher } from "~/util/Fetcher";
import { useAppActions } from "../App/logic";
import { savePrivacyConfirmed } from "../App/privacyConfirmation";
import { ServiceWorkerState } from "../App/registerServiceWorker";

export const LevelSelect: FC<{
  clearedLevelsFetcher: Fetcher<LevelDoc[]>;
  serviceWorkerState: Fetcher<ServiceWorkerState>;
  privacyConfirmed: boolean;
}> = ({ clearedLevelsFetcher, serviceWorkerState, privacyConfirmed }) => {
  const [startTransition] = useTransition();
  const { goToLevel, setPrivacyConfirmed } = useAppActions();
  const onSelect = useCallback(
    (level: Level) => {
      startTransition(() => {
        goToLevel(level);
      });
    },
    [goToLevel],
  );
  const onPrivacyConfirm = useCallback(() => {
    savePrivacyConfirmed();
    setPrivacyConfirmed();
  }, [setPrivacyConfirmed]);

  return (
    <>
      <LevelSelectComponent
        onSelect={onSelect}
        clearedLevelsFetcher={clearedLevelsFetcher}
        serviceWorkerState={serviceWorkerState}
        privacyConfirmed={privacyConfirmed}
        onPrivacyConfirm={onPrivacyConfirm}
      />
    </>
  );
};
