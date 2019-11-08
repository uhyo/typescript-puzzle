import React, { FC } from "react";
import { Level, levelMetadata } from "~/problems/levels";

export const StageHeader: FC<{
  level: Level;
  stageNumber: number;
}> = ({ level, stageNumber }) => {
  const { name, numberOfStages } = levelMetadata[level];
  return (
    <div>
      {name} {stageNumber}/{numberOfStages}
    </div>
  );
};
