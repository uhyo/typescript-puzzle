import React, { ComponentProps, FC } from "react";
import styled from "styled-components";
import { lightGrayBackgroundColor, mainBorderColor } from "~/design/color";
import { sourceCodeFontFamily } from "~/design/font";
import { smallRoundedBoxRadius } from "~/design/length";

/**
 * Base styling of hole.
 */
export const Hole = styled.span`
  display: inline-block;
  border-radius: ${smallRoundedBoxRadius};
  border: 1px solid transparent;
  height: calc(1.2em + 8px);
  padding: 3px;
  font-family: ${sourceCodeFontFamily};
  vertical-align: baseline;
  user-select: none;
`;

const BlankHoleInner = styled(Hole)<{
  focused?: boolean;
  short?: boolean;
}>`
  width: ${props => (props.short ? "2.5ex" : "8ex")};
  background-color: ${lightGrayBackgroundColor};
  border-color: ${props => (props.focused ? mainBorderColor : "transparent")};
`;
const Invisible = styled.span`
  visibility: hidden;
`;

/**
 * Render a blank hole.
 */
export const BlankHole: FC<ComponentProps<typeof BlankHoleInner>> = props => (
  <BlankHoleInner {...props}>
    <Invisible aria-hidden="true">x</Invisible>
  </BlankHoleInner>
);
