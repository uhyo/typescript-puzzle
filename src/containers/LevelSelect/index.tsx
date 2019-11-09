import React, { FC, useCallback, useTransition } from "react";
import { LevelSelectComponent } from "~/components/LevelSelect";
import { LevelDoc } from "~/db/level";
import { Level } from "~/problems/levels";
import { Fetcher } from "~/util/Fetcher";
import { useAppActions } from "../App/logic";

export const LevelSelect: FC<{
  clearedLevelsFetcher: Fetcher<LevelDoc[]>;
}> = ({ clearedLevelsFetcher }) => {
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

  const clearedLevels = clearedLevelsFetcher.get();

  return (
    <LevelSelectComponent onSelect={onSelect} clearedLevels={clearedLevels} />
  );
};
