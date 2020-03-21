import React, { FC } from "react";
import styled from "styled-components";
import {
  grayTextColor,
  mainTextColor,
  warningBackgroundColor,
} from "~/design/color";

type Props = {
  privacyConfirmed: boolean;
  onConfirm: () => void;
};

export const PrivacyNotice: FC<Props> = ({ privacyConfirmed, onConfirm }) => {
  if (privacyConfirmed) {
    return null;
  }
  return (
    <Wrapper>
      <p>
        This app uses Cookie and Google Analytics. By continuing to use this
        app, you are agreeing to the use of them.
      </p>
      <div>
        <a href="/privacy.html">MORE</a>
        <button type="button" onClick={onConfirm}>
          CLOSE
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 4px;
  background-color: ${warningBackgroundColor};

  & > div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }

  & > div > * {
    margin: 0 1em;
  }

  a {
    color: ${grayTextColor};
    text-decoration: none;
  }

  button {
    color: ${mainTextColor};
  }
`;
