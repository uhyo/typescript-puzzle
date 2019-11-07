import { Level } from "~/problems/levels";
import { openDb } from ".";
import { stageStore } from "./config";

interface StageDoc {
  id: string;
  level: Level;
  cleared: boolean;
}

/**
 * Get the list of cleared stages in given level.
 */
export const getClearedStagesInLevel = async (level: Level) => {
  const db = await openDb();

  return new Promise<StageDoc[]>((resolve, reject) => {
    const transaction = db.transaction(stageStore.name, "readonly");
    transaction.onerror = reject;

    const s = transaction.objectStore(stageStore.name);
    const idx = s.index(stageStore.levelIndex);
    const req = idx.getAll(level);

    req.onsuccess = () => {
      resolve(req.result);
    };
  });
};

/**
 * Put the list of cleared stages.
 */
export const putClearedStages = async (level: Level, stageIds: string[]) => {
  const db = await openDb();

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(stageStore.name, "readwrite");
    transaction.oncomplete = () => resolve();
    transaction.onerror = reject;

    const s = transaction.objectStore(stageStore.name);
    let index = 0;
    const loop = () => {
      if (index >= stageIds.length) {
        return;
      }
      const record: StageDoc = {
        id: stageIds[index],
        level,
        cleared: true,
      };
      index++;
      const req = s.put(record);
      req.onsuccess = loop;
    };
    loop();
  });
};
