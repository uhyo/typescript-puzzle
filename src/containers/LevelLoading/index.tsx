import { FC } from "react";
import { StageStore } from "~/dataStore/stages";
import { Level } from "~/problems/levels";
import { useAppActions } from "../App/logic";
import { loadLevel } from "./logic";

/**
 * Logic for loading & initializing a level.
 */
export const LevelLoading: FC<{
  stageStore: StageStore;
  level: Level;
}> = ({ stageStore, level }) => {
  const { stageLoaded } = useAppActions();
  throw loadLevel(stageStore, level).then(stages => {
    stageLoaded(level, stages);
  });
};
