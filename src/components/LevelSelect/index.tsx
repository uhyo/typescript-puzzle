import React, { FC } from "react";
import styled from "styled-components";
import { mainBackgroundColor } from "~/design/color";
import { largeRoundedBoxRadius } from "~/design/length";
import { Level, levelList, levelMetadata } from "~/problems/levels";

export const LevelSelect: FC<{
  onSelect?: (level: Level) => void;
}> = ({ onSelect }) => {
  return (
    <div>
      {levelList.map(level => {
        const meta = levelMetadata[level];
        const clickHandler =
          onSelect &&
          (() => {
            onSelect(level);
          });
        return (
          <LevelButton key={level} onClick={clickHandler}>
            {meta.name}
          </LevelButton>
        );
      })}
    </div>
  );
};

const LevelButton = styled.button`
  background-color: ${mainBackgroundColor};
  color: white;
  padding: 3px;
  border-radius: ${largeRoundedBoxRadius};
`;
