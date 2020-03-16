import React, { FC } from "react";
import styled from "styled-components";
import { syntaxColor } from "~/design/color";
import { OneHoleKindProps } from "./OneHoleKindProps";
import { OneOptionBase } from "./OneOptionBase";

const TypeHoleStyle = styled(OneOptionBase)`
  color: ${syntaxColor.primitive};
`;
export const TypeHole: FC<OneHoleKindProps<"primitive">> = ({
  value: option,
  focused,
  className,
  holeId,
}) => {
  return (
    <TypeHoleStyle
      data-holeid={holeId}
      className={className}
      focused={!!focused}
    >
      {option.value}
    </TypeHoleStyle>
  );
};
