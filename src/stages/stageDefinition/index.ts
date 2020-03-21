import { AuthorID } from "~/definitions/authors";
import { HoleValue } from "../holes/holeDefs";
import { Question } from "../questionDefinition/question";

export type StageDefinition = {
  readonly id: string;
  readonly question: Question;
  readonly options: readonly HoleValue[];
  readonly author?: AuthorID;
};
