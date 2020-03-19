import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import styled from "styled-components";
import { NavigationButton } from "~/components/NavigationButton";
import { CheckState } from "~/containers/Stage/check";

export const StageNavigation: FC<{
  check?: CheckState;
  onNext?: () => void;
}> = ({ check, onNext }) => {
  const isCorrect = check?.status === "correct";
  return (
    <Wrapper shown={isCorrect} aria-hidden={!isCorrect}>
      <NavigationButton onClick={isCorrect ? onNext : undefined}>
        <NextText>NEXT</NextText>
        <NextIcon>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </NextIcon>
      </NavigationButton>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  shown: boolean;
}>`
  opacity: ${props => (props.shown ? "1" : "0")};
  transition: opacity 150ms ease 0s;
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
