import React, { FC } from "react";
import { Level } from "~/problems/levels";

/**
 * Level complete page
 */
export const LevelComplete: FC<{
  level: Level;
}> = ({ level }) => <div>Level Complete! {level}</div>;
