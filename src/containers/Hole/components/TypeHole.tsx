import React, { FC } from "react";
import styled from "styled-components";
import { syntaxColor } from "~/design/color";
import { HoleValueOfType } from "~/problems/options";
import { OneHoleKindProps } from "./OneHoleKindProps";
import { OneOptionBase } from "./OneOptionBase";

const TypeHoleStyle = styled(OneOptionBase)<{
  kind: HoleValueOfType<"type">["kind"];
}>`
  color: ${props => syntaxColor[props.kind]};
`;
export const TypeHole: FC<OneHoleKindProps<"type">> = ({
  value: option,
  focused,
  className,
  holeId,
}) => {
  return (
    <TypeHoleStyle
      data-holeid={holeId}
      className={className}
      kind={option.kind}
      focused={!!focused}
    >
      {option.value}
    </TypeHoleStyle>
  );
};
