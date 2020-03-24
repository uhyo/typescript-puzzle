import { arrayHole } from "./types/arrayHole";
import { primitiveHole } from "./types/primitiveHole";
import { unionHole } from "./types/unionHole";
import { booleanHole } from "./values/booleanHole";
import { identifierHole } from "./values/identifierHole";
import { numberHole } from "./values/numberHole";
import { stringHole } from "./values/stringHole";

export const holeDefinitions = [
  primitiveHole,
  stringHole,
  numberHole,
  booleanHole,
  identifierHole,
  unionHole,
  arrayHole,
];
