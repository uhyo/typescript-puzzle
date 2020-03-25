import React, { FC, Suspense } from "react";
import styled, { keyframes } from "styled-components";
import { Workbox } from "workbox-window";
import {
  reloadToUpdate,
  ServiceWorkerState,
} from "~/containers/App/registerServiceWorker";
import { grayTextColor, mainTextColor } from "~/design/color";
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
  const state = serviceWorkerState.get();

  if (state.status === "unsupported") {
    return null;
  }

  return (
    <Suspense fallback={<UpdateNoticeWaiter2 serviceWorkerState={state} />}>
      <WaitUpdates wb={state.wb} waiter={state.waitingState} />
    </Suspense>
  );
};
const WaitUpdates: FC<{
  wb: Workbox;
  waiter: Fetcher<void>;
}> = ({ wb, waiter }) => {
  waiter.get();
  console.log();
  return (
    <UpdateAvailableMessage>
      An update is available.
      <button
        type="button"
        onClick={() => {
          reloadToUpdate(wb);
        }}
      >
        Update
      </button>
    </UpdateAvailableMessage>
  );
};

const appearAnim = keyframes`
  from {
    background-color: rgba(255, 255, 64, 1);
  }

  to {
    background-color: rgba(255, 255, 64, 0);
  }
`;

const UpdateAvailableMessage = styled.p`
  animation: ${appearAnim} 0.8s ease-out;
`;

const UpdateNoticeWaiter2: FC<{
  serviceWorkerState: Extract<ServiceWorkerState, { status: "supported" }>;
}> = ({ serviceWorkerState: sw }) => {
  if (!sw.checkingUpdateTimeout) {
    return null;
  }

  return (
    <Suspense fallback={<Checking />}>
      <UpdateNoticeWaiter3 waiter={sw.checkingUpdateTimeout} />
    </Suspense>
  );
};

const UpdateNoticeWaiter3: FC<{
  waiter: Fetcher<void>;
}> = ({ waiter }) => {
  waiter.get();
  return null;
};

const Checking: FC = () => {
  return <p>Checking updates...</p>;
};

const Wrapper = styled.div`
  height: 1.5em;
  color: ${grayTextColor};

  & > p > button {
    margin: 0 1em;
    color: ${mainTextColor};
  }
`;
