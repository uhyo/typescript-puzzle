import React, { FC, Suspense } from "react";
import { AppComponent } from "~/components/App";
import { useAppState } from "./logic";

export const App: FC = () => {
  const [
    {
      page,
      stageStore,
      serviceWorkerState,
      privacyConfirmed,
      lastSeenQuestionNumber,
    },
    Provider,
  ] = useAppState();

  return (
    <Provider>
      <Suspense fallback={null}>
        <AppComponent
          page={page}
          stageStore={stageStore}
          serviceWorkerState={serviceWorkerState}
          privacyConfirmed={privacyConfirmed}
          lastSeenQuestionNumber={lastSeenQuestionNumber}
        />
      </Suspense>
    </Provider>
  );
};
