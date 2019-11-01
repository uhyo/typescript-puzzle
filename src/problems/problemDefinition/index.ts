import { ProblemHole } from "./hole";
import { Problem } from "./problem";

/**
 * Make a problem.
 */
export function problem(
  program: TemplateStringsArray,
  ...holes: ProblemHole[]
): Problem {
  return {
    texts: program,
    holes,
  };
}

export { ProblemHole };
