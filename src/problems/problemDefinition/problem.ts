import { ProblemHole } from ".";

export interface Problem {
  readonly texts: readonly string[];
  readonly holes: readonly ProblemHole[];
}
