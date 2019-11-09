import React, { FC } from "react";
import styled from "styled-components";
import { affirmativeBackgroundColor } from "~/design/color";
import { largeRoundedBoxRadius } from "~/design/length";

export const StageNavigation: FC<{
  answerIsCorrect: boolean;
  onNext?: () => void;
}> = ({ answerIsCorrect, onNext }) => {
  return (
    <Wrapper shown={answerIsCorrect} aria-hidden={!answerIsCorrect}>
      <NextButton onClick={onNext}>次の問題へ</NextButton>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  shown: boolean;
}>`
  visibility: ${props => (props.shown ? "visible" : "hidden")};
`;

const NextButton = styled.button`
  background-color: ${affirmativeBackgroundColor};
  color: white;
  font-size: 1.2em;
  font-weight: bold;

  margin: 1.2em 0;
  padding: 6px;
  border-radius: ${largeRoundedBoxRadius};
`;
