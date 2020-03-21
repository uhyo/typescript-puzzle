import { holeDefs, HoleValue } from "~/stages/holes/holeDefs";
import { getSubHoleId } from "~/stages/holes/subHoleIds";
import { Question } from "~/stages/questionDefinition/question";
import { RemoteCompiler } from "~/ts-compiler";
import { Fetcher } from "~/util/Fetcher";
import { allHoleIds } from "./holes";
import { AnswerState } from "./logic";

export type CheckState = {
  status: "correct" | "wrong" | "error";
};

/**
 * Check whether given answer is correct.
 */
export const checkAnswer = (
  question: Question,
  answer: AnswerState,
  compiler: RemoteCompiler,
): Fetcher<CheckState> | undefined => {
  // first, check whether all holes are filled.
  const holes = Array.from(allHoleIds(question, answer));
  if (holes.some(holeId => !answer[holeId])) {
    return undefined;
  }
  const sourceText = getSourceText(question, answer);
  return new Fetcher(async () => {
    const diagnostics = await compiler.getDiagnostics(sourceText);
    return {
      status:
        diagnostics === undefined
          ? "error"
          : diagnostics.length > 0
          ? "wrong"
          : "correct",
    };
  });
};

const getSourceText = (question: Question, answer: AnswerState) => {
  let result = "";
  for (let i = 0; i < question.texts.length; i++) {
    result += question.texts[i] || "";
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
