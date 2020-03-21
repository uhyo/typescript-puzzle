import React, { FC } from "react";
import styled from "styled-components";
import { grayTextColor, mainTextColor } from "~/design/color";

export const Footer: FC = () => {
  return (
    <Wrapper>
      <a href="/privacy.html">Privacy Policy</a>
      <a target="_blank" href="https://github.com/uhyo/typescript-puzzle">
        GitHub
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  border-top: 1px solid ${mainTextColor};
  padding: 4px 0;
  font-size: 0.9rem;

  a {
    display: inline-block;
    margin: 0 1em;
    color: ${grayTextColor};
    text-decoration: none;
  }
`;
