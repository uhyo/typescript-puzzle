export type HoleDefinition<Type extends string, H> = {
  type: Type;
  /**
   * Generates all subhole IDs.
   */
  readonly subHoleIds: (hole: H) => Generator<string, void, unknown>;
  /**
   * Returns next focus.
   * @param prev id of subhole which previously had focus. undefined if self.
   * @return id of subhole which get next focus. undefined if none.
   */
  readonly getNextFocus: (
    hole: H,
    prev: string | undefined,
  ) => string | undefined;
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
