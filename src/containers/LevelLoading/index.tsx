import { FC } from "react";
import { StageStore } from "~/dataStore/stages";
import { Level } from "~/problems/levels";
import { useAppActions } from "../App/logic";
import { checkWorkerCache, loadLevel } from "./logic";

/**
 * Logic for loading & initializing a level.
 */
export const LevelLoading: FC<{
  stageStore: StageStore;
  level: Level;
}> = ({ stageStore, level }) => {
  const { stageLoaded, goToConfirmLargeDownload } = useAppActions();
  const p = Promise.all([loadLevel(stageStore, level), checkWorkerCache()]);
  throw p.then(([stages, hasCache]) => {
    if (hasCache) {
      stageLoaded(level, stages);
    } else {
      goToConfirmLargeDownload({
        level,
        stages,
      });
    }
  });
};
