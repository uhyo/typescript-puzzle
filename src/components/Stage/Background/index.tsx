import React, { FC } from "react";
import styled from "styled-components";
import jigsawGreen from "~/assets/jigsaw-green.svg";
import jigsawRed from "~/assets/jigsaw-red.svg";
import { AnswerCheck } from "~/containers/Stage/check";
import { useKeptValue } from "~/util/hooks/useKeptValue";

export const BackGround: FC<{
  state?: AnswerCheck;
}> = ({ state }) => {
  const isDown = state !== undefined;
  const color = useKeptValue(state, (prev, current) => {
    return prev === undefined || current !== undefined;
  });
  return (
    <BackGroundMain isDown={isDown} color={color}>
      <BackGroundBottom color={color} />
    </BackGroundMain>
  );
};

const BackGroundMain = styled.div<{
  isDown: boolean;
  color: AnswerCheck;
}>`
  z-index: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.color === "correct" ? "rgb(228, 255, 223)" : "rgb(255, 224, 223)"};
  transform: ${props =>
    props.isDown ? "translateY(0)" : "translateY(calc(-100% - 120px))"};
  transition: transform 450ms ease-out;
`;

const jigsawImage = (props: { color: AnswerCheck }) =>
  props.color === "correct" ? jigsawGreen : jigsawRed;

const BackGroundBottom = styled.div<{
  color: AnswerCheck;
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
