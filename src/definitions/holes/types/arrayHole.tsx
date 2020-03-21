import React from "react";
import { holeDefinition } from "~/stages/holes/holeDefinition";

/**
 * Hole for (type)[].
 */
export const arrayHole = holeDefinition<{
  readonly?: boolean;
}>()("arrayType", {
  *subHoleIds() {
    yield "0";
  },
  getNextFocus(hole, previous) {
    if (previous === undefined) {
      return "0";
    } else {
      return undefined;
    }
  },
  toSourceText(hole, getSubHoleText) {
    if (hole.readonly) {
      return `(readonly ${getSubHoleText("0")}[])`;
    } else {
      return `${getSubHoleText("0")}[]`;
    }
  },
  render(hole, { children }) {
    return <>{children}[]</>;
  },
});
