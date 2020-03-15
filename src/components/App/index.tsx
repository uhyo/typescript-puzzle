import React, { ComponentProps, FC } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppPage } from "~/containers/App/logic";
import { LevelComplete } from "~/containers/LevelComplete";
import { LevelLoading } from "~/containers/LevelLoading";
import { LevelSelect } from "~/containers/LevelSelect";
import { Stage } from "~/containers/Stage";
import { StageStore } from "~/dataStore/stages";
import { mainBackgroundColor } from "~/design/color";
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
          compiler={page.compiler}
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
          achivementFetcher={page.achivementFetcher}
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
  display: flex;
  flex-flow: nowrap column;
  box-sizing: border-box;
  width: 100%;
  height: 660px;
  ${phone`
      height: 100%;
    `}
  max-height: 100%;
  font-family: ${uiFontFamily};
`;

const Header = styled.div`
  flex: auto 1 1;
  background-color: ${mainBackgroundColor};
`;

const Footer = styled.div`
  flex: auto 1 1;
`;

export const AppComponent: FC<ComponentProps<typeof AppContent>> = props => (
  <>
    <Header />
    <AppWrapper>
      <AppContent {...props} />
    </AppWrapper>
    <Footer />
    <GlobalStyle />
  </>
);
