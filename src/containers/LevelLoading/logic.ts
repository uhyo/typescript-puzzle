import { StageStore } from "~/dataStore/stages";
import { Level } from "~/problems/levels";

/**
 * Logic to load a new level.
 */
export const loadLevel = async (store: StageStore, level: Level) => {
  const stages = store.getStagesInLevel(level);
  const stage = stages[0];
  if (!stage) {
    // !?
    throw new Error(`No stage in level ${level}`);
  }
  return stage.id;
};
