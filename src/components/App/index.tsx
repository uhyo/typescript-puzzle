import React, { ComponentProps, FC } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppPage } from "~/containers/App/logic";
import { LevelComplete } from "~/containers/LevelComplete";
import { LevelLoading } from "~/containers/LevelLoading";
import { LevelSelect } from "~/containers/LevelSelect";
import { Stage } from "~/containers/Stage";
import { StageStore } from "~/dataStore/stages";
import { uiFontFamily } from "~/design/font";
import { phone } from "~/util/media";

const AppContent: FC<{
  page: AppPage;
  stageStore: StageStore;
}> = ({ page, stageStore }) => {
  switch (page.type) {
    case "levelSelect": {
      return <LevelSelect clearedLevelsFetcher={page.clearedLevelsFetcher} />;
    }
    case "levelLoading": {
      return <LevelLoading level={page.level} stageStore={stageStore} />;
    }
    case "stage": {
      const stageId = page.stages[page.stageIndex];
      const stage = stageStore.getStage(stageId);
      return (
        <Stage
          key={stage.id} // <- TODO: bad practice
          level={page.level}
          stageNumber={page.stageIndex + 1}
          problem={stage.problem}
          options={stage.options}
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

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
  #root {
    display: flex;
    flex-flow: nowrap column;
    justify-content: center;
  }
`;

const AppWrapper = styled.div`
  width: 600px;
  height: 660px;
  ${phone`
      height: 100%;
    `}
  max-height: 100%;
  max-width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  font-family: ${uiFontFamily};
`;

export const AppComponent: FC<ComponentProps<typeof AppContent>> = props => (
  <AppWrapper>
    <AppContent {...props} />
    <GlobalStyle />
  </AppWrapper>
);
