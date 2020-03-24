import React, { FC, useContext } from "react";
import styled from "styled-components";
import { mainTextColor } from "~/design/color";
import { LastSeenQuestionsContext } from "../App/LastSeenQuestionsContext";
import { NoticeBox } from "./NoticeBox";

export const UpdatedQuestionsNotice: FC<{}> = () => {
  const { addedQuestionNumber, onClose } = useContext(LastSeenQuestionsContext);
  if (!addedQuestionNumber) {
    return null;
  }
  return (
    <Wrapper>
      <p>
        <strong>{addedQuestionNumber}</strong> new questions are added since
        last time you checked!
      </p>
      <div>
        <button type="button" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(NoticeBox)`
  & > div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }

  strong,
  button {
    color: ${mainTextColor};
  }
`;
