export type HoleDefinition<Type extends string, H> = {
  type: Type;
  /**
   * Generates all subhole IDs.
   */
  readonly subHoleIds: (hole: H) => Generator<string, void, unknown>;
  /**
   * Converts hole to source text.
   */
  readonly toSourceText: (
    hole: H,
    getSubHoleText: (subHoleId: string) => string,
  ) => string;
};

export const holeDefinition = <H>() => {
  return <Type extends string>(
    type: Type,
    options: Omit<HoleDefinition<Type, H>, "type">,
  ): HoleDefinition<Type, H> => ({
    type,
    ...options,
  });
};
