import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ComponentProps, FC } from "react";
import styled from "styled-components";

export const Crown: FC<ComponentProps<typeof W>> = props => (
  <W {...props}>
    <FontAwesomeIcon icon={faCrown} />
  </W>
);

const W = styled.span`
  color: #ffcc26;
`;
