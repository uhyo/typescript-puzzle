import { StageStore } from "~/dataStore/stages";
import { getClearedLevels, LevelDoc, putClearedLevel } from "~/db/level";
import { getClearedStagesInLevel, putClearedStages } from "~/db/stage";
import { Level, levelMetadata } from "~/problems/levels";
import { RemoteCompiler } from "~/ts-compiler";
import { Fetcher } from "~/util/Fetcher";
import { FirstCell } from "~/util/firstCell";
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
       * Prepared remote compiler
       */
      compiler: RemoteCompiler;
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
      /**
       * Fetcher for list of cleared stages in this level.
       */
      achivementFetcher: Fetcher<number>;
    };

const getInitialState = (): AppState => {
  const stageStore = new StageStore();
  return {
    stageStore,
    page: {
      type: "levelSelect",
      clearedLevelsFetcher: new Fetcher(getClearedLevels),
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
      const saveScoreCell = new FirstCell<Fetcher<void>>();
      const achievementCell = new FirstCell<Fetcher<number>>();
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
            page.compiler.terminate();
            return {
              ...state,
              page: {
                type: "complete",
                level: page.level,
                saveScoreFetcher: saveScoreCell.get(() => new Fetcher(save)),
                achivementFetcher: achievementCell.get(
                  () =>
                    new Fetcher(async () => {
                      const allStages = stageStore.getStagesInLevel(page.level);
                      const docs = await getClearedStagesInLevel(page.level);
                      return docs.length / allStages.length;
                    }),
                ),
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
      const compilerCell = new FirstCell<RemoteCompiler>();
      setState(state => ({
        ...state,
        page: {
          type: "stage",
          compiler: compilerCell.get(() => new RemoteCompiler()),
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
