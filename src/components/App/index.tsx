import React, { ComponentProps, Dispatch, FC } from "react";
import styled from "styled-components";
import { AppAction, AppPage } from "~/containers/App/logic";
import { LevelComplete } from "~/containers/LevelComplete";
import { LevelLoading } from "~/containers/LevelLoading";
import { LevelSelect } from "~/containers/LevelSelect";
import { Stage } from "~/containers/Stage";
import { StageStore } from "~/dataStore/stages";
import { uiFontFamily } from "~/design/font";

const AppContent: FC<{
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
      const stageId = page.stages[page.stageIndex];
      const stage = stageStore.getStage(stageId);
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

const AppWrapper = styled.div`
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  width: 600px;
  height: 100vh;
  max-width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  font-family: ${uiFontFamily};
`;

export const AppComponent: FC<ComponentProps<typeof AppContent>> = props => (
  <AppWrapper>
    <AppContent {...props} />
  </AppWrapper>
);
