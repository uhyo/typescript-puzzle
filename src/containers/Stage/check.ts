import { holeDefs, HoleValue } from "~/problems/options";
import { getSubHoleId } from "~/problems/options/subHoleIds";
import { Problem } from "~/problems/problemDefinition/problem";
import { RemoteCompiler } from "~/ts-compiler";
import { Fetcher } from "~/util/Fetcher";
import { allHoleIds } from "./holes";
import { AnswerState } from "./logic";

export type CheckState = {
  status: boolean;
};

/**
 * Check whether given answer is correct.
 */
export const checkAnswer = (
  problem: Problem,
  answer: AnswerState,
  compiler: RemoteCompiler,
): Fetcher<CheckState> | undefined => {
  // first, check whether all holes are filled.
  const holes = Array.from(allHoleIds(problem, answer));
  if (holes.some(holeId => !answer[holeId])) {
    return undefined;
  }
  const sourceText = getSourceText(problem, answer);
  return new Fetcher(async () => {
    const diagnostics = await compiler.getDiagnostics(sourceText);
    return {
      status: diagnostics.length === 0,
    };
  });
};

const getSourceText = (problem: Problem, answer: AnswerState) => {
  let result = "";
  for (let i = 0; i < problem.texts.length; i++) {
    result += problem.texts[i] || "";
    const holeId = String(i);
    const hole = answer[holeId];
    if (hole) {
      result += sourceTextOfHole(String(i), hole);
    }
  }
  return result;
  function sourceTextOfHole(holeId: string, hole: HoleValue): string {
    return holeDefs.toSourceText(hole, sub => {
      const subHoleId = getSubHoleId(holeId, sub);
      const subHole = answer[subHoleId];
      return subHole ? sourceTextOfHole(subHoleId, subHole) : "";
    });
  }
};

// const holeMatchesAnswer = (
//   hole: ProblemHole,
//   answer: HoleValue | undefined,
// ) => {
//   switch (hole.type) {
//     case "type": {
//       return answer?.type === "type" && hole.answer === answer.value;
//     }
//   }
// };
