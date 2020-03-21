import React, { FC } from "react";
import styled from "styled-components";
import { syntaxColor } from "~/design/color";
import { OneHoleKindProps } from "./OneHoleKindProps";

const TypeHoleStyle = styled.span`
  color: ${syntaxColor.primitive};
`;
export const TypeHoleContents: FC<OneHoleKindProps<"primitive">> = ({
  value: option,
}) => {
  return <TypeHoleStyle>{option.value}</TypeHoleStyle>;
};
