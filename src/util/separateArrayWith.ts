/**
 * Put given element into between every element of given array.
 */
export const separateArrayWith = <T, U>(arr: T[], separator: U) => {
  const result: (T | U)[] = [];
  for (const [i, val] of arr.entries()) {
    if (i > 0) {
      result.push(separator);
    }
    result.push(val);
  }
  return result;
};
