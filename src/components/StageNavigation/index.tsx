import React, { FC } from "react";
import styled from "styled-components";
import { affirmativeBackgroundColor } from "~/design/color";
import { largeRoundedBoxRadius } from "~/design/length";

export const StageNavigation: FC<{
  answerIsCorrect: boolean;
  onNext?: () => void;
}> = ({ answerIsCorrect, onNext }) => {
  if (!answerIsCorrect) return null;

  return (
    <div>
      <NextButton onClick={onNext}>次の問題へ</NextButton>
    </div>
  );
};

const NextButton = styled.button`
  background-color: ${affirmativeBackgroundColor};
  color: white;
  font-size: 1.2em;
  font-weight: bold;

  padding: 6px;
  border-radius: ${largeRoundedBoxRadius};
`;
