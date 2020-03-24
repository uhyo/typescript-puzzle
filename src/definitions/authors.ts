// Author data of questions.
// Please add your data to `authors` when you contribute questions.

import { AuthorData } from "~/stages/questionDefinition/question";

const validateAuthorsType = <
  T extends {
    [A in string]?: AuthorData;
  }
>(
  data: T,
) => data;

/**
 * Definitions of authors.
 * Field names are treated as author IDs.
 */
export const authors = validateAuthorsType({
  uhyo: {
    name: "uhyo",
    github: "uhyo",
    twitter: "uhyo_",
  },
  kc7891: {
    name: "kc7891",
    github: "kc7891",
    twitter: "K_Chiba7891",
  },
});

export type AuthorID = keyof typeof authors;
