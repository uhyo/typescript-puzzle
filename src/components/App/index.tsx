import React, { FC } from "react";
import { AppPage } from "~/containers/App/logic";
import { Stage } from "~/containers/Stage";
import { StageStore } from "~/dataStore/stages";

export const AppComponent: FC<{
  page: AppPage;
  stageStore: StageStore;
}> = ({ page, stageStore }) => {
  switch (page.type) {
    case "stage": {
      const stage = stageStore.getStage(page.id);
      return <Stage problem={stage.problem} options={stage.options} />;
    }
  }
};
