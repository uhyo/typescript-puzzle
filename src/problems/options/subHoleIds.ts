import { holeDefs, HoleValue } from ".";

/**
 * Get global subhole ID from parent ID and sub name.
 */
export const getSubHoleId = (parentId: string, sub: string) =>
  `${parentId}.${sub}`;

/**
 * Get parent ID and sub name from global subhole ID.
 */
export const getParentAndSub = (
  holeId: string,
): [string | undefined, string] => {
  const dot = holeId.lastIndexOf(".");
  if (dot === -1) {
    return [undefined, holeId];
  } else {
    return [holeId.slice(0, dot), holeId.slice(dot + 1)];
  }
};

/**
 * Generates IDs of subholes.
 * @deprecated
 */
export function* subHoleIds(holeId: string, value: HoleValue) {
  for (const sub of holeDefs.subHoleIds(value)) {
    yield getSubHoleId(holeId, sub);
  }
}
