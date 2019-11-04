import { StageStore } from "~/dataStore/stages";
import { Level, levels } from "~/problems/levels";

export type AppState = {
  stageStore: StageStore;
  page: AppPage;
};

export type AppPage = {
  type: "stage";
  /**
   * ID of stage.
   */
  id: string;
  /**
   * Current level.
   */
  level: Level;
};

export type AppAction = {
  type: "goToNext";
};

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "goToNext": {
      const { stageStore, page } = state;
      if (page.type === "stage") {
        // go to the next stage.
        const levels = stageStore.getStagesInLevel(page.level);
        const current = levels.findIndex(s => s.id === page.id);
        if (current < 0) {
          break;
        }
        const nextStage = levels[current + 1];
        if (nextStage) {
          return {
            ...state,
            page: {
              ...state.page,
              id: nextStage.id,
            },
          };
        }
        console.log("ahh", current);
      }
    }
  }
  return state;
};

export const getInitialState = (options: {}): AppState => {
  const stageStore = new StageStore();
  return {
    stageStore,
    page: {
      type: "stage",
      id: "v1.l1.s1",
      level: levels[1],
    },
  };
};
