import styled from "styled-components";
import { lightGrayBorderColor, mainBorderColor } from "~/design/color";
import {
  questionSourceCodeFontSize,
  sourceCodeFontFamily,
} from "~/design/font";
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
  font-size: ${questionSourceCodeFontSize};
  vertical-align: baseline;
  user-select: none;
  cursor: pointer;
`;

/**
 * Base styling of filled hole.
 */
export const FilledHoleBase = styled(HoleBase)<{
  focused?: boolean;
}>`
  border-color: ${props =>
    props.focused ? mainBorderColor : lightGrayBorderColor};
  background-color: white;
  height: auto;
`;
