import { StageStore } from "~/dataStore/stages";
import { Level } from "~/definitions/stages/levels";
import { levelStore } from "./config";
import { openDb } from "./openDb";
import { getClearedStagesInLevel } from "./stage";

export interface LevelDoc {
  level: Level;
  status: "cleared" | "completed";
}

/**
 * Get the list of cleared levels.
 */
export const getClearedLevels = async (): Promise<LevelDoc[]> => {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const t = db.transaction(levelStore.name, "readonly");
    t.onerror = reject;
    const store = t.objectStore(levelStore.name);
    const req: IDBRequest<LevelDoc[]> = store.getAll();
    req.onsuccess = () => {
      resolve(req.result);
    };
  });
};

/**
 * Add given level to cleared list.
 */
export const putClearedLevel = async (
  stageStore: StageStore,
  level: Level,
): Promise<void> => {
  const stageInLevel = new Set(
    stageStore.getStagesInLevel(level).map(d => d.id),
  );
  const clearedStageDocs = await getClearedStagesInLevel(level);
  const clearedValidStages = clearedStageDocs.filter(doc =>
    stageInLevel.has(doc.id),
  );
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const t = db.transaction(levelStore.name, "readwrite");
    t.onerror = reject;
    const ls = t.objectStore(levelStore.name);

    const doc: LevelDoc = {
      level,
      status:
        clearedValidStages.length >= stageInLevel.size
          ? "completed"
          : "cleared",
    };

    const req = ls.put(doc);
    req.onsuccess = () => resolve();
  });
};
