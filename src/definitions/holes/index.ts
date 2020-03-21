import { booleanHole } from "./booleanHole";
import { numberHole } from "./numberHole";
import { primitiveHole } from "./primitiveHole";
import { stringHole } from "./stringHole";
import { unionHole } from "./unionHole";

export const holeDefinitions = [
  primitiveHole,
  stringHole,
  numberHole,
  booleanHole,
  unionHole,
];
