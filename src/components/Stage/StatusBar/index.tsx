import React, { FC } from "react";
import styled from "styled-components";
import { CheckState } from "~/containers/Stage/check";
import { grayTextColor } from "~/design/color";
import { useKeptValue } from "~/util/hooks/useKeptValue";

type Props = {
  isLoading: boolean;
  check?: CheckState;
};

export const StatusBar: FC<Props> = ({ isLoading, check }) => {
  const message = stringForCheck(isLoading, check);
  const shownMessage = useKeptValue(message, (prev, current) => !!current);
  return <StatusBarStyle shown={!!message}>{shownMessage}</StatusBarStyle>;
};

const stringForCheck = (isLoading: boolean, check: CheckState | undefined) => {
  if (isLoading) {
    return "evaluating...";
  }
  if (check?.status === "error") {
    return "error 😢";
  }
  return undefined;
};

export const StatusBarStyle = styled.div<{
  shown: boolean;
}>`
  height: 1.5em;
  line-height: 1.5;
  color: ${grayTextColor};
  opacity: ${props => (props.shown ? "1" : "0")};
  transition: opacity 0.3s ease 0.1s;
`;
