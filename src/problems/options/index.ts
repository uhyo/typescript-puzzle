export type Option =
  | {
      type: "type";
      kind: "primitive";
      value: string;
    }
  | {
      type: "union";
      /**
       * Number of hole
       */
      size: number;
    };

/**
 * Returns the name of (shallow) subholes in it.
 */
export function getSubHoles(option: Option, name: string): string[] {
  switch (option.type) {
    case "type": {
      return [];
    }
    case "union": {
      const result = [];
      for (let i = 0; i < option.size; i++) {
        result.push(`${name}.${i}`);
      }
      return result;
    }
  }
}

/**
 * Option which is a type.
 */
export const typeOption = (value: string): Option => ({
  type: "type",
  kind: "primitive",
  value,
});

/**
 * Option which is a union.
 */
export const unionOption = (size: number): Option => ({
  type: "union",
  size,
});
