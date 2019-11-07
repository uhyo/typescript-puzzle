import { Dispatch, FC } from "react";
import { StageStore } from "~/dataStore/stages";
import { Level } from "~/problems/levels";
import { AppAction } from "../App/logic";
import { loadLevel } from "./logic";

/**
 * Logic for loading & initializing a level.
 */
export const LevelLoading: FC<{
  stageStore: StageStore;
  level: Level;
  dispatch: Dispatch<AppAction>;
}> = ({ stageStore, level, dispatch }) => {
  throw loadLevel(stageStore, level).then(stages => {
    dispatch({
      type: "stageLoaded",
      level,
      stages,
    });
  });
};
