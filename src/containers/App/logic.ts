import { StageStore } from "~/dataStore/stages";
import { Level, levelMetadata } from "~/problems/levels";

export type AppState = {
  stageStore: StageStore;
  page: AppPage;
};

export type AppPage =
  | {
      type: "levelSelect";
    }
  | {
      type: "levelLoading";
      level: Level;
    }
  | {
      type: "stage";
      /**
       * ID of stage.
       */
      id: string;
      /**
       * Current level.
       */
      level: Level;
      /**
       * current number of problems.
       * Starts from 1.
       */
      problemNumber: number;
    }
  | {
      type: "complete";
      /**
       * Level which the user completed.
       */
      level: Level;
    };

export type AppAction =
  | {
      type: "goToLevel";
      level: Level;
    }
  | {
      type: "stageLoaded";
      level: Level;
      stageId: string;
    }
  | {
      type: "goToNext";
    };

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "goToNext": {
      const { stageStore, page } = state;
      if (page.type === "stage") {
        if (page.problemNumber >= levelMetadata[page.level].numberOfStages) {
          // レベルクリア
          return {
            ...state,
            page: {
              type: "complete",
              level: page.level,
            },
          };
        }
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
              ...page,
              id: nextStage.id,
              problemNumber: page.problemNumber + 1,
            },
          };
        }
        console.log("ahh", current);
      }
      break;
    }
    case "goToLevel": {
      const { level } = action;
      return {
        ...state,
        page: {
          type: "levelLoading",
          level,
        },
      };
    }
    case "stageLoaded": {
      const { level, stageId } = action;
      return {
        ...state,
        page: {
          type: "stage",
          level,
          id: stageId,
          problemNumber: 1,
        },
      };
    }
  }
  return state;
};

export const getInitialState = (options: {}): AppState => {
  const stageStore = new StageStore();
  return {
    stageStore,
    page: {
      /*
      type: "stage",
      id: "v1.l1.s1",
      level: levels[1],
      problemNumber: 1,
      */
      type: "levelSelect",
    },
  };
};
