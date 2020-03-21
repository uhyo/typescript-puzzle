import { QuestionHole } from "./hole";

export interface Question {
  readonly texts: readonly string[];
  readonly holes: readonly QuestionHole[];
}
