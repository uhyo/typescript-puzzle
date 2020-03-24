/**
 * Definition of levels
 */
export const levels = {
  easy: 10,
  easy2: 11,
  intermediate: 20,
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
   * Number of questions to solve
   */
  numberOfStages: number;
};

export const levelMetadata: Record<Level, LevelMetadata> = {
  [levels.easy]: {
    name: "EASY 1",
    numberOfStages: 4,
  },
  [levels.easy2]: {
    name: "EASY 2",
    numberOfStages: 2,
  },
  [levels.intermediate]: {
    name: "INTERMEDIATE 1",
    numberOfStages: 2,
  },
};

export const levelList: readonly Level[] = [
  levels.easy,
  levels.easy2,
  levels.intermediate,
];
