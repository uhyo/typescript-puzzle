/**
 * Definition of levels
 */
export const levels = {
  1: 1,
} as const;

export type Level = typeof levels[keyof typeof levels];
