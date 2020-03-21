import React from "react";
import styled from "styled-components";
import { syntaxColor } from "~/design/color";
import { holeDefinition } from "~/stages/holes/holeDefinition";

const HoleContents = styled.span`
  color: ${syntaxColor.boolean};
`;

/**
 * Hole value for primitive type.
 */
export const booleanHole = holeDefinition<{
  value: boolean;
}>()("boolean", {
  *subHoleIds() {},
  getNextFocus() {
    return undefined;
  },
  toSourceText(hole) {
    return String(hole.value);
  },
  render(hole) {
    return <HoleContents>{hole.value}</HoleContents>;
  },
});
