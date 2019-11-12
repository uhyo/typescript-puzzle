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
