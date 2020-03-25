import React, { FC, Suspense } from "react";
import styled from "styled-components";
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

  state.waitingState.get();
  return (
    <p>
      An update is available.
      <button
        type="button"
        onClick={() => {
          reloadToUpdate(state.wb);
        }}
      >
        Update
      </button>
    </p>
  );
};

const Wrapper = styled.div`
  height: 1.5em;
  color: ${grayTextColor};

  & > p > button {
    margin: 0 1em;
    color: ${mainTextColor};
  }
`;
