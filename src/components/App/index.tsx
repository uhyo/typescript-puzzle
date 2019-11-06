import React, { Dispatch, FC } from "react";
import { AppAction, AppPage } from "~/containers/App/logic";
import { LevelComplete } from "~/containers/LevelComplete";
import { LevelLoading } from "~/containers/LevelLoading";
import { LevelSelect } from "~/containers/LevelSelect";
import { Stage } from "~/containers/Stage";
import { StageStore } from "~/dataStore/stages";

export const AppComponent: FC<{
  page: AppPage;
  stageStore: StageStore;
  dispatch: Dispatch<AppAction>;
}> = ({ page, stageStore, dispatch }) => {
  switch (page.type) {
    case "levelSelect": {
      return (
        <LevelSelect
          dispatch={dispatch}
          clearedLevelsFetcher={page.clearedLevelsFetcher}
        />
      );
    }
    case "levelLoading": {
      return (
        <LevelLoading
          level={page.level}
          stageStore={stageStore}
          dispatch={dispatch}
        />
      );
    }
    case "stage": {
      const stage = stageStore.getStage(page.id);
      return (
        <Stage
          key={stage.id} // <- TODO: bad practice
          problem={stage.problem}
          options={stage.options}
          appDispatch={dispatch}
        />
      );
    }
    case "complete": {
      return (
        <LevelComplete
          level={page.level}
          saveScoreFetcher={page.saveScoreFetcher}
        />
      );
    }
  }
};
