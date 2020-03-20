import styled from "styled-components";
import { problemSourceCodeFontSize, sourceCodeFontFamily } from "~/design/font";
import { smallRoundedBoxRadius } from "~/design/length";

/**
 * Base styling of hole.
 */
export const HoleBase = styled.span`
  display: inline-block;
  border-radius: ${smallRoundedBoxRadius};
  border: 1px solid transparent;
  height: calc(1.2em + 8px);
  padding: 3px;
  font-family: ${sourceCodeFontFamily};
  font-size: ${problemSourceCodeFontSize};
  vertical-align: baseline;
  user-select: none;
`;
