import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import styled from "styled-components";
import { Level, levelMetadata } from "~/problems/levels";

export const StageHeader: FC<{
  level: Level;
  stageNumber: number;
  onQuitStage?: () => void;
}> = ({ level, stageNumber, onQuitStage }) => {
  const { name, numberOfStages } = levelMetadata[level];
  const quitButton =
    onQuitStage &&
    (() => {
      if (confirm("Quit this level?")) {
        onQuitStage();
      }
    });
  return (
    <Wrapper>
      <LevelName>{name}</LevelName>
      <span>
        STAGE {stageNumber}/{numberOfStages}
      </span>
      <CloseButton title="Quit this level" onClick={quitButton}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: nowrap row;
  font-size: 1.5rem;
  padding-top: calc(5px + env(safe-area-inset-top, 0px));
`;

const LevelName = styled.span`
  flex: auto 1 0;
  margin-right: 1em;
`;

const CloseButton = styled.button`
  margin-left: 1.5em;
`;
