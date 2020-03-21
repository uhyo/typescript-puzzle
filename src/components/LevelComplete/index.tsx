import React, { FC, useTransition } from "react";
import styled from "styled-components";
import { useAppActions } from "~/containers/App/logic";
import { Level, levelMetadata } from "~/definitions/stages/levels";
import { grayTextColor, mainTextColor } from "~/design/color";
import { AppHeader } from "../AppHeader";
import { Crown } from "../Crown";
import { NavigationButton } from "../NavigationButton";
import { PageWrapper } from "../PageWrapper";

/**
 * Level complete page
 */
export const LevelComplete: FC<{
  level: Level;
  achivement: number;
}> = ({ level, achivement }) => {
  const [startTransition] = useTransition();
  const { goToTop } = useAppActions();

  const achievementStr = (achivement * 100).toFixed(0);
  return (
    <>
      <AppHeader decorations />
      <Wrapper>
        <Body>
          <Title>Level Complete!</Title>
          <LevelName>{levelMetadata[level].name}</LevelName>
          <Details>
            <p>
              Achievement: {achievementStr}%{achivement === 1 && <Crown />}
            </p>
          </Details>
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
    </>
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

const Details = styled.div`
  margin-top: 2em;
  line-height: 1.5;
  text-align: center;
  color: ${grayTextColor};
`;
