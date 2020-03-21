import React from "react";
import styled from "styled-components";
import { syntaxColor } from "~/design/color";
import { holeDefinition } from "~/stages/holes/holeDefinition";

const HoleContents = styled.span`
  color: ${syntaxColor.string};
`;

/**
 * Hole value for primitive type.
 */
export const stringHole = holeDefinition<{
  value: string;
}>()("string", {
  *subHoleIds() {},
  getNextFocus() {
    return undefined;
  },
  toSourceText(hole) {
    return hole.value;
  },
  render(hole) {
    return <HoleContents>{hole.value}</HoleContents>;
  },
});
