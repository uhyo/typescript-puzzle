/**
 * Definition of levels
 */
export const levels = {
  easy: 10,
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
    name: "EASY",
    numberOfStages: 4,
  },
  [levels.intermediate]: {
    name: "INTERMEDIATE",
    numberOfStages: 1,
  },
};

export const levelList: readonly Level[] = [levels.easy, levels.intermediate];
