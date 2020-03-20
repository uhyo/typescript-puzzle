import React, { FC, Suspense } from "react";
import { AppComponent } from "~/components/App";
import { useAppState } from "./logic";

export const App: FC = () => {
  const [{ page, stageStore, serviceWorkerState }, Provider] = useAppState();

  // TODO: suspense fallback
  return (
    <Provider>
      <Suspense fallback={null}>
        <AppComponent
          page={page}
          stageStore={stageStore}
          serviceWorkerState={serviceWorkerState}
        />
      </Suspense>
    </Provider>
  );
};
