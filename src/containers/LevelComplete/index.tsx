import React, { FC } from "react";
import { LevelComplete as LevelCompleteComponent } from "~/components/LevelComplete";
import { Level } from "~/problems/levels";
import { Fetcher } from "~/util/Fetcher";

export const LevelComplete: FC<{
  level: Level;
  saveScoreFetcher: Fetcher<void>;
}> = ({ level, saveScoreFetcher }) => {
  saveScoreFetcher.get();
  return <LevelCompleteComponent level={level} />;
};
