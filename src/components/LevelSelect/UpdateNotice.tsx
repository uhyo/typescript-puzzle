import React, { FC, Suspense, useTransition } from "react";
import styled from "styled-components";
import { Workbox } from "workbox-window";
import { useAppActions } from "~/containers/App/logic";
import {
  reloadToUpdate,
  ServiceWorkerState,
} from "~/containers/App/registerServiceWorker";
import { grayTextColor, mainTextColor } from "~/design/color";
import { SUSPENSE_CONFIG } from "~/design/suspenseConfig";
import { Fetcher } from "~/util/Fetcher";

type Props = {
  serviceWorkerState: Fetcher<ServiceWorkerState>;
};

export const UpdateNotice: FC<Props> = ({ serviceWorkerState }) => {
  return (
    <Wrapper>
      <Suspense fallback={null}>
        <UpdateNoticeWaiter1 serviceWorkerState={serviceWorkerState} />
      </Suspense>
    </Wrapper>
  );
};

const UpdateNoticeWaiter1: FC<Props> = ({ serviceWorkerState }) => {
  const { checkSwUpdate } = useAppActions();
  const [startTraisition, isLoading] = useTransition(SUSPENSE_CONFIG);
  const state = serviceWorkerState.get();

  if (state.status === "unsupported") {
    return null;
  }
  return (
    <Suspense
      fallback={
        <p>
          App is up to date.
          <button
            type="button"
            onClick={() => {
              startTraisition(() => {
                checkSwUpdate();
              });
            }}
          >
            Check Updates
          </button>
        </p>
      }
    >
      {isLoading ? (
        <Checking />
      ) : (
        <UpdateNoticeWaiter2 wb={state.wb} waitingState={state.waitingState} />
      )}
    </Suspense>
  );
};

const UpdateNoticeWaiter2: FC<{
  wb: Workbox;
  waitingState: Fetcher<unknown>;
}> = ({ wb, waitingState }) => {
  waitingState.get();
  const update = () => {
    reloadToUpdate(wb);
  };
  return (
    <p>
      An update is available.
      <button type="button" onClick={update}>
        Update
      </button>
    </p>
  );
};

const Checking: FC<{}> = () => {
  return <p>Checking...</p>;
};

const Wrapper = styled.div`
  height: 1.5em;
  color: ${grayTextColor};

  & > p > button {
    margin: 0 1em;
    color: ${mainTextColor};
  }
`;
