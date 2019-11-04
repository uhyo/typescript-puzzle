/**
 * Name of db used by this app.
 */
export const dbName = "typescript-puzzle";
/**
 * Version of db.
 */
export const dbVersion = 1;

export const levelStore = {
  /**
   * Name of level score store.
   */
  name: "level",
} as const;

export const stageStore = {
  /**
   * Name of stage score store.
   */
  name: "stage",
} as const;
