import React, { FC } from "react";
import styled from "styled-components";
import jigsawBlue from "~/assets/jigsaw-blue.svg";
import { mainBackgroundColor } from "~/design/color";

export const AppHeader: FC<{
  className?: string;
  decorations?: boolean;
}> = ({ children, decorations, className }) => (
  <Wrapper>
    <ContentsRow decorations={!!decorations}>
      <Contents className={className}>{children}</Contents>
    </ContentsRow>
    {decorations && <Bottom />}
  </Wrapper>
);

const Wrapper = styled.div`
  font-size: 2em;
  text-align: center;
  color: white;
`;

const ContentsRow = styled.div<{
  decorations: boolean;
}>`
  display: flex;
  flex-flow: nowrap row;
  justify-content: center;
  align-items: center;
  height: ${props => `calc(1.2em + ${props.decorations ? "0px" : "8px"})`};
  background-color: ${mainBackgroundColor};
`;

const Contents = styled.div`
  width: 600px;
  padding: 0 20px;
`;

const Bottom = styled.div`
  width: 100%;
  height: 70px;
  background-image: url(${jigsawBlue});
  background-repeat: repeat-x;
  background-size: 140px auto;
`;
