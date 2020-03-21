import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, memo } from "react";
import styled from "styled-components";
import { AppHeader } from "~/components/AppHeader";
import { Level, levelMetadata } from "~/definitions/stages/levels";

export const StageHeader: FC<{
  level: Level;
  stageNumber: number;
  onQuitStage?: () => void;
}> = memo(({ level, stageNumber, onQuitStage }) => {
  const { name, numberOfStages } = levelMetadata[level];
  const quitButton =
    onQuitStage &&
    (() => {
      if (confirm("Quit this level?")) {
        onQuitStage();
      }
    });
  return (
    <Wrapper decorations>
      <LevelName>{name}</LevelName>
      <span>
        STAGE {stageNumber}/{numberOfStages}
      </span>
      <CloseButton title="Quit this level" onClick={quitButton}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseButton>
    </Wrapper>
  );
});

const Wrapper = styled(AppHeader)`
  display: flex;
  flex-flow: nowrap row;
  font-size: 1.5rem;
`;

const LevelName = styled.span`
  flex: auto 1 0;
  margin-right: 1em;
`;

const CloseButton = styled.button`
  color: inherit;
  margin-left: 1.5em;
`;
