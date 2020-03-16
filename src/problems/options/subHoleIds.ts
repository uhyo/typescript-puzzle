import { holeDefs, HoleValue } from ".";
import { getSubHoleId } from "./getSubHoleId";

/**
 * Generates IDs of subholes.
 * @deprecated
 */
export function* subHoleIds(holeId: string, value: HoleValue) {
  for (const sub of holeDefs[value.type].subHoleIds(value as any)) {
    yield getSubHoleId(holeId, sub);
  }
}
