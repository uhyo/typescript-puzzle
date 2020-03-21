import { holeDefs } from "~/stages/holes";
import { getParentAndSub, getSubHoleId } from "~/stages/holes/subHoleIds";
import { Question } from "~/stages/questionDefinition/question";
import { AnswerState } from "./logic";

export const getInitialFocus = (question: Question): string | undefined =>
  question.holes.length > 0 ? "0" : undefined;

export const getNextFocus = (
  question: Question,
  answer: AnswerState,
  currentFocusedId: string | undefined,
): string | undefined => {
  // down: go downward to find first focusable hole
  // next: go forthward to transition to next tree
  let mode: "down" | "next" = "down";
  if (currentFocusedId === undefined) {
    if (question.holes.length > 0) {
      currentFocusedId = "0";
    } else {
      return undefined;
    }
  }
  while (currentFocusedId !== undefined) {
    const [parent, sub] = getParentAndSub(currentFocusedId);
    const currentHole = answer[currentFocusedId];
    switch (mode) {
      case "next": {
        if (parent === undefined) {
          // type annotation here is a working around for bug
          // https://github.com/microsoft/TypeScript/issues/32950
          const next: number = Number(currentFocusedId) + 1;

          if (next < question.holes.length) {
            currentFocusedId = String(next);
            mode = "down";
            continue;
          } else {
            return undefined;
          }
        }
        const parentHole = answer[parent];
        if (parentHole === undefined) {
          currentFocusedId = parent;
          continue;
        }
        const nextSubId = holeDefs.getNextFocus(parentHole, sub);
        if (nextSubId === undefined) {
          currentFocusedId = parent;
          continue;
        }
        currentFocusedId = getSubHoleId(parent, nextSubId);
        mode = "down";
        break;
      }
      case "down": {
        if (!currentHole) {
          return currentFocusedId;
        }
        const nextSubId = holeDefs.getNextFocus(currentHole, undefined);
        if (nextSubId === undefined) {
          mode = "next";
          continue;
        }
        currentFocusedId = getSubHoleId(currentFocusedId, nextSubId);
        break;
      }
    }
  }
};
