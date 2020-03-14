import { HoleValue } from ".";

/**
 * Generates IDs of subholes.
 */
export function* subHoleIds(holeId: string, value: HoleValue) {
  switch (value.type) {
    case "type": {
      return;
    }
    case "union": {
      for (let i = 0; i < value.size; i++) {
        yield `${holeId}.${i}`;
      }
      return;
    }
  }
}
