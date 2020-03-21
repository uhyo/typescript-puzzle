import React, { FC, memo, useState } from "react";
import styled from "styled-components";
import { authors } from "~/definitions/authors";
import { grayTextColor, mainTextColor } from "~/design/color";
import { StageDefinition } from "~/stages/stageDefinition";
import { isNonNull } from "~/util/isNonNull";
import { separateArrayWith } from "~/util/separateArrayWith";

type Props = {
  stage: StageDefinition;
};

export const StageMetadata: FC<Props> = memo(({ stage }) => {
  const [showDetail, setShowDetail] = useState(false);

  const authorInfo =
    stage.author !== undefined ? authors[stage.author] : undefined;

  const authorDetails = [
    authorInfo?.github ? (
      <a
        key="github"
        href={`https://github.com/${authorInfo.github}`}
        target="_blank"
      >
        GitHub
      </a>
    ) : (
      undefined
    ),
    authorInfo?.twitter ? (
      <a
        key="twitter"
        href={`https://twitter.com/${authorInfo.twitter}`}
        target="_blank"
      >
        Twitter
      </a>
    ) : (
      undefined
    ),
  ].filter(isNonNull);

  return (
    <Wrapper>
      {authorInfo ? (
        <>
          {" "}
          Question by{" "}
          <button type="button" onClick={() => setShowDetail(s => !s)}>
            {authorInfo.name}
          </button>
          {showDetail && authorDetails.length > 0 ? (
            <>({separateArrayWith(authorDetails, ", ")})</>
          ) : null}
        </>
      ) : null}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  color: ${grayTextColor};
  text-align: right;
  text-align: end;
  font-size: 0.9rem;
  font-family: sans-serif;

  & > button {
    color: ${mainTextColor};
    font-weight: normal;
  }
`;
