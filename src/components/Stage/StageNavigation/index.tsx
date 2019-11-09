import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <NextButton onClick={answerIsCorrect ? onNext : undefined}>
        <NextText>NEXT</NextText>
        <NextIcon>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </NextIcon>
      </NextButton>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  shown: boolean;
}>`
  opacity: ${props => (props.shown ? "1" : "0")};
  transition: opacity 150ms ease 0s;
`;

const NextButton = styled.button`
  width: 100%;
  background-color: ${affirmativeBackgroundColor};
  color: white;
  font-size: 1.2em;
  font-weight: bold;

  margin: 1.2em 0;
  padding: 6px;
  border-radius: ${largeRoundedBoxRadius};
`;

const NextText = styled.span`
  display: inline-block;
  margin-left: 4.5ex;
`;

const NextIcon = styled.span`
  display: inline-block;
  margin-left: 1.5ex;
  width: 3ex;
`;
