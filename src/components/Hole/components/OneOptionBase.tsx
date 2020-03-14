import styled from "styled-components";
import { lightGrayBorderColor, mainBorderColor } from "~/design/color";
import { HoleBase } from "./HoleBase";

export const OneOptionBase = styled(HoleBase)<{
  focused?: boolean;
  openHeight?: boolean;
}>`
  border-color: ${props =>
    props.focused ? mainBorderColor : lightGrayBorderColor};
  background-color: white;
  cursor: pointer;
  ${props => (props.openHeight ? "height: auto;" : "")}
`;
