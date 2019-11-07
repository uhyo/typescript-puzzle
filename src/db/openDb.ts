import { dbName, dbVersion, levelStore, stageStore } from "./config";

let dbCache: IDBDatabase | undefined;

export const openDb = (): Promise<IDBDatabase> => {
  if (dbCache) {
    // if a cached instance exists, return it.
    return Promise.resolve(dbCache);
  }
  const req = indexedDB.open(dbName, dbVersion);

  return new Promise((resolve, reject) => {
    req.onerror = reject;
    req.onsuccess = () => {
      dbCache = req.result;
      resolve(dbCache);
    };
    req.onupgradeneeded = () => {
      const db = req.result;
      db.onerror = reject;

      db.createObjectStore(levelStore.name, {
        keyPath: "level",
      });

      const ss = db.createObjectStore(stageStore.name, {
        keyPath: "id",
      });

      ss.createIndex(stageStore.levelIndex, "level");

      db.onerror = null;
    };
  });
};
