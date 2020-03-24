import React, { FC } from "react";
import styled from "styled-components";
import { grayTextColor, mainTextColor } from "~/design/color";

export const Footer: FC = () => {
  return (
    <Wrapper>
      <div>
        <a href="/privacy.html">Privacy Policy</a>
        <a target="_blank" href="https://github.com/uhyo/typescript-puzzle">
          GitHub
        </a>
      </div>
      <p>Help Type Puzzles by contributing questions!</p>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;

  border-top: 1px solid ${mainTextColor};
  padding: 4px 0;
  font-size: 0.9rem;

  p {
    margin-top: 2px;
    color: ${grayTextColor};
    font-family: sans-serif;
    font-size: 0.7rem;
  }

  a {
    display: inline-block;
    margin: 0 1em;
    color: ${grayTextColor};
    text-decoration: none;
  }
`;
