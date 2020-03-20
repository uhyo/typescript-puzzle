import React, { ComponentProps, FC, lazy } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppPage } from "~/containers/App/logic";
import { ServiceWorkerState } from "~/containers/App/registerServiceWorker";
import { LevelLoading } from "~/containers/LevelLoading";
import { LevelSelect } from "~/containers/LevelSelect";
import { StageStore } from "~/dataStore/stages";
import { mainBackgroundColor } from "~/design/color";
import { sourceCodeFontFamily, uiFontFamily } from "~/design/font";
import { Fetcher } from "~/util/Fetcher";
import { phone } from "~/util/media";

const Stage = lazy(() =>
  import(/*
    webpackChunkName: "page_Stage"
  */ "~/containers/Stage").then(
    ({ Stage }) => ({
      default: Stage,
    }),
  ),
);

const LevelComplete = lazy(() =>
  import(
    /*
    webpackChunkName: "page_Stage"
  */ "~/containers/LevelComplete"
  ).then(({ LevelComplete }) => ({
    default: LevelComplete,
  })),
);

type Props = {
  page: AppPage;
  stageStore: StageStore;
  serviceWorkerState: Fetcher<ServiceWorkerState>;
};

const AppContent: FC<Props> = ({ page, stageStore, serviceWorkerState }) => {
  switch (page.type) {
    case "levelSelect": {
      return (
        <LevelSelect
          clearedLevelsFetcher={page.clearedLevelsFetcher}
          serviceWorkerState={serviceWorkerState}
        />
      );
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
  height: 0;
  overflow: hidden;

  & > span:nth-child(1) {
    font-family: ${sourceCodeFontFamily};
  }
`;

export const AppComponent: FC<ComponentProps<typeof AppContent>> = props => (
  <>
    <Header />
    <AppWrapper>
      <AppContent {...props} />
    </AppWrapper>
    <Footer aria-hidden="true">
      <span>a</span>
    </Footer>
    <GlobalStyle />
  </>
);
