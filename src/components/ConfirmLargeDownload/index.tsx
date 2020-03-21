import React, { FC, useTransition } from "react";
import styled from "styled-components";
import { useAppActions } from "~/containers/App/logic";
import { Level } from "~/definitions/stages/levels";
import { grayTextColor, mainTextColor } from "~/design/color";
import { AppHeader } from "../AppHeader";
import { NavigationButton } from "../NavigationButton";
import { PageWrapper } from "../PageWrapper";

export const ConfirmLargeDownload: FC<{
  next: {
    level: Level;
    stages: string[];
  };
}> = ({ next }) => {
  const [startTransition] = useTransition();
  const { stageLoaded } = useAppActions();

  return (
    <>
      <AppHeader decorations />
      <Wrapper>
        <div>
          <Title>Download Confirmation</Title>
          <p>Additional data will be loaded before continuing.</p>
          {/* TODO: calculate actual size */}
          <p>
            Download size: about <b>3MB</b>
          </p>
        </div>
        <NavigationButton
          onClick={() => {
            startTransition(() => {
              stageLoaded(next.level, next.stages);
            });
          }}
        >
          OK
        </NavigationButton>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(PageWrapper)`
  text-align: center;

  & > div:nth-child(1) {
    flex: auto 1 0;
    display: flex;
    flex-flow: nowrap column;
    justify-content: center;
  }

  & > div:nth-child(1) b {
    color: ${mainTextColor};
  }
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  color: ${grayTextColor};
  font-size: 1.5em;
`;
