/**
 * Destructive shuffle.
 */
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length; i > 0; i--) {
    const r = Math.floor(Math.random() * i);
    const t = array[i - 1];
    array[i - 1] = array[r];
    array[r] = t;
  }
  return array;
}
