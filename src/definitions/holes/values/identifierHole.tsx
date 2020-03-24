import React from "react";
import styled from "styled-components";
import { syntaxColor } from "~/design/color";
import { holeDefinition } from "~/stages/holes/holeDefinition";

const HoleContents = styled.span`
  color: ${syntaxColor.identifier};
`;

/**
 * Hole value for identifier.
 */
export const identifierHole = holeDefinition<{
  value: string;
}>()("identifier", {
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
