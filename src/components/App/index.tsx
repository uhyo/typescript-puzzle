import React, { Dispatch, FC } from "react";
import { AppAction, AppPage } from "~/containers/App/logic";
import { Stage } from "~/containers/Stage";
import { StageStore } from "~/dataStore/stages";
import { LevelComplete } from "../LevelComplete";
import { LevelSelect } from "../LevelSelect";

export const AppComponent: FC<{
  page: AppPage;
  stageStore: StageStore;
  dispatch: Dispatch<AppAction>;
}> = ({ page, stageStore, dispatch }) => {
  switch (page.type) {
    case "levelSelect": {
      return <LevelSelect />;
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
      return <LevelComplete level={page.level} />;
    }
  }
};
