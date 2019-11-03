import { Problem } from "~/problems/problemDefinition/problem";

export const getInitialFocus = (problem: Problem): string | undefined =>
  problem.holes.length > 0 ? "0" : undefined;

export const getNextFocus = (
  problem: Problem,
  currentFocus: string | undefined,
): string | undefined => {
  if (currentFocus === undefined) {
    return undefined;
  }
  const f = Number(currentFocus);
  if (f + 1 < problem.holes.length) {
    return String(f + 1);
  } else {
    return undefined;
  }
};
