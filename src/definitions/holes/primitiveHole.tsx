import React from "react";
import styled from "styled-components";
import { syntaxColor } from "~/design/color";
import { holeDefinition } from "~/stages/holes/holeDefinition";

const PrimitiveHoleContents = styled.span`
  color: ${syntaxColor.primitiveType};
`;

export const primitiveHole = holeDefinition<{
  value: string;
}>()("primitive", {
  *subHoleIds() {},
  getNextFocus() {
    return undefined;
  },
  toSourceText(hole) {
    return hole.value;
  },
  render(hole) {
    return <PrimitiveHoleContents>{hole.value}</PrimitiveHoleContents>;
  },
});
