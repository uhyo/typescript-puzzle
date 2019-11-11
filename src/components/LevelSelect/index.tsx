import { faCheck, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import styled from "styled-components";
import { LevelDoc } from "~/db/level";
import { mainBackgroundColor } from "~/design/color";
import { largeRoundedBoxRadius } from "~/design/length";
import { Level, levelList, levelMetadata } from "~/problems/levels";
import { AppHeader } from "../AppHeader";
import { Crown } from "../Crown";
import { PageWrapper } from "../PageWrapper";

export const LevelSelectComponent: FC<{
  clearedLevels: LevelDoc[];
  onSelect?: (level: Level) => void;
}> = ({ clearedLevels, onSelect }) => {
  return (
    <>
      <AppHeader decorations>Type Puzzles</AppHeader>
      <Wrapper>
        {levelList.map(level => {
          const meta = levelMetadata[level];
          const clickHandler =
            onSelect &&
            (() => {
              onSelect(level);
            });
          const status = clearedLevels.find(lv => lv.level === level)?.status;
          return (
            <LevelButton key={level} onClick={clickHandler}>
              {meta.name}
              {status === "completed" ? (
                <CrownIcon title="You solved all the problems in this level">
                  <FontAwesomeIcon icon={faCrown} />
                </CrownIcon>
              ) : status === "cleared" ? (
                <Check title="You cleared this level">
                  <FontAwesomeIcon icon={faCheck} />
                </Check>
              ) : null}
            </LevelButton>
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled(PageWrapper)`
  justify-content: center;
`;

const LevelButton = styled.button`
  position: relative;
  background-color: ${mainBackgroundColor};
  margin-top: 2rem;
  padding: 8px;
  border-radius: ${largeRoundedBoxRadius};
  color: white;
  font-size: 1.5rem;
`;

const Check = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  transform: scale(1.5) translateY(-30%);

  color: #55c41a;
`;

const CrownIcon = styled(Crown)`
  position: absolute;
  top: 0;
  right: 0;
  transform: scale(1.5) translateY(-45%) rotate(15deg);
`;
