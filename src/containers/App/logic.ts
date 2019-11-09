import { StageStore } from "~/dataStore/stages";
import { getClearedLevels, LevelDoc, putClearedLevel } from "~/db/level";
import { putClearedStages } from "~/db/stage";
import { Level, levelMetadata, levels } from "~/problems/levels";
import { Fetcher } from "~/util/Fetcher";
import { generateStateManagenentTools } from "~/util/states";

export type AppState = {
  stageStore: StageStore;
  page: AppPage;
};

export type AppPage =
  | {
      type: "levelSelect";
      clearedLevelsFetcher: Fetcher<LevelDoc[]>;
    }
  | {
      type: "levelLoading";
      level: Level;
    }
  | {
      type: "stage";
      /**
       * List of all stages
       */
      stages: string[];
      /**
       * Current index of stage.
       */
      stageIndex: number;
      /**
       * Current level.
       */
      level: Level;
    }
  | {
      type: "complete";
      /**
       * Level which the user completed.
       */
      level: Level;
      /**
       * Fetcher for saving score.
       */
      saveScoreFetcher: Fetcher<void>;
    };

const getInitialState = (): AppState => {
  const stageStore = new StageStore();
  return {
    stageStore,
    page: {
      /*
      type: "levelSelect",
      clearedLevelsFetcher: new Fetcher(getClearedLevels),
      */
      type: "levelLoading",
      level: levels[1],
    },
  };
};

export const {
  useManagedState: useAppState,
  useActions: useAppActions,
} = generateStateManagenentTools({
  getInitialState,
  getActions: setState => ({
    goToNext: () => {
      setState(state => {
        const { stageStore, page } = state;
        if (page.type === "stage") {
          const nextIndex = page.stageIndex + 1;
          if (nextIndex >= levelMetadata[page.level].numberOfStages) {
            // レベルクリア
            const save = async () => {
              await putClearedStages(page.level, page.stages);
              await putClearedLevel(stageStore, page.level);
            };
            return {
              ...state,
              page: {
                type: "complete",
                level: page.level,
                saveScoreFetcher: new Fetcher(save),
              },
            };
          }
          // go to the next stage.
          return {
            ...state,
            page: {
              ...page,
              stageIndex: page.stageIndex + 1,
            },
          };
        }
        return state;
      });
    },
    goToLevel: (level: Level) => {
      setState(state => ({
        ...state,
        page: {
          type: "levelLoading",
          level,
        },
      }));
    },
    stageLoaded: (level: Level, stages: string[]) => {
      setState(state => ({
        ...state,
        page: {
          type: "stage",
          level,
          stages,
          stageIndex: 0,
        },
      }));
    },
    goToTop: () => {
      const clearedLevelsFetcher = new Fetcher(getClearedLevels);
      setState(state => ({
        ...state,
        page: {
          type: "levelSelect",
          clearedLevelsFetcher,
        },
      }));
    },
  }),
});
