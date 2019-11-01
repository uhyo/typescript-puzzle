export interface ProblemHole {
  readonly type: "type";
  readonly answer: string;
}

/**
 * make a hole which is type.
 */
export function typeHole(answer: string): ProblemHole {
  return {
    type: "type",
    answer,
  };
}
