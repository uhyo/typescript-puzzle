import { blank, QuestionHole } from "./hole";
import { Question } from "./question";

/**
 * Make a question.
 */
export function question(
  question: TemplateStringsArray,
  ...holes: QuestionHole[]
): Question {
  return {
    texts: question,
    holes,
  };
}

export { QuestionHole, blank };
