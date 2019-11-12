import styled from "styled-components";
import {
  lightGrayBorderColor,
  mainBorderColor,
  syntaxColor,
} from "~/design/color";
import { Option } from "../../problems/options";
import { Hole } from "../Hole";

export const OneOptionBase = styled(Hole)<{
  focused?: boolean;
  openHeight?: boolean;
}>`
  border-color: ${props =>
    props.focused ? mainBorderColor : lightGrayBorderColor};
  background-color: white;
  cursor: pointer;
  ${props => (props.openHeight ? "height: auto;" : "")}
`;

export const TypeOption = styled(OneOptionBase)<{
  kind: Extract<Option, { type: "type" }>["kind"];
}>`
  color: ${props => syntaxColor[props.kind]};
`;
