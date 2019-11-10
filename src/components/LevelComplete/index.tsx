import React, { FC, useTransition } from "react";
import styled from "styled-components";
import { useAppActions } from "~/containers/App/logic";
import { grayTextColor, mainTextColor } from "~/design/color";
import { Level, levelMetadata } from "~/problems/levels";
import { NavigationButton } from "../NavigationButton";
import { PageWrapper } from "../PageWrapper";

/**
 * Level complete page
 */
export const LevelComplete: FC<{
  level: Level;
}> = ({ level }) => {
  const [startTransition] = useTransition();
  const { goToTop } = useAppActions();
  return (
    <Wrapper>
      <Body>
        <Title>Level Complete!</Title>
        <LevelName>{levelMetadata[level].name}</LevelName>
      </Body>
      <NavigationButton
        onClick={() => {
          startTransition(() => {
            goToTop();
          });
        }}
      >
        OK
      </NavigationButton>
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  justify-content: center;
`;

const Body = styled.div`
  flex: auto 1 0;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: ${grayTextColor};
`;

const LevelName = styled.div`
  font-size: 2rem;
  text-align: center;
  color: ${mainTextColor};
`;
