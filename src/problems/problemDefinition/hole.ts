export type ProblemHole =
  | {
      readonly type: "type";
      readonly answer: string;
    }
  | {
      readonly type: "union";
      readonly elements: ProblemHole[];
    };

/**
 * make a hole which is type.
 */
export function typeHole(answer: string): ProblemHole {
  return {
    type: "type",
    answer,
  };
}

/**
 * Make a hole which is union type.
 */
export function unionHole(...elements: ProblemHole[]): ProblemHole {
  return {
    type: "union",
    elements,
  };
}
