import React, { FC, Suspense, useReducer } from "react";
import { AppComponent } from "~/components/App";
import { getInitialState, reducer } from "./logic";

export const App: FC = () => {
  const [{ page, stageStore }, dispatch] = useReducer(
    reducer,
    {},
    getInitialState,
  );

  // TODO: suspense fallback
  return (
    <Suspense fallback={null}>
      <AppComponent page={page} stageStore={stageStore} dispatch={dispatch} />;
    </Suspense>
  );
};
