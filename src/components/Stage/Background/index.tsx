import React, { FC } from "react";
import styled from "styled-components";
import jigsawGreen from "~/assets/jigsaw-green.svg";
import jigsawRed from "~/assets/jigsaw-red.svg";
import { AnswerCheck } from "~/containers/Stage/check";

export const BackGround: FC<{
  state?: AnswerCheck;
}> = ({ state }) => {
  return (
    <BackGroundMain state={state}>
      <BackGroundBottom state={state} />
    </BackGroundMain>
  );
};

const BackGroundMain = styled.div<{
  state: AnswerCheck;
}>`
  z-index: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.state === "correct" ? "rgb(228, 255, 223)" : "rgb(255, 224, 223)"};
  transform: ${props =>
    props.state !== undefined
      ? "translateY(0)"
      : "translateY(calc(-100% - 120px))"};
  transition: transform 450ms ease-out;
`;

const jigsawImage = (props: { state: AnswerCheck }) =>
  props.state === "correct" ? jigsawGreen : jigsawRed;

const BackGroundBottom = styled.div<{
  state: AnswerCheck;
}>`
  position: absolute;
  top: 100%;
  width: 100%;
  height: 120px;
  background-image: url(${jigsawImage});
  background-size: 240px auto;
  background-repeat: repeat-x;
  background-position: bottom;
`;
