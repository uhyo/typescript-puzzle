/**
 * Definition of levels
 */
export const levels = {
  1: 1,
  2: 2,
} as const;

export type Level = typeof levels[keyof typeof levels];

/**
 * Level Design
 */

export type LevelMetadata = {
  /**
   * Name of level
   */
  name: string;
  /**
   * Number of problems to solve
   */
  numberOfStages: number;
};

export const levelMetadata: Record<Level, LevelMetadata> = {
  [levels[1]]: {
    name: "LEVEL 1",
    numberOfStages: 1,
  },
  [levels[2]]: {
    name: "LEVEL 2",
    numberOfStages: 1,
  },
};

export const levelList: readonly Level[] = [levels[1], levels[2]];
