import { holeDefinition } from "~/problems/options/holeDefinition";
import { range } from "~/util/range";

const primitiveHole = holeDefinition<{
  value: string;
}>()("primitive", {
  *subHoleIds() {},
  toSourceText(hole) {
    return hole.value;
  },
});

const unionHole = holeDefinition<{
  /**
   * number of holes.
   */
  size: number;
}>()("union", {
  *subHoleIds(hole) {
    for (let i = 0; i < hole.size; i++) {
      yield String(i);
    }
  },
  toSourceText(hole, getSubHoleText) {
    const contents = range(0, hole.size - 1)
      .map(i => getSubHoleText(String(i)))
      .join("|");
    return `(${contents})`;
  },
});

export const holeDefinitions = [primitiveHole, unionHole];
