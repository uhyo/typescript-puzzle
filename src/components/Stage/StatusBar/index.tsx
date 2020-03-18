import React, { FC } from "react";
import styled from "styled-components";
import { CheckState } from "~/containers/Stage/check";
import { grayTextColor } from "~/design/color";

type Props = {
  className?: string;
  isLoading: boolean;
  check?: CheckState;
};

const StatusBarInner: FC<Props> = ({ className, isLoading, check }) => {
  return <div className={className}>{stringForCheck(isLoading, check)}</div>;
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

export const StatusBar = styled(StatusBarInner)`
  height: 1.5em;
  line-height: 1.5;
  color: ${grayTextColor};
`;
