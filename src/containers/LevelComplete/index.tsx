import React, { FC } from "react";
import { LevelComplete as LevelCompleteComponent } from "~/components/LevelComplete";
import { Level } from "~/problems/levels";
import { Fetcher } from "~/util/Fetcher";

export const LevelComplete: FC<{
  level: Level;
  saveScoreFetcher: Fetcher<void>;
  achivementFetcher: Fetcher<number>;
}> = ({ level, saveScoreFetcher, achivementFetcher }) => {
  saveScoreFetcher.get();
  const achivement = achivementFetcher.get();
  return <LevelCompleteComponent level={level} achivement={achivement} />;
};
