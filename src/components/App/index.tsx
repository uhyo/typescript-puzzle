import React, { Dispatch, FC, useTransition } from "react";
import { AppAction, AppPage } from "~/containers/App/logic";
import { LevelLoading } from "~/containers/LevelLoading";
import { Stage } from "~/containers/Stage";
import { StageStore } from "~/dataStore/stages";
import { LevelComplete } from "../LevelComplete";
import { LevelSelect } from "../LevelSelect";

export const AppComponent: FC<{
  page: AppPage;
  stageStore: StageStore;
  dispatch: Dispatch<AppAction>;
}> = ({ page, stageStore, dispatch }) => {
  const [startTransition] = useTransition();

  switch (page.type) {
    case "levelSelect": {
      return (
        <LevelSelect
          onSelect={level => {
            startTransition(() => {
              dispatch({
                type: "goToLevel",
                level,
              });
            });
          }}
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
      return <LevelComplete level={page.level} />;
    }
  }
};
