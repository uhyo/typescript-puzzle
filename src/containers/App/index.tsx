import React, { FC, Suspense, useReducer, useState } from "react";
import { AppComponent } from "~/components/App";
import { StageStore } from "~/dataStore/stages";
import { getInitialState, reducer } from "./logic";

export const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, {}, getInitialState);
  const [stageStore] = useState(() => new StageStore());

  // TODO: suspense fallback
  return (
    <Suspense fallback={null}>
      <AppComponent page={state.page} stageStore={stageStore} />;
    </Suspense>
  );
};
