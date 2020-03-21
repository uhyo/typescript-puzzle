import { QuestionHole } from "./hole";

export type AuthorData = {
  /**
   * Displayed name
   */
  readonly name: string;
  /**
   * GitHub ID (e.g. "uhyo")
   */
  readonly github?: string;
  /**
   * Twitter ID (e.g. "uhyo_")
   */
  readonly twitter?: string;
};

export interface Question {
  readonly texts: readonly string[];
  readonly holes: readonly QuestionHole[];
}
