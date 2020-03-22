import { StageStore } from "~/dataStore/stages";
import {
  getClearedLevels,
  LevelDoc,
  putClearedLevel,
  recheckClearedLevels,
} from "~/db/level";
import { getClearedStagesInLevel, putClearedStages } from "~/db/stage";
import { Level, levelMetadata } from "~/definitions/stages/levels";
import { RemoteCompiler } from "~/ts-compiler";
import { Fetcher } from "~/util/Fetcher";
import { FirstCell } from "~/util/firstCell";
import { generateStateManagenentTools } from "~/util/states";
import {
  trackClearLevel,
  trackEnterLevel,
  trackStageClear,
} from "~/util/tracking";
import { getPrivacyConfirmed } from "./privacyConfirmation";
import {
  registerServiceWorker,
  ServiceWorkerState,
  waitForSWWaiting,
} from "./registerServiceWorker";

export type AppState = {
  stageStore: StageStore;
  page: AppPage;
  serviceWorkerState: Fetcher<ServiceWorkerState>;
  privacyConfirmed: boolean;
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
      type: "confirmLargeDownload";
      next: {
        level: Level;
        stages: string[];
      };
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
      clearedLevelsFetcher: new Fetcher(async () => {
        // on initial load, re-check previous achivements.
        await recheckClearedLevels(stageStore);
        return getClearedLevels();
      }),
    },
    serviceWorkerState: new Fetcher(registerServiceWorker),
    privacyConfirmed: getPrivacyConfirmed(),
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
      const trackingCell = new FirstCell<void>();
      setState(state => {
        const { stageStore, page } = state;
        if (page.type === "stage") {
          const nextIndex = page.stageIndex + 1;
          if (nextIndex >= levelMetadata[page.level].numberOfStages) {
            // レベルクリア
            trackingCell.get(() => {
              trackStageClear(page.stages[page.stageIndex]);
              trackClearLevel(page.level);
            });

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
          trackingCell.get(() => {
            trackStageClear(page.stages[page.stageIndex]);
          });
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
      trackEnterLevel(level);
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
    goToConfirmLargeDownload: (next: { level: Level; stages: string[] }) => {
      setState(state => ({
        ...state,
        page: {
          type: "confirmLargeDownload",
          next,
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
    /**
     * Set privacy confirmation state to confirmed.
     */
    setPrivacyConfirmed: () => {
      setState(state => ({
        ...state,
        privacyConfirmed: true,
      }));
    },
    /**
     * Check ServiceWorker updates.
     */
    checkSwUpdate: () => {
      const resultCell = new FirstCell<Fetcher<ServiceWorkerState>>();
      setState(state => {
        const sw = state.serviceWorkerState.getOrUndefined();
        if (sw === undefined || sw.status === "unsupported") {
          return state;
        }
        return {
          ...state,
          serviceWorkerState: resultCell.get(() => {
            return new Fetcher(async () => {
              await sw.wb.update();
              return {
                status: "supported",
                wb: sw.wb,
                waitingState: new Fetcher(() => waitForSWWaiting(sw.wb)),
              };
            });
          }),
        };
      });
    },
  }),
});
