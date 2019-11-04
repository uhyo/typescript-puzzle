import React, { Dispatch, FC } from "react";
import { AppAction, AppPage } from "~/containers/App/logic";
import { Stage } from "~/containers/Stage";
import { StageStore } from "~/dataStore/stages";

export const AppComponent: FC<{
  page: AppPage;
  stageStore: StageStore;
  dispatch: Dispatch<AppAction>;
}> = ({ page, stageStore, dispatch }) => {
  switch (page.type) {
    case "stage": {
      const stage = stageStore.getStage(page.id);
      return (
        <Stage
          problem={stage.problem}
          options={stage.options}
          appDispatch={dispatch}
        />
      );
    }
  }
};
