import { AuthorID } from "~/definitions/authors";
import { HoleValue } from "../holes";
import { Question } from "../questionDefinition/question";

export type StageDefinition = {
  readonly id: string;
  readonly question: Question;
  readonly options: readonly HoleValue[];
  readonly author?: AuthorID;
};
