import React, { ComponentProps, FC } from "react";
import styled from "styled-components";
import { lightGrayBackgroundColor, mainBorderColor } from "~/design/color";
import { HoleBase } from "./HoleBase";

const BlankHoleInner = styled(HoleBase)<{
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
