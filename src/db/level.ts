import { Level } from "~/problems/levels";
import { levelStore } from "./config";
import { openDb } from "./openDb";

interface LevelDoc {
  level: Level;
  cleared: boolean;
}

/**
 * Get the list of cleared levels.
 */
export const getClearedLevels = async (): Promise<Level[]> => {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const t = db.transaction(levelStore.name, "readonly");
    t.onerror = reject;
    const store = t.objectStore(levelStore.name);
    const req: IDBRequest<LevelDoc[]> = store.getAll();
    req.onsuccess = () => {
      resolve(req.result.filter(doc => doc.cleared).map(doc => doc.level));
    };
  });
};

/**
 * Add given level to cleared list.
 */
export const putClearedLevel = async (level: Level): Promise<void> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const t = db.transaction(levelStore.name, "readwrite");
    t.onerror = reject;
    const store = t.objectStore(levelStore.name);

    const doc: LevelDoc = {
      level,
      cleared: true,
    };
    const req = store.put(doc);
    req.onsuccess = () => resolve();
  });
};
