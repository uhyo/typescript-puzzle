import { StageStore } from "~/dataStore/stages";
import { getClearedStagesInLevel } from "~/db/stage";
import { Level, levelMetadata } from "~/problems/levels";
import { tscWorkerCacheName } from "~/sw/cacheName";
import { shuffle } from "~/util/shuffle";

/**
 * Logic to load a new level.
 */
export const loadLevel = async (
  store: StageStore,
  level: Level,
): Promise<string[]> => {
  const stages = store.getStagesInLevel(level);
  const clearedStages = new Set(
    (await getClearedStagesInLevel(level)).map(doc => doc.id),
  );
  const unclearedStages = shuffle(
    stages.filter(stage => !clearedStages.has(stage.id)),
  );
  const { numberOfStages } = levelMetadata[level];
  if (unclearedStages.length >= numberOfStages) {
    return unclearedStages.slice(0, numberOfStages).map(stage => stage.id);
  }
  // reuse cleared stages to fill required number of stages
  const remainingStages = stages.filter(stage => clearedStages.has(stage.id));
  shuffle(remainingStages);
  return shuffle(
    [
      ...unclearedStages,
      ...remainingStages.slice(0, numberOfStages - unclearedStages.length),
    ].map(stage => stage.id),
  );
};

/**
 * Check whether tsc worker is already cached.
 */
export const checkWorkerCache = async (): Promise<boolean> => {
  if (!window.caches) {
    return false;
  }
  if (!window.caches.has(tscWorkerCacheName)) {
    return false;
  }
  const cache = await window.caches.open(tscWorkerCacheName);
  const keys = await cache.keys();
  return keys.some(req => req.url.includes(".tsc.worker"));
};
